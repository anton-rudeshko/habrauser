(function (chrome, document) {
  function getUrl(url) {
    return chrome.extension.getURL(url);
  }

  function getResource(url) {
    var request = new XMLHttpRequest();
    request.open('GET', getUrl(url), false);
    request.send(null);
    return request.responseText;
  }

  function showUpdate(version) {
    var html = getResource('html/update.html');
    html = html.replace('{{version}}', version);
    html = html.replace('{{options-url}}', getUrl('html/options.html'));

    var element = document.createElement('div');
    element.innerHTML = html;

    document.body.appendChild(element);
  }

  var sync = chrome.storage.sync;

  sync.get(null, function (options) {
    if (options['new-version']) {
      showUpdate(options['new-version']);
      sync.set({'new-version': ''});
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = 'window.Habrauser=' + JSON.stringify(options || {}) + ';' + getResource('js/main.js');
    document.body.appendChild(script);
  });

}(chrome, document));