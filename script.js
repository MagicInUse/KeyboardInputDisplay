const pressedKeys = new Set();

document.addEventListener('keydown', (event) => {
    event.preventDefault(); // Prevent default actions
    const key = event.key.toLowerCase();
    if (!pressedKeys.has(key)) {
        pressedKeys.add(key);
        updatePressedKeys();
        updateKeyLog(key);
    }
});

document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (pressedKeys.has(key)) {
        pressedKeys.delete(key);
        updatePressedKeys();
    }
});

function updatePressedKeys() {
    // Select all elements with the class 'key' or 'double'
    const elements = document.querySelectorAll('.key, .double');

    // Loop through each key element
    elements.forEach(element => {
        // Get the main key text content and convert it to lowercase
        const mainKeyText = element.childNodes[0].nodeValue.trim().toLowerCase();

        // Get the secondary character if it exists
        const secondaryKeyElement = element.querySelector('.secondary');
        const secondaryKey = secondaryKeyElement ? secondaryKeyElement.textContent.trim().toLowerCase() : null;

        // Check if the main key is currently pressed
        const isMainKeyPressed = pressedKeys.has(mainKeyText) || 
            (mainKeyText === ' ' && pressedKeys.has('space')) || 
            (mainKeyText === 'ctrl' && (pressedKeys.has('control') || pressedKeys.has('ctrl'))) || 
            (mainKeyText === '~' && pressedKeys.has('`')) || 
            (mainKeyText === 'alt' && pressedKeys.has('alt')) ||
            (mainKeyText === 'esc' && pressedKeys.has('escape')) ||
            (mainKeyText.startsWith('f') && pressedKeys.has(mainKeyText)); // Handle F-keys (e.g. F1, F2, etc.)

        // Check if the secondary key is currently pressed
        const isSecondaryKeyPressed = secondaryKey && pressedKeys.has(secondaryKey);

        // Add or remove the 'pressed' class based on the key pressed status
        if (isMainKeyPressed) {
            element.classList.add('main-pressed');
        } else {
            element.classList.remove('main-pressed');
        }

        if (isSecondaryKeyPressed) {
            element.classList.add('secondary-pressed');
        } else {
            element.classList.remove('secondary-pressed');
        }
    });
}



function updateKeyLog(key) {
    const logContainer = document.getElementById('key-log');
    logContainer.textContent += key + ' '; // Append key to the log with space
}

function clearLog() {
    const logContainer = document.getElementById('key-log');
    logContainer.textContent = ''; // Clear the log
}

// Add event listener for clear log button
document.getElementById('clear-log-btn').addEventListener('click', clearLog);
