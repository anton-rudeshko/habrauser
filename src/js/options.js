function saveCheckboxById(id) {
  localStorage[id] = document.getElementById(id).checked;
}

function loadCheckboxById(id) {
  document.getElementById(id).checked = localStorage[id] === 'true';
}

function saveOptions() {
  saveCheckboxById('user-popup');
  saveCheckboxById('highlight-author');
  saveCheckboxById('highlight-comments');

  var status = document.getElementById('status');
  status.innerHTML = 'Сохранено';
  setTimeout(function () {
    status.innerHTML = '';
  }, 750);
}

function loadOptions() {
  loadCheckboxById('user-popup');
  loadCheckboxById('highlight-author');
  loadCheckboxById('highlight-comments');
}

(function () {
  var i,
    inputs = document.querySelectorAll('input'),
    length = inputs.length;
  for (i = 0; i < length; i++) {
    inputs[i].addEventListener('change', saveOptions);
  }

  loadOptions();
}());