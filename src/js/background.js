(function (localStorage) {

  function loadStorage(key, defaultValue) {
    localStorage[key] = localStorage[key] || defaultValue;
  }

  loadStorage('user-popup', 'true');
  loadStorage('highlight-author', 'true');
  loadStorage('highlight-comments', 'false');

  function loadOptions() {
    var key, options = {};
    for (key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        options[key] = localStorage[key];
      }
    }
    return options;
  }

  chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    var response = request.method == 'getOptions' ? {options: loadOptions()} : {};
    sendResponse(response);
  });

}(localStorage));