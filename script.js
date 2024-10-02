let verboseLogging = false; // Flag to toggle verbose logging
const pressedKeys = new Set(); // Store currently pressed keys

// Initialize event listeners for keydown and keyup
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Function to handle keydown events
function handleKeyDown(event) {
    event.preventDefault(); // Prevent default actions for all keys

    const keyCode = event.code; // Get the physical key code
    const keyValue = event.key;  // Get the value of the key

    // Add the key to the pressed set if not already pressed
    if (!pressedKeys.has(keyCode)) {
        pressedKeys.add(keyCode); // Track the key pressed
        updatePressedKeys(keyCode, keyValue); // Update highlighted keys
        updateKeyLog(keyCode, keyValue); // Log the key pressed
    }
}

// Function to handle keyup events
function handleKeyUp(event) {
    const keyCode = event.code; // Get the physical key code

    // Remove the key from the pressed set if it was pressed
    if (pressedKeys.delete(keyCode)) {
        // Find the corresponding element based on the key code
        const keyElement = document.querySelector(`.key[data-key="${keyCode}"], .double[data-key="${keyCode}"]`);
        
        // If the key element exists, remove the highlight
        if (keyElement) {
            keyElement.classList.remove('main-pressed', 'secondary-pressed'); // Clear highlights
        }
        
        console.log(`Key Released: ${keyCode}`); // Log the action for debugging
    }
}

// Function to update highlighted keys
function updatePressedKeys(keyCode, keyValue) {
    const elements = document.querySelectorAll('.key, .double'); // Select all key elements

    elements.forEach(element => {
        const mainKeyCode = element.getAttribute('data-key'); // Get the data-key attribute
        const isMainKeyPressed = pressedKeys.has(mainKeyCode); // Check if the main key is pressed

        // Get the secondary key text if it exists
        const secondaryKeyElement = element.querySelector('.secondary');
        const secondaryKeyText = secondaryKeyElement ? secondaryKeyElement.textContent.trim().toLowerCase() : null;

        // Check if the secondary key is pressed based on Shift or other modifiers
        const isTildeKeyPressed = keyCode === 'Backquote' && pressedKeys.has('ShiftLeft');
        const isSecondaryKeyPressed = (secondaryKeyText && keyValue.toLowerCase() === secondaryKeyText && pressedKeys.has('ShiftLeft')) ||
                                       (mainKeyCode === 'Backquote' && isTildeKeyPressed);

        // Log the pressed key information
        console.log(`Key Pressed: ${keyCode}, Key Value: ${keyValue}, Main Key: ${isMainKeyPressed}, Secondary Key: ${isSecondaryKeyPressed}`);

        // Highlight the main key if pressed
        if (isMainKeyPressed) {
            element.classList.add('main-pressed');
        }

        // Highlight the secondary key if pressed
        if (isSecondaryKeyPressed) {
            element.classList.add('secondary-pressed');
        }
    });
}

// Function to update key log
function updateKeyLog(keyCode, keyValue) {
    const logContainer = document.getElementById('key-log');
    logContainer.textContent += `${verboseLogging ? `${keyValue} (${keyCode}) ` : `${keyValue} `}`; // Update log based on verbosity
}

// Function to clear the log
function clearLog() {
    document.getElementById('key-log').textContent = ''; // Clear the log
}

// Toggle verbose logging
document.getElementById('toggle-verbose-btn').addEventListener('change', (event) => {
    verboseLogging = event.target.checked; // Set the flag based on checkbox state
    const sliderLabel = document.querySelector('.slider-label');
    sliderLabel.textContent = verboseLogging ? 'Disable Verbose Logging' : 'Verbose Logging'; // Update label text
});

// Add event listener for clear log button
document.getElementById('clear-log-btn').addEventListener('click', clearLog);