(function (chrome) {

  var request = new XMLHttpRequest(),
    urlToMain = chrome.extension.getURL('js/main.js'),
    script;

  request.open('GET', urlToMain, false);
  request.send(null);
  script = document.createElement('script');
  script.type = "text/javascript";
  script.text = request.responseText;
  document.body.appendChild(script);

}(chrome));