import { DEFAULT_SHORTCUT_KEY } from './config.js';

export async function getShortcutKey() {
  const { shortcutKey } = await chrome.storage.sync.get();

  return shortcutKey || DEFAULT_SHORTCUT_KEY;
}

export function setShortcutKey(val) {
  return chrome.storage.sync.set({
    shortcutKey: val,
  });
}
