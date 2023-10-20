// Get references to elements
const usernameElement = document.getElementById('username');
const passwordElement = document.getElementById('password');
const toggleButton = document.getElementById('toggleButton');

// Add a click event listener to the button
toggleButton.addEventListener('click', function () {
    if (usernameElement.style.visibility === 'hidden') {
        // If elements are hidden, show them
        toggleButton.textContent = 'Hide';
        toggleButton.style.background = '#f1a04a';
        usernameElement.style.visibility = 'visible';
        passwordElement.style.visibility = 'visible';
    } else {
        // If elements are visible, hide them
        toggleButton.textContent = 'Show';
        toggleButton.style.background = '#eaff4c';
        usernameElement.style.visibility = 'hidden';
        passwordElement.style.visibility = 'hidden';
    }
});
