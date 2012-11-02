(function (document, localStorage) {
  var userPopup = 'user-popup',
    highlightAuthor ='highlight-author',
    highlightComments = 'highlight-comments',
    saveTimeout;

  function saveCheckboxById(id) {
    localStorage[id] = document.getElementById(id).checked;
  }

  function loadCheckboxById(id) {
    document.getElementById(id).checked = localStorage[id] === 'true';
  }

  function saveOptions() {
    saveCheckboxById(userPopup);
    saveCheckboxById(highlightAuthor);
    saveCheckboxById(highlightComments);

    var status = document.getElementById('status');
    status.innerHTML = 'Сохранено';
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(function () {
      status.innerHTML = '';
    }, 750);
  }

  function loadOptions() {
    loadCheckboxById(userPopup);
    loadCheckboxById(highlightAuthor);
    loadCheckboxById(highlightComments);
  }

  var i,
    inputs = document.querySelectorAll('input'),
    length = inputs.length;
  for (i = 0; i < length; i++) {
    inputs[i].addEventListener('change', saveOptions);
  }

  loadOptions();
}(document, localStorage));