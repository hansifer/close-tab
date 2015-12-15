<img src="http://hansifer.com/CloseTab/githubTitle.png">
========

#### A browser extension that adds a `Close tab` entry to the page context menu

Available for [Chrome](https://chrome.google.com/webstore/detail/closetab/lnchemdcmhoccciihokpdkkekmnejfhj) and [Opera](https://addons.opera.com/en/extensions/details/closetab/), but [not Safari](#osx)

<div align="center"><img src="http://hansifer.com/CloseTab/screenshot_chrome.png"></div>

The menu item shortcut key is customizable in case the default (C) collides with that of another menu item.

<div align="center"><img src="http://hansifer.com/CloseTab/options.png"></div>

#### Why is this useful?

CloseTab enables you to close a web page in a snap with a right mouse click anywhere on the page followed by a left-handed key press, rather than moving the mouse cursor to the relatively small click target presented by the page tab's close icon and clicking it.

This works well with the dual keyboard/mouse hand positioning commonly employed during web browser engagement, as depicted in this professionally-rendered illustration:

<div>&nbsp;</div>
<div>&nbsp;</div>

<div align="center"><img src="http://hansifer.com/CloseTab/hand_positioning.jpg"></div>

#### OS X<a name="osx"></a>

CloseTab has limited usefulness in OS X environments because OS X lacks customizable accelerator keys for menu items. The first letter of a menu item's title always serves as its accelerator key. 

Furthermore, typing the first letter of an item's title simply selects the item. *It doesn't activate it*. Contrary to MS Windows behavior, this holds true even if there is only one item in the menu starting with the same letter.

For the above reasons, a Safari port of this extension is relatively pointless. For Chrome and Opera on OS X, the Options page is altered in-flight to hide the menu item shortcut key option. Although not ideal, this seems to be the best approach since extensions currently cannot target OS-specific platforms (eg, via manifest or web store settings), nor is there any means beyond a static manifest-based specification for controlling access to extension options as presented by the browser.
