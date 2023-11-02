/* global chrome:true, contextMenuLabel:true, get:true, set:true */

(function (doc) {
  chrome.runtime.getPlatformInfo(function (info) {
    // todo: support for other OS's
    if (info.os === 'mac') {
      doc.getElementById('shortcut-key-not-supported').style.display = '';
    } else {
      doc.getElementById('shortcut-key-supported').style.display = '';

      var shortcutKey = doc.getElementById('shortcut-key');

      shortcutKey.addEventListener('change', function () {
        chrome.contextMenus.update('shortcut-key', {
          title: contextMenuLabel(shortcutKey.value),
        });

        set('shortcut-key', shortcutKey.value);
      });

      shortcutKey.value = get('shortcut-key');

      shortcutKey.focus();
    }
  });
})(document);
