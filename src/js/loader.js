(function (chrome, document) {
  var request = new XMLHttpRequest();
  request.open('GET', chrome.extension.getURL('js/main.js'), false);
  request.send(null);

  chrome.storage.sync.get(null, function (options) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = 'window.Habrauser = ' + JSON.stringify(options || {}) + ';' + request.responseText;
    document.body.appendChild(script);
  });

}(chrome, document));