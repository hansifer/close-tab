(function(doc) {

	var shortcutKey = doc.getElementById('shortcutKey');

	shortcutKey.addEventListener('change', function() {
		chrome.contextMenus.update('1', {
			title: contextMenuText(shortcutKey.value)
		});

		localStorage.setItem('shortcutKey', shortcutKey.value);
	});

	shortcutKey.value = get('shortcutKey');

	doc.body.style.display = '';
	shortcutKey.focus();

}(document));
