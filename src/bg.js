import { OTHER_SHORTCUT_KEYS } from './config.js';
import { getShortcutKey } from './storage.js';

const MENU_ID = 'close-tab';

// ------------------------ HANDLE ACTION ------------------------

chrome.runtime.onInstalled.addListener(async () => {
  const shortcutKey = await getShortcutKey();

  chrome.contextMenus.create({
    id: MENU_ID,
    title: getMenuItemLabel(shortcutKey),
    // contexts: ['all'],
    contexts: [
      'page',
      'frame',
      'selection',
      'link',
      'editable',
      'image',
      'video',
      'audio',
    ], //  eliminate 'browser_action', 'page_action'
  });
});

chrome.contextMenus.onClicked.addListener(({ menuItemId }, tab) => {
  if (menuItemId === MENU_ID) {
    chrome.tabs.remove(tab.id);
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.remove(tab.id);
});

// --------------------- SET MENU ITEM LABEL ---------------------

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync') {
    const newShortcutKey = changes.shortcutKey?.newValue;
    if (newShortcutKey) updateMenuItemLabel(newShortcutKey);
  }
});

// ----------------------------- UTIL -----------------------------

function updateMenuItemLabel(key) {
  chrome.contextMenus.update(MENU_ID, {
    title: getMenuItemLabel(key),
  });
}

function getMenuItemLabel(key) {
  return OTHER_SHORTCUT_KEYS.includes(key)
    ? `Close tab  (&${key})`
    : '&Close tab';
}
