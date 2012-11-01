(function (document, localStorage) {
  var userPopup = 'user-popup',
    highlightAuthor ='highlight-author',
    highlightComments = 'highlight-comments';

  function saveCheckboxById(id) {
    localStorage[id] = document.getElementById(id).checked;
  }

  function loadCheckboxById(id, defaultValue) {
    document.getElementById(id).checked = (localStorage[id] || defaultValue) === 'true';
  }

  function saveOptions() {
    saveCheckboxById(userPopup);
    saveCheckboxById(highlightAuthor);
    saveCheckboxById(highlightComments);

    var status = document.getElementById('status');
    status.innerHTML = 'Сохранено';
    setTimeout(function () {
      status.innerHTML = '';
    }, 750);
  }

  function loadOptions() {
    loadCheckboxById(userPopup, 'true');
    loadCheckboxById(highlightAuthor, 'true');
    loadCheckboxById(highlightComments, 'false');
  }

  var i,
    inputs = document.querySelectorAll('input'),
    length = inputs.length;
  for (i = 0; i < length; i++) {
    inputs[i].addEventListener('change', saveOptions);
  }

  loadOptions();
}(document, localStorage));