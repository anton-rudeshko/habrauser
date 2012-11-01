(function (document, localStorage) {
  var userPopupId = 'user-popup',
    highlightAuthor ='highlight-author',
    highlightComments = 'highlight-comments';

  function saveCheckboxById(id) {
    localStorage[id] = document.getElementById(id).checked;
  }

  function loadCheckboxById(id) {
    document.getElementById(id).checked = localStorage[id] === 'true';
  }

  function saveOptions() {
    saveCheckboxById(userPopupId);
    saveCheckboxById(highlightAuthor);
    saveCheckboxById(highlightComments);

    var status = document.getElementById('status');
    status.innerHTML = 'Сохранено';
    setTimeout(function () {
      status.innerHTML = '';
    }, 750);
  }

  function loadOptions() {
    loadCheckboxById(userPopupId);
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