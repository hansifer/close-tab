/* global chrome:true, contextMenuLabel:true, get:true */

chrome.contextMenus.create({
	id: 'shortcut-key',
	title: contextMenuLabel(get('shortcut-key')),
	// contexts: ['all'],
	contexts: ['page', 'frame', 'selection', 'link', 'editable', 'image', 'video', 'audio'], //  eliminate 'browser_action', 'page_action'
	onclick: function(info, t) {
		chrome.tabs.remove(t.id);
	}
});

chrome.browserAction.onClicked.addListener(function(t) {
	chrome.tabs.remove(t.id);
});
