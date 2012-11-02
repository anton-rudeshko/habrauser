(function (chrome) {
  var runtime = chrome.runtime,
    sync = chrome.storage.sync;

  runtime.onInstalled.addListener(function () {
    sync.set({'new-version': runtime.getManifest().version});
  });
}(chrome));