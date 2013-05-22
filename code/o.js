if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', initDOM, false);
}

function initDOM() {
	var shortcutKeyValue = localStorage.getItem('shortcutKey');
	if (shortcutKeyValue) {
		document.querySelector('#shortcutKey').value = shortcutKeyValue;
	}

	document.querySelector('#shortcutKey').addEventListener('change',
	    function () {
	    	localStorage.setItem('shortcutKey',this.value);
	    	chrome.extension.getBackgroundPage().setContextMenuLineItemShortcutKeyFromLocalStorage();
	    });
}
