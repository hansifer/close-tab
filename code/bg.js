chrome.contextMenus.create({ id: "1", type: 'normal', title: '&Close tab', contexts: ['page'], onclick: function (i, t) { chrome.tabs.remove(t.id); } });

setContextMenuLineItemShortcutKeyFromLocalStorage();

function setContextMenuLineItemShortcutKey(inShortcutKey){
	if (inShortcutKey == 'W' || inShortcutKey == 'Q' || inShortcutKey == 'X' || inShortcutKey == 'E' || inShortcutKey == 'D' || inShortcutKey == 'Z') {
		chrome.contextMenus.update("1", {title: 'Close tab  (&' + inShortcutKey + ')'});
	} else {
		chrome.contextMenus.update("1", {title: '&Close tab'});
	}
}

function setContextMenuLineItemShortcutKeyFromLocalStorage(){
	var s = localStorage.getItem('shortcutKey');
	if (s) {
		setContextMenuLineItemShortcutKey(s);
	}
}