chrome.runtime.getPlatformInfo(async ({ os }) => {
  // todo: consideration for other OS's
  if (os === 'mac') {
    document.getElementById('shortcut-key-not-supported').style.display = '';
  } else {
    const shortcutKeySelector = document.getElementById('shortcut-key');

    for (const shortcutKey of [DEFAULT_SHORTCUT_KEY, ...OTHER_SHORTCUT_KEYS]) {
      shortcutKeySelector.appendChild(createOption(shortcutKey));
    }

    shortcutKeySelector.value = await getShortcutKey();

    shortcutKeySelector.addEventListener('change', () => {
      setShortcutKey(shortcutKeySelector.value);
    });

    document.getElementById('shortcut-key-supported').style.display = '';

    shortcutKeySelector.focus();
  }
});

function createOption(shortcutKey) {
  const el = document.createElement('option');
  el.textContent = shortcutKey.toLowerCase();
  el.setAttribute('value', shortcutKey);
  return el;
}
