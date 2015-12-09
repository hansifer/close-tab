    chrome.contextMenus.create({
    	id: 'shortcut-key',
    	title: contextMenuLabel(get('shortcut-key')),
    	contexts: ['all'],
    	onclick: function(info, t) {
    		chrome.tabs.remove(t.id);
    	}
    });

    chrome.browserAction.onClicked.addListener(function(t) {
    		chrome.tabs.remove(t.id);
    });
