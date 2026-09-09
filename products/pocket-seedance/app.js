const state = {
  config: null,
  selectedPreset: null,
  user: null,
  credits: 0,
  inputType: 'media',
  mode: 'standard',
  aspectRatio: '16:9',
  uploadedFiles: []
};

// Static deployments (such as TML-Site) do not expose the Express API. Keep
// the same UI usable with local demo data while preferring the API whenever it
// is available.
const STATIC_CONFIG = {
  presets: [
    { id: 'aurora-city', title: 'Aurora over a glass city', prompt: 'A cinematic one-take shot of a glass city at blue hour, aurora ribbons reflected in wet streets, slow dolly forward, natural motion, subtle atmospheric audio.', accent: 'Preset demo' },
    { id: 'product-orbit', title: 'Studio product orbit', prompt: 'A premium studio product film, slow 180-degree camera orbit, soft volumetric light, crisp material details, confident commercial pacing, clean background.', accent: 'Preset demo' },
    { id: 'paper-world', title: 'A paper world comes alive', prompt: 'Hand-cut paper characters step out of a storybook into a warm miniature world, gentle camera push-in, tactile textures, whimsical sound design.', accent: 'Preset demo' }
  ],
  pricing: { fast480: { rate: 0.06 }, fast720: { rate: 0.15 }, standard480: { rate: 0.08 }, standard720: { rate: 0.18 }, pro480: { rate: 0.13 }, pro720: { rate: 0.28 } },
  authConfigured: false,
  paymentsConfigured: false
};
const STATIC_VIDEO = './media/seedance-demo-small.mp4';
const apiFetch = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`API ${response.status}`);
  return response.json();
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const toast = (message) => {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 3200);
};
const showModal = (html) => { $('#modalContent').innerHTML = html; $('#modal').classList.remove('hidden'); };
const closeModal = () => $('#modal').classList.add('hidden');

async function load() {
  try {
    state.config = await apiFetch('/api/config');
  } catch {
    state.config = STATIC_CONFIG;
  }
  try {
    const me = await apiFetch('/api/me');
    state.user = me.user;
    state.credits = me.credits || 0;
  } catch {
    const saved = JSON.parse(localStorage.getItem('pocket-seedance-demo') || 'null');
    state.user = saved?.user || null;
    state.credits = Number(saved?.credits || 0);
  }
  updateBalance();
  renderPresets();
  updateEstimate();
  const params = new URLSearchParams(window.location.search);
  const requestedPack = params.get('buy');
  if (requestedPack) openBuyModal(requestedPack);
  const info = params.get('info');
  if (info === 'privacy') showInfo('Privacy', 'We only use your account details to authenticate you, process credits and deliver your renders.');
  if (info === 'terms') showInfo('Terms', 'Use only content you own or are authorized to upload. Renders are provided as-is while the service is in preview.');
  if (params.get('auth') === 'demo' && !state.user) await loginDemo();
  if (params.get('checkout') === 'cancelled') toast('Checkout cancelled — your balance is unchanged.');
}

function updateBalance() {
  $('#creditBalance').textContent = Number(state.credits).toFixed(2);
  $('#loginButton').textContent = state.user ? `Hi, ${state.user.name?.split(' ')[0] || 'creator'}` : 'Sign in with Google';
}

function renderPresets() {
  $('#presetButtons').innerHTML = state.config.presets.map((preset) => `<button type="button" data-preset="${preset.id}">${preset.title}</button>`).join('');
}

function selectPreset(id) {
  const preset = state.config.presets.find((item) => item.id === id);
  if (!preset) return;
  state.selectedPreset = preset;
  $('#prompt').value = preset.prompt;
  $$('[data-preset]').forEach((button) => button.classList.toggle('active', button.dataset.preset === id));
  toast('Preset loaded — this one can preview instantly.');
}

function currentRate() {
  const model = $('#model').value;
  const resolution = $('#resolution').value;
  return state.config?.pricing?.[`${model}${resolution}`]?.rate || 0.18;
}

function updateEstimate() {
  const seconds = Number($('#duration').value);
  const total = (seconds * currentRate()).toFixed(2);
  $('#estimate').textContent = `$${total}`;
  $('#estimateDetail').textContent = `${seconds} sec · ${$('#resolution').value} · ${state.aspectRatio}`;
  const button = $('#generateButton');
  if (!button.disabled) button.innerHTML = `Generate for $${total} <span>↗</span>`;
}

function setModel(model) {
  if (model === 'wan') return toast('Wan 3.0 is coming soon. Seedance models are ready now.');
  $('#model').value = model;
  const label = { fast: 'Seedance 2 Mini', standard: 'Seedance 2 Pro', pro: 'Seedance 2.5' }[model];
  $('#modelLabel').textContent = label;
  $$('[data-model]').forEach((button) => button.classList.toggle('active', button.dataset.model === model));
  updateEstimate();
  toast(`${label} selected.`);
}

