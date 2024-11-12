const hamburgerBtn = document.querySelector("button.hamburger-btn");
const hamburgerMenu = document.querySelector(".hamburger-menu");

// toggle .show-menu class on the .hamburger-menu el to hide/show the menu
// open -> aria-expanded = true on button.hamburger-btn
// closed -> aria-expanded = false on button.hamburger-btn

// TOGGLE FUNCTION
function toggleMenu() {
    hamburgerMenu.classList.toggle("show-menu");
    hamburgerBtn.setAttribute("aria-expanded", hamburgerMenu.classList.contains("show-menu"));
}

// Event listener for button click
hamburgerBtn.addEventListener ("click", toggleMenu);
    console.log('click!')

// Event listener for click outside menu to close if menu is open
document.addEventListener ("click", function(event) {
    if (!hamburgerMenu.contains(event.target) && !hamburgerBtn.contains(event.target) && hamburgerMenu.classList.contains("show-menu")) {
        toggleMenu();
    }
})


// Event listener for ESC key to close menu
document.addEventListener ("keydown", function(event) {
    if (event.key === "Escape" && hamburgerMenu.classList.contains("show-menu")) {
        toggleMenu();
        hamburgerBtn.focus();
    }
})

// Event listener to close the menu if window is resized
window.addEventListener("resize", function () {
    const windowWidth = window.innerWidth;

    if (windowWidth > 800 ) {
        hamburgerMenu.classList.remove("show-menu");
        hamburgerBtn.setAttribute("aria-expanded", "false");
    }
})