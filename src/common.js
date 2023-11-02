const DEFAULT_KEY = 'C';
const OTHER_KEYS = ['W', 'Q', 'X', 'E', 'D', 'Z'];

export function contextMenuLabel(shortcutKey) {
  if (OTHER_KEYS.includes(shortcutKey)) {
    return 'Close tab  (&' + shortcutKey + ')';
  }

  return '&Close tab';
}

export function get(key) {
  var val = localStorage.getItem(key);

  if (val == null && key === 'shortcut-key') {
    val = localStorage.getItem('shortcutKey');
  }

  if (val) return val;

  // return default

  switch (key) {
    case 'shortcut-key':
      return DEFAULT_KEY;
  }
}

export function set(key, val) {
  if (key === 'shortcut-key') {
    localStorage.removeItem('shortcutKey');
  }

  localStorage.setItem(key, val);
}
