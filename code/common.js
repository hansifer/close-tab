function contextMenuText(shortcutKey) {
    switch (shortcutKey) {
        case 'W':
        case 'Q':
        case 'X':
        case 'E':
        case 'D':
        case 'Z':
            return 'Close tab  (&' + shortcutKey + ')';
    }

    return '&Close tab';
}

function get(key) {
    var val = localStorage.getItem(key);

    if (val) {
        return val;
    }

    // return default
    switch (key) {
        case 'shortcutKey':
            return 'C';
    }
}
