    chrome.contextMenus.create({
    	id: '1',
    	title: contextMenuText(get('shortcutKey')),
    	contexts: ['all'],
    	onclick: function(info, t) {
    		chrome.tabs.remove(t.id);
    	}
    });
