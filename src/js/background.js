(function () {
  function loadCheckbox(options, id) {
    options[id] = localStorage[id] || 'true';
  }

  function loadOptions() {
    var options = {};
    loadCheckbox(options, 'user-popup');
    loadCheckbox(options, 'highlight-author');
    loadCheckbox(options, 'highlight-comments');
    return options;
  }

  chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    var response = request.method == 'getOptions' ? {options: loadOptions()} : {};
    sendResponse(response);
  });
}());