function setInputType(type) {
  state.inputType = type;
  $$('[data-input]').forEach((button) => button.classList.toggle('active', button.dataset.input === type));
  const upload = $('#uploadButton');
  const copy = { media: 'Drop or click to upload', image: 'Upload image references', text: 'Text-only generation' }[type];
  upload.querySelector('b').textContent = copy;
  upload.disabled = type === 'text';
  upload.classList.toggle('is-disabled', type === 'text');
  toast(type === 'text' ? 'Text mode selected — no reference files needed.' : `${type[0].toUpperCase()}${type.slice(1)} input selected.`);
}

function setMode(mode) {
  state.mode = mode;
  $$('[data-mode]').forEach((button) => button.classList.toggle('active', button.dataset.mode === mode));
  toast(`${mode[0].toUpperCase()}${mode.slice(1)} mode selected.`);
}

function setAspect(aspect) {
  state.aspectRatio = aspect;
  $$('[data-aspect]').forEach((button) => button.classList.toggle('active', button.dataset.aspect === aspect));
  updateEstimate();
}

function handleFiles(files) {
  state.uploadedFiles = [...files];
  const counts = { image: 0, video: 0, audio: 0 };
  state.uploadedFiles.forEach((file) => { const key = file.type.split('/')[0]; if (counts[key] !== undefined) counts[key] += 1; });
  $('#uploadCount').textContent = `Img ${counts.image}/9 · Vid ${counts.video}/3 · Aud ${counts.audio}/3`;
  if (files.length) toast(`${files.length} reference ${files.length === 1 ? 'file' : 'files'} ready.`);
}

function openBuyModal(pack = 'creator') {
  const labels = { starter: ['Starter', '$4.99'], creator: ['Creator', '$9.99'], pro: ['Pro', '$24.99'], studio: ['Studio', '$49.99'] };
  const [name, price] = labels[pack] || labels.creator;
  showModal(`<div class="section-kicker">One-time credits</div><h2 id="modalTitle">Keep your ideas moving.</h2><p>${name} pack · ${price}. Credits never expire and failed live renders are returned automatically.</p><button type="button" class="button button-primary" data-buy-confirm="${pack}">Continue to checkout <span>↗</span></button>`);
}

