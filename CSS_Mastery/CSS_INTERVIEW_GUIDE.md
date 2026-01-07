# CSS Interview Questions & Answers

## 1. Box Model
*   **Q:** `content-box` vs `border-box`?
    *   `content-box`: Width = Content. Padding adds to total size.
    *   `border-box`: Width = Content + Padding + Border. Total size stays fixed.

## 2. Positioning
*   **Static**: Default.
*   **Relative**: Moves relative to itself. Space preserved.
*   **Absolute**: Removed from flow. Relative to nearest positioned parent.
*   **Fixed**: Relative to Viewport.
*   **Sticky**: Toggles between relative and fixed based on scroll.

## 3. Flexbox vs Grid
*   **Flexbox**: 1D (Row OR Column). Good for components.
*   **Grid**: 2D (Rows AND Columns). Good for page layouts.

## 4. Specificity
`!important` > Inline > ID > Class > Tag.
