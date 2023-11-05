const OLD_KEY = 'shortcutKey';
const NEW_KEY = 'shortcut-key';

const getStorageItems = () => new Promise(chrome.storage.sync.get);

async function getShortcutKey() {
  const { shortcutKey } = await getStorageItems();

  const localStorageVal =
    localStorage.getItem(NEW_KEY) || localStorage.getItem(OLD_KEY);

  if (localStorageVal) {
    localStorage.removeItem(NEW_KEY);
    localStorage.removeItem(OLD_KEY);

    if (!shortcutKey) {
      chrome.storage.sync.set({
        shortcutKey: localStorageVal,
      });

      return localStorageVal;
    }
  }

  return shortcutKey || DEFAULT_SHORTCUT_KEY;
}

function setShortcutKey(val) {
  localStorage.removeItem(NEW_KEY);
  localStorage.removeItem(OLD_KEY);

  return chrome.storage.sync.set({
    shortcutKey: val,
  });
}
