const pressedKeys = new Set();

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (!pressedKeys.has(key)) {
        pressedKeys.add(key);
        updatePressedKeys();
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
    const elements = document.querySelectorAll('.key');
    elements.forEach(element => {
        const elementKey = element.textContent.toLowerCase();
        if (pressedKeys.has(elementKey) || 
            (elementKey === 'space' && pressedKeys.has(' ')) || 
            (elementKey === 'ctrl' && (pressedKeys.has('control') || pressedKeys.has('ctrl'))) || 
            (elementKey === '~' && pressedKeys.has('`')) || 
            (elementKey === 'alt' && pressedKeys.has('alt'))) {
            element.classList.add('pressed');
        } else {
            element.classList.remove('pressed');
        }
    });
}