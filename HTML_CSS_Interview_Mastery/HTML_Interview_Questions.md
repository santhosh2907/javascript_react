# HTML Interview Questions & Answers

## 1. What does semantic HTML mean, and why is it important?
Semantic HTML means using elements that clearly describe their meaning in a human- and machine-readable way (e.g., `<header>`, `<footer>`, `<article>` instead of generic `<div>`s).
**Importance:**
- **Accessibility:** Screen readers use semantic tags to help visually impaired users navigate.
- **SEO:** Search engines understand the content better, improving rankings.
- **Maintainability:** Code is easier to read and understand for developers.

## 2. Explain the purpose of the `<!DOCTYPE html>` declaration.
It informs the web browser about the version of HTML being used in the document. For HTML5, the declaration is `<!DOCTYPE html>`. Without it, browsers might render the page in "quirks mode," leading to inconsistent styling and layout issues.

## 3. What is the difference between `defer` and `async` attributes in script tags?
Both are used to load scripts asynchronously without blocking HTML parsing, but they behave differently:
- **`async`**: The script is downloaded in parallel and executed *as soon as it's ready*. Order of execution involves network speed (whichever loads first runs first). Use for independent scripts (e.g., analytics).
- **`defer`**: The script is downloaded in parallel but executed *only after* the HTML parsing is complete. Scripts execute in the order they appear in the DOM. Use for scripts that depend on the DOM or other scripts.

## 4. What are Data Attributes (`data-*`)?
They allow you to store custom data private to the page or application on standard HTML elements.
**Example:**
```html
<div id="user" data-user-id="123" data-role="admin">John Doe</div>
```
**Accessing them:**
- CSS: `[data-role="admin"] { color: red; }`
- JS: `document.getElementById('user').dataset.userId` // "123"

## 5. Describe the vital meta tags for SEO and mobile responsiveness.
- **Viewport:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">` (Crucial for responsive design).
- **Description:** `<meta name="description" content="Brief description of the page">` (Used in search results).
- **Charset:** `<meta charset="UTF-8">` (Ensures proper character encoding).
- **Robots:** `<meta name="robots" content="index, follow">` (Instructions for search crawlers).

## 6. What is the difference between `localStorage`, `sessionStorage`, and Cookies?
| Feature | Cookies | localStorage | sessionStorage |
| :--- | :--- | :--- | :--- |
| **Capacity** | ~4KB | ~5-10MB | ~5MB |
| **Browsers** | HTML4/5 | HTML5 | HTML5 |
| **Accessibility** | Any window | Any window | Same tab |
| **Expiration** | Manually set | Never | Tab close |
| **Storage Loc** | Browser/Server | Browser only | Browser only |
| **Sent with Req** | Yes | No | No |

## 7. How do you handle accessibility (a11y) in HTML?
- Use semantic tags (`nav`, `main`, `aside`).
- Use `alt` attributes for images.
- Ensure form inputs have associated `<label>`s.
- Use valid ARIA roles/attributes (`aria-label`, `aria-hidden`) when necessary, but prefer native HTML elements.
- Ensure keyboard navigability (tabindex).

## 8. What is the Critical Rendering Path?
The sequence of steps the browser takes to convert HTML, CSS, and JS into actual pixels on the screen.
1. **DOM Construction:** HTML -> DOM Tree.
2. **CSSOM Construction:** CSS -> CSSOM Tree.
3. **Render Tree:** DOM + CSSOM -> Visible elements.
4. **Layout (Reflow):** Calculate position and size of elements.
5. **Paint:** Fill in pixels.
Optimization involves minimizing blocking resources (CSS/JS) to speed up the first paint.

## 9. What are Web Components?
A suite of technologies allowing you to create reusable custom elements with their functionality encapsulated away from the rest of your code.
Key technologies:
- **Custom Elements:** Define new HTML tags.
- **Shadow DOM:** Encapsulate styles and markup (scoped CSS).
- **HTML Templates:** `<template>` and `<slot>` for defining structures that aren't rendered until instantiated.

## 10. Forms: `GET` vs `POST` methods.
- **GET:** Data is appended to the URL query string. Visible to everyone. Limited length. User for retrieving data. idempotent.
- **POST:** Data is sent in the request body. Not visible in URL. No size limit (theoretically). Used for submitting data (create/update). Better for sensitive info (though HTTPS is required for real security).
