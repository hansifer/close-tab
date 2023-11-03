import { contextMenuLabel, get } from './common.js';

chrome.contextMenus.create({
  id: 'shortcut-key',
  title: contextMenuLabel(get('shortcut-key')),
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
