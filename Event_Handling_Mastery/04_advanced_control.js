/**
 * 04_advanced_control.js
 * 
 * Concepts:
 * 1. stopPropagation() - Stops bubbling to parents.
 * 2. stopImmediatePropagation() - Stops bubbling AND other listeners on the SAME element.
 * 3. preventDefault() - Stops browser native behavior.
 */

const logArea = document.getElementById('log');
function log(msg) {
    const div = document.createElement('div');
    div.innerHTML = `> ${msg}`;
    logArea.prepend(div);
}

// --- 1. stopPropagation Demo ---
const outerBox = document.getElementById('outer-box');
const innerBox = document.getElementById('inner-box');
const btnStop = document.getElementById('btn-stop');
const btnNormal = document.getElementById('btn-normal');

outerBox.addEventListener('click', () => log('🟦 Outer Box Checked (Bubbled Up)'));
innerBox.addEventListener('click', () => log('🟥 Inner Box Checked (Bubbled Up)'));

btnNormal.addEventListener('click', () => {
    log('✅ Normal Button Clicked. Event will bubble up...');
});

btnStop.addEventListener('click', (e) => {
    log('🛑 Stop Button Clicked. Calling <span class="highlight">e.stopPropagation()</span>');
    e.stopPropagation();
    // This PREVENTS the event from reaching 'innerBox' and 'outerBox' listeners on bubble phase.
});


// --- 2. stopImmediatePropagation Demo ---
const btnImmediate = document.getElementById('btn-immediate');

// Listener A
btnImmediate.addEventListener('click', (e) => {
    log('1️⃣ Listener 1 ran.');
    // Uncomment next line to see effect
    log('🛑 Listener 1 called <span class="highlight">stopImmediatePropagation()</span>');
    e.stopImmediatePropagation();
});

// Listener B
btnImmediate.addEventListener('click', () => {
    log('2️⃣ Listener 2 ran. (If you see this, immediate propagation was NOT stopped)');
});

// Listener C (on parent, just to show bubbling stop too)
document.body.addEventListener('click', (e) => {
    if (e.target === btnImmediate) log('Body listener (Bubbling) still hit? No, immediate stop also stops bubbling.');
});


// --- 3. preventDefault Demo ---
const link = document.getElementById('link-prevent');
link.addEventListener('click', (e) => {
    log('🔗 Link clicked. Calling <span class="highlight">e.preventDefault()</span>');
    e.preventDefault();
    log('The browser will NOT open the new tab.');
});
