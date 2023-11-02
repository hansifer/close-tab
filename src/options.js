import { get, set, contextMenuLabel } from './common.js';

chrome.runtime.getPlatformInfo((info) => {
  // todo: support for other OS's
  if (info.os === 'mac') {
    document.getElementById('shortcut-key-not-supported').style.display = '';
  } else {
    document.getElementById('shortcut-key-supported').style.display = '';

    var shortcutKey = document.getElementById('shortcut-key');

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