async function generate() {
  const button = $('#generateButton');
  const prompt = $('#prompt').value.trim();
  if (!prompt) return toast('Write a prompt or choose a starting point first.');
  button.disabled = true;
  button.innerHTML = 'Composing… <span>◌</span>';
  const body = { prompt, presetId: state.selectedPreset?.id, model: $('#model').value, resolution: $('#resolution').value, duration: Number($('#duration').value), aspectRatio: state.aspectRatio, mode: state.mode, inputType: state.inputType };
  try {
    let data;
    try {
      data = await apiFetch('/api/generate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    } catch {
      const preset = state.config.presets.find((item) => item.id === body.presetId && item.prompt === prompt);
      if (!preset) return showModal('<div class="section-kicker">Static preview</div><h2 id="modalTitle">Backend not connected yet.</h2><p>This static deployment can preview presets instantly. Connect the Seedance API backend to render custom prompts.</p><button type="button" class="button button-outline" id="closeStaticModal">Got it</button>');
      data = { ok: true, kind: 'instant-demo', label: 'Instant demo preview · pre-rendered', videoUrl: STATIC_VIDEO };
    }
    if (data.error === 'SIGN_IN_REQUIRED') return showModal(`<div class="section-kicker">Your own render</div><h2 id="modalTitle">Sign in to keep going.</h2><p>The instant preview is free to explore. Your own prompt starts when you have credits.</p><a class="button button-primary" href="/auth/google">Continue with Google <span>↗</span></a><button type="button" id="demoLogin" class="button button-outline">Use demo mode locally</button>`);
    if (data.error === 'INSUFFICIENT_CREDITS') return showModal(`<div class="section-kicker">Not enough credits</div><h2 id="modalTitle">Top up to render.</h2><p>This render needs $${data.required}. Your balance is $${Number(data.credits).toFixed(2)}.</p><button type="button" class="button button-primary" data-buy-confirm="creator">Get Creator credits · $9.99</button>`);
    if (!data.ok) return toast(data.message || 'Something went wrong.');
    $('#previewEmpty').classList.add('hidden');
    $('#previewVideo').classList.remove('hidden');
    $('#previewVideo').src = data.videoUrl;
    $('#previewVideo').play().catch(() => {});
    $('#previewMeta').classList.remove('hidden');
    $('#previewLabel').textContent = data.label || 'Queued render';
    $('#previewSettings').textContent = `${body.model} · ${body.resolution} · ${body.duration}s · ${body.aspectRatio}`;
    if (data.credits !== undefined) { state.credits = data.credits; updateBalance(); }
    toast(data.kind === 'instant-demo' ? 'Instant demo preview ready.' : 'Render started.');
  } catch (error) {
    toast('Could not reach the generation service.');
  } finally {
    button.disabled = false;
    updateEstimate();
  }
}

async function loginDemo() {
  try {
    const data = await apiFetch('/api/demo-login', { method: 'POST' });
    state.user = data.user;
    state.credits = data.credits;
  } catch {
    state.user = { email: 'demo@seedance.studio', name: 'Demo Creator' };
    state.credits = 5;
    localStorage.setItem('pocket-seedance-demo', JSON.stringify({ user: state.user, credits: state.credits }));
  }
  closeModal();
  const cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete('auth');
  window.history.replaceState({}, '', `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
  await load();
  toast('Demo account ready with $5.00 credits.');
}
async function buy(pack) {
  let data;
  try {
    data = await apiFetch('/api/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ pack }) });
  } catch {
    const credits = { starter: 5, creator: 12, pro: 34, studio: 75 }[pack] || 12;
    state.user ||= { email: 'demo@seedance.studio', name: 'Demo Creator' };
    state.credits = Number((state.credits + credits).toFixed(2));
    localStorage.setItem('pocket-seedance-demo', JSON.stringify({ user: state.user, credits: state.credits }));
    closeModal(); updateBalance(); return toast(`Static demo added ${credits} credits.`);
  }
  if (data.mode === 'demo') { closeModal(); state.credits += data.pack.credits; updateBalance(); toast(`Demo top-up added ${data.pack.credits} credits.`); return; }
  if (data.checkoutUrl) window.location.href = data.checkoutUrl;
  else toast(data.error || 'Checkout unavailable.');
}

function showInfo(title, body) { showModal(`<div class="section-kicker">Pocket Seedance</div><h2 id="modalTitle">${title}</h2><p>${body}</p>`); }

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.closest('#modelSelector')) {
    const select = $('#model');
    select.focus();
    try { if (typeof select.showPicker === 'function') select.showPicker(); else select.click(); } catch { select.click(); }
    return;
  }
  const preset = target.closest('[data-preset]');
  if (preset) return selectPreset(preset.dataset.preset);
  const buyButton = target.closest('[data-buy]');
  if (buyButton) { event.preventDefault(); return openBuyModal(buyButton.dataset.buy); }
  const confirmedBuy = target.closest('[data-buy-confirm]');
  if (confirmedBuy) return buy(confirmedBuy.dataset.buyConfirm);
  const model = target.closest('[data-model]');
  if (model) return setModel(model.dataset.model);
  const input = target.closest('[data-input]');
  if (input) return setInputType(input.dataset.input);
  const mode = target.closest('[data-mode]');
  if (mode) return setMode(mode.dataset.mode);
  const aspect = target.closest('[data-aspect]');
  if (aspect) return setAspect(aspect.dataset.aspect);
  if (target.closest('#demoLogin')) return loginDemo();
  if (target.closest('#closeStaticModal')) return closeModal();
  if (target.closest('#uploadButton')) return $('#fileInput').click();
  if (target.closest('#showMoreButton')) return toast('More models will appear here soon.');
  if (target.closest('#examplesButton') || target.closest('#examplesPreviewButton')) return showInfo('Example gallery', 'Explore starter prompts in the gallery, then open a prompt here to preview it instantly.');
  if (target.closest('#apiButton')) return showInfo('API access', 'API access is being prepared. Contact us when you need a production endpoint.');
  if (target.closest('#historyButton')) return showInfo('Generation history', state.user ? 'Your completed renders will appear here.' : 'Sign in to keep a history of your renders.');
  if (target.closest('#accountButton')) return state.user ? showInfo('Your account', `Signed in as ${state.user.email || state.user.name || 'creator'}.`) : $('#loginButton').click();
  if (target.closest('#pricingInfoButton')) return showInfo('How pricing works', 'Pay per successful render. The estimate updates with model, resolution, duration and aspect ratio. Failed live renders are returned.');
  if (target.closest('#starterPromptButton')) return selectPreset(state.config?.presets?.[0]?.id);
});

$('#closeModal').addEventListener('click', closeModal);
$('#modal').addEventListener('click', (event) => { if (event.target.id === 'modal') closeModal(); });
$('#loginButton').addEventListener('click', () => { if (state.user) return toast('You are signed in.'); if (state.config && !state.config.authConfigured) return showModal('<div class="section-kicker">Google sign-in</div><h2 id="modalTitle">Backend not connected yet.</h2><p>Connect the Google OAuth backend for production sign-in. You can use demo mode to preview the static site locally.</p><button type="button" id="demoLogin" class="button button-primary">Use demo mode</button>'); window.location.href = '/auth/google'; });
$('#generateButton').addEventListener('click', generate);
$('#fileInput').addEventListener('change', (event) => handleFiles(event.target.files));
['model', 'resolution', 'duration'].forEach((id) => $(`#${id}`).addEventListener('change', () => { if (id === 'model') setModel($(`#${id}`).value); else updateEstimate(); }));
$('#prompt').addEventListener('input', () => { if (state.selectedPreset && $('#prompt').value !== state.selectedPreset.prompt) { state.selectedPreset = null; $$('[data-preset]').forEach((button) => button.classList.remove('active')); } });
$('#prompt').addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') generate(); });
load();
