import { get, set, contextMenuLabel } from './common.js';

chrome.runtime.getPlatformInfo((info) => {
  // todo: support for other OS's
  if (info.os === 'mac') {
    document.getElementById('shortcut-key-not-supported').style.display = '';
  } else {
    document.getElementById('shortcut-key-supported').style.display = '';

    const keySelector = document.getElementById('shortcut-key');

    keySelector.addEventListener('change', () => {
      chrome.contextMenus.update('shortcut-key', {
        title: contextMenuLabel(keySelector.value),
      });

      set('shortcut-key', keySelector.value);
    });

    keySelector.value = get('shortcut-key');

    keySelector.focus();
  }
});
