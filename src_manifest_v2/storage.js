const OLD_KEY = 'shortcutKey';
const NEW_KEY = 'shortcut-key';

const cache = {};

const storageInit = new Promise((resolve) => {
  chrome.storage.sync.get((items) => {
    Object.assign(cache, items);
    resolve();
  });
});

async function getShortcutKey() {
  await storageInit;

  const localStorageVal =
    localStorage.getItem(NEW_KEY) || localStorage.getItem(OLD_KEY);

  if (localStorageVal) {
    localStorage.removeItem(NEW_KEY);
    localStorage.removeItem(OLD_KEY);

    if (!cache.shortcutKey) {
      cache.shortcutKey = localStorageVal;
      chrome.storage.sync.set(cache);
    }
  }

  return cache.shortcutKey || DEFAULT_SHORTCUT_KEY;
}

async function setShortcutKey(val) {
  await storageInit;

  cache.shortcutKey = val;
  chrome.storage.sync.set(cache);

  localStorage.removeItem(NEW_KEY);
  localStorage.removeItem(OLD_KEY);
}
