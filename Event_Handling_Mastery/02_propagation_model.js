/**
 * 02_propagation_model.js
 * 
 * Concepts covered:
 * 1. Introduction to the 3 Phases: Capturing -> Target -> Bubbling
 * 2. Visualizing the order of execution
 */

const grandparent = document.getElementById('grandparent');
const parent = document.getElementById('parent');
const child = document.getElementById('child');
const logArea = document.getElementById('log');
const clearBtn = document.getElementById('btn-clear');
const captureCheckbox = document.getElementById('chk-capture');

// Helper Logger
function log(msg, phase) {
    const div = document.createElement('div');
    div.textContent = msg;

    if (phase === 1) div.className = 'phase-capture';
    else if (phase === 2) div.className = 'phase-target';
    else if (phase === 3) div.className = 'phase-bubble';

    logArea.appendChild(div); // Add to bottom to read naturally
    logArea.scrollTop = logArea.scrollHeight;
}

function handleEvent(e) {
    // e.eventPhase is an integer: 1=Capture, 2=Target, 3=Bubble
    let phaseName = '';
    if (e.eventPhase === 1) phaseName = 'CAPTURING (Downwards ↓)';
    else if (e.eventPhase === 2) phaseName = 'TARGET (Hit 🎯)';
    else if (e.eventPhase === 3) phaseName = 'BUBBLING (Upwards ↑)';

    // e.currentTarget is WHO is handling it right now
    // e.target is WHO was actually clicked
    const elemName = e.currentTarget.id.toUpperCase();

    log(`${phaseName} : Reached ${elemName}`, e.eventPhase);
}

// Function to attach listeners based on checkbox state
function attachListeners() {
    // First, remove old listeners to avoid duplicates
    grandparent.removeEventListener('click', handleEvent, true);
    grandparent.removeEventListener('click', handleEvent, false);
    parent.removeEventListener('click', handleEvent, true);
    parent.removeEventListener('click', handleEvent, false);
    child.removeEventListener('click', handleEvent, true);
    child.removeEventListener('click', handleEvent, false);

    const useCapture = captureCheckbox.checked;

    // Attach new listeners
    // 3rd argument: true = Capture Phase, false (default) = Bubble Phase
    grandparent.addEventListener('click', handleEvent, useCapture);
    parent.addEventListener('click', handleEvent, useCapture);
    child.addEventListener('click', handleEvent, useCapture);

    log('--- Listeners Updated. Click a box! ---');
    log(`Mode: ${useCapture ? 'CAPTURING (Top -> Down)' : 'BUBBLING (Bottom -> Up)'}`);
}

// Initial Setup
attachListeners();

// Re-attach when checkbox changes to see the difference
captureCheckbox.addEventListener('change', () => {
    logArea.innerHTML = ''; // Clear log for clarity
    attachListeners();
});

clearBtn.addEventListener('click', () => logArea.innerHTML = '');
