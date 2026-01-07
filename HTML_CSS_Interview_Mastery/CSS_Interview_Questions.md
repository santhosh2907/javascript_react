# CSS Interview Questions & Answers

## 1. Explain the Box Model.
The CSS Box Model is a container that wraps around every HTML element. It consists of:
- **Content:** The actual content of the box (text, image).
- **Padding:** Area around the content (transparent).
- **Border:** Goes around the padding and content.
- **Margin:** Area outside the border (transparent), separates the element from others.
*Tip in interviews:* Mention `box-sizing: border-box`. By default, `box-sizing` is `content-box`, where padding and border are added *to* the width. `border-box` includes padding and border *in* the element's total width/height, making layout calculations much easier.

## 2. What is Specificity in CSS?
Specificity determines which CSS rule is applied by the browsers. Usually, the rule with the more specific selector wins.
**Hierarchy (from lowest to highest):**
1. Type selectors (e.g., `h1`) and pseudo-elements (`::before`) - (0,0,0,1)
2. Class selectors (`.example`), attribute selectors (`[type="radio"]`), pseudo-classes (`:hover`) - (0,0,1,0)
3. ID selectors (`#example`) - (0,1,0,0)
4. Inline styles (`style="..."`) - (1,0,0,0)
*Note:* `!important` overrides everything (except even more specific `!important` rules), but is generally considered bad practice.

## 3. Position Property Values: `static`, `relative`, `absolute`, `fixed`, `sticky`.
- **`static`**: (Default) Element follows the normal document flow. `top`, `left`, `z-index` don't work.
- **`relative`**: Flows normally, but can be offset using `top`/`left`. It also becomes a positioning context for absolute children.
- **`absolute`**: Removed from the document flow. Positioned relative to the nearest positioned ancestor (non-static).
- **`fixed`**: Removed from the flow. Positioned relative to the viewport. Stays in place when scrolling.
- **`sticky`**: Toggles between relative and fixed depending on scroll position.

## 4. Difference between Flexbox and Grid.
- **Flexbox (1D):** Designed for one-dimensional layouts (either a row OR a column). Great for alignment, distribution of space, and simpler components.
- **Grid (2D):** Designed for two-dimensional layouts (rows AND columns). Better for overall page layout and complex structures.

## 5. What are Pseudo-classes and Pseudo-elements?
- **Pseudo-classes (`:`)**: Define a special state of an element.
    - Examples: `:hover`, `:focus`, `:nth-child()`, `:checked`.
- **Pseudo-elements (`::`)**: Style specified parts of an element.
    - Examples: `::before`, `::after`, `::first-letter`.

## 6. How does CSS `z-index` work?
It controls the vertical stacking order of elements that overlap.
- Works only on positioned elements (`relative`, `absolute`, `fixed`, `sticky`).
- Higher values are in front of lower values.
- **Stacking Context:** A new stacking context (a localized isolation) is formed by properties like `opacity < 1`, `transform`, `filter`, or `z-index` on a positioned element. Elements within a child stacking context cannot sit higher than their parent's siblings, regardless of how high their z-index is.

## 7. What are the units `rem`, `em`, `vh`, `vw`, `%`?
- **`px`**: Absolute unit.
- **`em`**: Relative to the font-size of the *parent* (or current element). Compounding effect with nesting.
- **`rem`**: Relative to the font-size of the *root* (`html`) element. Predictable.
- **`vh` / `vw`**: 1% of the viewport height / width.
- **`%`**: Relative to the parent element's property (often width).

## 8. What is the difference between `display: none` and `visibility: hidden`?
- **`display: none`**: Element is removed from the DOM layout. It takes up no space.
- **`visibility: hidden`**: Element is invisible but *still takes up space* in the layout.
- **`opacity: 0`**: Element is invisible, takes up space, and remains interactive (clickable).

## 9. Centering in CSS (The ultimate question).
- **Flexbox:**
  ```css
  .parent { display: flex; justify-content: center; align-items: center; }
  ```
- **Grid:**
  ```css
  .parent { display: grid; place-items: center; }
  ```
- **Absolute:**
  ```css
  .child { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
  ```

## 10. What is BEM (Block Element Modifier)?
A naming convention for CSS classes to keep code modular and readable.
- **Block:** Standalone entity (`.card`)
- **Element:** Part of a block (`.card__title`)
- **Modifier:** Flag on a block or element (`.card--featured`, `.card__btn--disabled`)
