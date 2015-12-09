(function(doc) {

	var shortcutKey = doc.getElementById('shortcut-key');

	shortcutKey.addEventListener('change', function() {
		chrome.contextMenus.update('shortcut-key', {
			title: contextMenuLabel(shortcutKey.value)
		});

		set('shortcut-key', shortcutKey.value);
	});

	shortcutKey.value = get('shortcut-key');

	doc.body.style.display = '';
	shortcutKey.focus();

}(document));
