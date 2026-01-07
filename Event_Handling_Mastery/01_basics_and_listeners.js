/**
 * 01_basics_and_listeners.js
 * 
 * Concepts covered:
 * 1. addEventListener
 * 2. Event Object (e)
 * 3. { once: true } option
 * 4. removeEventListener
 */

const logArea = document.getElementById('log');
function log(msg) {
    const div = document.createElement('div');
    div.textContent = `> ${msg}`;
    logArea.prepend(div); // Add new logs to the top
    console.log(msg);
}

// 1. Standard Event Listener
const btnStandard = document.getElementById('btn-standard');
// We pass a function reference. 'e' is the Event Object automatically passed by browser.
btnStandard.addEventListener('click', (e) => {
    log(`Standard Button Clicked! Type: ${e.type}, Target: ${e.target.tagName}`);
    // e.target is the element that triggered the event
});

// 2. The { once: true } option
const btnOnce = document.getElementById('btn-once');
btnOnce.addEventListener('click', () => {
    log('✅ This will only run ONE time. Try clicking again!');
}, { once: true }); // Automatically removes itself after first run

// 3. Removing Event Listeners
const btnRemovable = document.getElementById('btn-removable');
const btnRemoveAction = document.getElementById('btn-remove-listener');

// IMPORTANT: To remove a listener, the handler function MUST be a named function (or a saved reference).
// You cannot remove an anonymous function like () => {} because they are different references in memory.
function handleRemovableClick() {
    log('I am a removable listener. I am still active.');
    btnRemovable.style.backgroundColor = btnRemovable.style.backgroundColor === 'yellow' ? '' : 'yellow';
}

// Add the named function
btnRemovable.addEventListener('click', handleRemovableClick);

btnRemoveAction.addEventListener('click', () => {
    // Remove the listener
    btnRemovable.removeEventListener('click', handleRemovableClick);
    log('❌ Listener removed from the button above. Clicking it will do nothing now.');
});
