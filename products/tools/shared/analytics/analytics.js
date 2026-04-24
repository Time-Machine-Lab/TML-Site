(function () {
  var scriptId = 'shared-analytics-umami';
  var defaultConfig = {
    src: 'https://hytpuqdv.cn-nb1.rainapp.top/tmlab',
    websiteId: '38757260-542b-45df-9409-6470c65418b0'
  };

  var pageConfig = window.ToolHubAnalytics || {};

  if (pageConfig.enabled === false || document.getElementById(scriptId)) {
    return;
  }

  var script = document.createElement('script');
  script.id = scriptId;
  script.defer = true;
  script.src = pageConfig.src || defaultConfig.src;
  script.setAttribute('data-website-id', pageConfig.websiteId || defaultConfig.websiteId);
  document.head.appendChild(script);
})();