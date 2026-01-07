/**
 * 03_event_delegation.js
 * 
 * Concepts covered:
 * 1. Event Bubbling usage (Delegation relies on bubbling).
 * 2. Using `e.target` to identify which child was clicked.
 * 3. Handling dynamic content efficiently.
 */

const todoList = document.getElementById('todo-list');
const input = document.getElementById('new-item');
const addBtn = document.getElementById('btn-add');

// --- THE CORE CONCEPT ---
// distinct listener for the list container ONLY.
todoList.addEventListener('click', (e) => {
    // e.target is the specific element clicked (could be text, the li, or the button)

    // Check if the clicked element is the Delete Button
    // We use .matches() or classList.contains() to check
    if (e.target.classList.contains('delete-btn')) {
        // Find the parent <li> and remove it
        const li = e.target.closest('li');
        li.remove();
        console.log('Delegation: Deleted an item.');
    }
    // Check if the clicked element is the LI itself (to toggle complete)
    else if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
        console.log('Delegation: Toggled completion.');
    }
});

// --- Adding items dynamically ---
addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement('li');
    li.innerHTML = `${text} <button class="delete-btn">X</button>`;

    // Notice: We do NOT add any event listeners to this new 'li' or its button.
    // The existing listener on 'todoList' handles it automatically via bubbling!
    todoList.appendChild(li);
    input.value = '';
    console.log('Added new item (no new listeners attached)');
});

// Allow 'Enter' key to add
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});
