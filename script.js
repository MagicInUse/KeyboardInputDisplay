let verboseLogging = false; // Flag to toggle verbose logging

const pressedKeys = new Set();

document.addEventListener('keydown', (event) => {
    event.preventDefault(); // Prevent default actions
    const keyCode = event.code;
    const keyValue = event.key;
    
    if (!pressedKeys.has(keyCode)) {
        pressedKeys.add(keyCode);
        updatePressedKeys(keyCode, keyValue);
        updateKeyLog(keyCode, keyValue);
    }
});

document.addEventListener('keyup', (event) => {
    const keyCode = event.code;
    const keyValue = event.key;
    
    if (pressedKeys.has(keyCode)) {
        pressedKeys.delete(keyCode);
        updatePressedKeys(keyCode, keyValue);
    }
});

function updatePressedKeys(keyCode, keyValue) {
    // Select all elements with the class 'key' or 'double'
    const elements = document.querySelectorAll('.key, .double');

    // Loop through each key element
    elements.forEach(element => {
        // Get the data-key attribute from the main key and secondary key (if exists)
        const mainKeyCode = element.getAttribute('data-key');
        const secondaryKeyElement = element.querySelector('.secondary');
        
        // Handle keys with both primary and secondary characters (double keys)
        const mainKeyText = element.childNodes.length > 1 ? element.childNodes[0].nodeValue.trim() : element.textContent.trim();
        const secondaryKeyText = secondaryKeyElement ? secondaryKeyElement.textContent.trim() : null;

        // Check if the main key is currently pressed based on both keyCode and keyValue
        const isMainKeyPressed = pressedKeys.has(mainKeyCode) && keyValue.toLowerCase() === mainKeyText.toLowerCase();

        // Check if the secondary key is currently pressed based on both keyCode and keyValue
        const isSecondaryKeyPressed = secondaryKeyElement && pressedKeys.has(mainKeyCode) && keyValue === secondaryKeyText;

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

function updateKeyLog(keyCode, keyValue) {
    const logContainer = document.getElementById('key-log');
    if (verboseLogging) {
        logContainer.textContent += `${keyValue} (${keyCode}) `; // Verbose logging (key and keyCode)
    } else {
        logContainer.textContent += `${keyValue} `; // Simple logging (key only)
    }
}

function clearLog() {
    const logContainer = document.getElementById('key-log');
    logContainer.textContent = ''; // Clear the log
}

// Toggle verbose logging
document.getElementById('toggle-verbose-btn').addEventListener('change', (event) => {
    verboseLogging = event.target.checked; // Set the flag based on checkbox state
    const sliderLabel = document.querySelector('.slider-label');

    // Update label text based on the checkbox state
    if (verboseLogging) {
        sliderLabel.textContent = 'Disable Verbose Logging'; // Update label text
    } else {
        sliderLabel.textContent = 'Verbose Logging'; // Reset to original label text
    }
});

// Add event listener for clear log button
document.getElementById('clear-log-btn').addEventListener('click', clearLog);