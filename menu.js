/*
An accessible menu for WordPress

https://github.com/theme-smith/accessible-nav-wp
Kirsten Smith (kirsten@themesmith.co.uk)
Licensed GPL v.2 (http://www.gnu.org/licenses/gpl-2.0.html)

This work derived from:
https://github.com/WordPress/twentysixteen (GPL v.2)
https://github.com/wpaccessibility/a11ythemepatterns/tree/master/menu-keyboard-arrow-nav (GPL v.2)
*/

var menuContainer = document.querySelector(".menu-container");
var menuToggle = menuContainer.querySelector(".menu-button");
var siteHeaderMenu = menuContainer.querySelector("#site-header-menu");
var siteNavigation = menuContainer.querySelector("#site-navigation");

// If you are using WordPress, and do not need to localise your script, or if you are not using WordPress, then uncomment the next line
// var screenReaderText = {"expand":"Expand child menu","collapse":"Collapse child menu"};

var dropdownToggle = document.createElement("button");
dropdownToggle.setAttribute("aria-expanded", false);
dropdownToggle.classList.add("dropdown-toggle");
var dropdownToggleSpan = document.createElement("span");
dropdownToggleSpan.classList.add("screen-readers");
var dropdownToggleSpanText = document.createTextNode(screenReaderText.expand);
dropdownToggleSpan.appendChild(dropdownToggleSpanText);
dropdownToggle.appendChild(dropdownToggleSpan);

// Toggles the menu button
(function() {
  if (!menuToggle) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  siteNavigation.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", function() {
    this.classList.toggle("toggled-on");
    siteHeaderMenu.classList.toggle("toggled-on");

    this.setAttribute(
      "aria-expanded",
      this.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
    siteNavigation.setAttribute(
      "aria-expanded",
      this.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
})();

// Adds the dropdown toggle button
document.querySelectorAll(".menu-item-has-children > a").forEach(function(el) {
  var clone = dropdownToggle.cloneNode();
  el.parentNode.insertBefore(clone, el.nextSibling);
});

// If a dropdown has no top-level link (it's dummied to act as group, then skip it from tab order)
siteNavigation.querySelectorAll('[href="#"]').forEach(function(el) {
  el.setAttribute("tabindex", -1);
});

// Adds aria attribute
siteHeaderMenu
  .querySelectorAll(".menu-item-has-children")
  .forEach(function(el) {
    el.setAttribute("aria-haspopup", "true");
  });

// Toggles the sub-menu when dropdown toggle button clicked
siteHeaderMenu.querySelectorAll(".dropdown-toggle").forEach(function(el) {
  el.addEventListener("click", function(e) {
    screenReaderSpan = this.querySelectorAll(".screen-readers");

    e.preventDefault();
    this.classList.toggle("toggled-on");
    this.nextElementSibling.classList.toggle("toggled-on");
    this.setAttribute(
      "aria-expanded",
      this.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
    screenReaderSpan.forEach(function(el) {
      el.textContent = screenReaderText.expand
        ? screenReaderText.collapse
        : screenReaderText.expand;
    });
  });
});

// Adds a class to sub-menus for styling
var submenus = document.querySelectorAll(".sub-menu .menu-item-has-children");
submenus.forEach(function(el) {
  // console.log(el.parentNode);
  el.parentNode.classList.add("has-sub-menu");
});
