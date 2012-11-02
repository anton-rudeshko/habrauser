(function (document) {

  var defaults = {
      'user-popup': true,
      'highlight-author': true,
      'highlight-comments': true
    },
    saveTimeout,
    sync = chrome.storage.sync;

  function saveCheckbox() {
    var opts = {};
    opts[this.id] = this.checked;
    sync.set(opts, onSave);
  }

  function isDefined(obj) {
    return obj !== null && typeof obj !== 'undefined';
  }

  function load(options, id) {
    document.getElementById(id).checked = isDefined(options[id]) ? options[id] : defaults[id];
  }

  function onSave() {
    var status = document.getElementById('status');
    status.innerHTML = 'Сохранено';
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(function () {
      status.innerHTML = '';
    }, 750);
  }

  sync.get(null, function (options) {
    var i,
      inputs = document.querySelectorAll('input'),
      length = inputs.length;

    for (i = 0; i < length; i++) {
      inputs[i].addEventListener('change', saveCheckbox, false);
      load(options, inputs[i].id);
    }
  });
}(document));