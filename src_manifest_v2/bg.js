const MENU_ID = 'close-tab';

// ------------------------ HANDLE ACTION ------------------------

chrome.contextMenus.create({
  id: MENU_ID,
  title: getMenuItemLabel(DEFAULT_SHORTCUT_KEY),
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
  onclick: (_, tab) => {
    chrome.tabs.remove(tab.id);
  },
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.remove(tab.id);
});

// --------------------- SET MENU ITEM LABEL ---------------------

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync') {
    const newShortcutKey = changes.shortcutKey?.newValue;
    if (newShortcutKey) updateMenuItemLabel(newShortcutKey);
  }
});

initMenuItemLabel();

// ----------------------------- UTIL -----------------------------

async function initMenuItemLabel() {
  const shortcutKey = await getShortcutKey();

  if (shortcutKey !== DEFAULT_SHORTCUT_KEY) {
    updateMenuItemLabel(shortcutKey);
  }
}

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
