(function (localStorage) {

  function putDefault(key, defaultValue) {
    localStorage[key] = localStorage[key] || defaultValue;
  }

  putDefault('user-popup', 'true');
  putDefault('highlight-author', 'true');
//  putDefault('highlight-comments', 'true');

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