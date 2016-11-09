'use strict';
const remote = require('remote')
const Menu = remote.require('menu')
const MenuItem = remote.require('menu-item')

// Build our new menu
const menu = new Menu()

menu.append(new MenuItem({
	label: 'Delete',
	click() {
		// Trigger an alert when menu item is clicked
		alert('Deleted')
	}
}))

menu.append(new MenuItem({
	label: 'More Info...',
	click() {
		// Trigger an alert when menu item is clicked
		alert('Here is more information')
	}
}))

// Add the listener
/*
window.addEventListener('DOMContentLoaded', () => {
	window.querySelector('.js-context-menu').addEventListener('click', event => {
		menu.popup(remote.getCurrentWindow());
	})
})
*/
