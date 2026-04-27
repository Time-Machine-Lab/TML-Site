(function () {
  var styleId = 'shared-navbar-style';
  var configPath = '/shared/navbar/tools.json';
  var defaultConfig = {
    brand: {
      name: '工具箱',
      subtitle: '在线工具聚合平台',
      homePath: '/home/'
    }
  };

  function ensureStyle() {
    if (document.getElementById(styleId)) {
      return;
    }

    var link = document.createElement('link');
    link.id = styleId;
    link.rel = 'stylesheet';
    link.href = '/shared/navbar/navbar.css';
    document.head.appendChild(link);
  }

  function renderNav(config) {
    var mounts = document.querySelectorAll('[data-shared-navbar]');
    if (!mounts.length) {
      return;
    }

    var pageConfig = window.ToolHubNav || {};
    var brand = config.brand || defaultConfig.brand;

    mounts.forEach(function (mount) {
      mount.innerHTML = '';

      var shell = document.createElement('header');
      shell.className = 'pp-nav-shell';

      var inner = document.createElement('div');
      inner.className = 'pp-nav-shell__inner';

      var top = document.createElement('div');
      top.className = 'pp-nav-shell__top';

      var brandLink = document.createElement('a');
      brandLink.className = 'pp-nav-brand';
      brandLink.href = brand.homePath || '/home/';

      var mark = document.createElement('span');
      mark.className = 'pp-nav-brand__mark';
      mark.textContent = pageConfig.mark || 'TH';
      brandLink.appendChild(mark);

      var brandText = document.createElement('span');
      brandText.className = 'pp-nav-brand__text';

      var brandTitle = document.createElement('span');
      brandTitle.className = 'pp-nav-brand__title';
      brandTitle.textContent = brand.name || 'Tool Hub';
      brandText.appendChild(brandTitle);

      var brandSubtitle = document.createElement('span');
      brandSubtitle.className = 'pp-nav-brand__subtitle';
      brandSubtitle.textContent = brand.subtitle || 'Shared navigation across all tools';
      brandText.appendChild(brandSubtitle);

      brandLink.appendChild(brandText);
      top.appendChild(brandLink);

      var navItems = document.createElement('nav');
      navItems.className = 'pp-nav-items';
      navItems.setAttribute('aria-label', '工具导航');

      var items = Array.isArray(config.items) ? config.items : [];
      items.forEach(function (item) {
        if (!item || !item.path || !item.label) {
          return;
        }

        var link = document.createElement('a');
        link.className = 'pp-nav-item';
        if (item.slug && item.slug === pageConfig.currentSlug) {
          link.className += ' pp-nav-item--active';
          link.setAttribute('aria-current', 'page');
        }
        link.href = item.path;
        link.textContent = item.label;
        navItems.appendChild(link);
      });

      if (items.length) {
        top.appendChild(navItems);
      }

      inner.appendChild(top);
      shell.appendChild(inner);
      mount.appendChild(shell);
    });
  }

  function loadConfig() {
    ensureStyle();

    if (!window.fetch) {
      renderNav(defaultConfig);
      return;
    }

    window.fetch(configPath, { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load navbar config');
        }
        return response.json();
      })
      .then(renderNav)
      .catch(function () {
        renderNav(defaultConfig);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadConfig, { once: true });
  } else {
    loadConfig();
  }
})();
