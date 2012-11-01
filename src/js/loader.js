(function (extension) {
  var request = new XMLHttpRequest(),
    urlToMain = extension.getURL('js/main.js'),
    script, options;

  request.open('GET', urlToMain, false);
  request.send(null);

  script = document.createElement('script');
  script.id = "habrauser-injector";
  script.type = "text/javascript";
  script.text = request.responseText;

  extension.sendRequest({method: "getOptions"}, function (response) {
    script.setAttribute('data-user-options', JSON.stringify(response.options));
    document.body.appendChild(script);
  });

}(chrome.extension));