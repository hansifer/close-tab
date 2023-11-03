import { DEFAULT_SHORTCUT_KEY } from './config.js';

const cache = {
  shortcutKey: DEFAULT_SHORTCUT_KEY,
};

const storageInit = chrome.storage.sync.get().then((items) => {
  Object.assign(cache, items);
});

export async function getShortcutKey() {
  await storageInit;

  return cache.shortcutKey || DEFAULT_SHORTCUT_KEY;
}

export async function setShortcutKey(val) {
  await storageInit;

  cache.shortcutKey = val;
  chrome.storage.sync.set(cache);
}
