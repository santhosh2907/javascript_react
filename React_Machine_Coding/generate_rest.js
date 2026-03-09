const fs = require('fs');
const path = require('path');

const components = [
    "11_ColorPicker", "15_TransferList", "16_RangeSlider", "17_PasswordGenerator",
    "18_FormValidation", "19_Calendar", "20_LikeButton", "21_Breadcrumbs",
    "22_Tooltip", "23_ContextMenu", "24_MasonryGridLayout", "25_VirtualizedList",
    "26_SnakeGame", "27_MemoryGame", "28_TicTacToeTimeTravel", "29_ConnectFour",
    "30_NestedComments", "31_FeatureFlag", "32_RatingBar", "33_NestedDropdown",
    "34_MultiSelectDropdown", "35_ShoppingCart", "36_TodoList", "37_KanbanBoard",
    "38_ChatUI", "39_WeatherWidget", "40_SortableDataTable", "41_MarkdownPreviewer",
    "42_DarkModeToggle", "43_ImageZoomHover", "44_PasswordStrengthChecker",
    "45_OTPInput", "46_StickyHeader", "47_ResponsiveNavBar", "48_DragAndDropList",
    "49_CarouselSlider", "50_NestedFileExplorer", "51_useFetchHook", "52_useLocalStorageHook"
];

components.forEach(comp => {
    const dirPath = path.join(__dirname, comp);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // Extract pure component name (e.g., "11_ColorPicker" -> "ColorPicker")
    const compName = comp.split('_')[1];

    const jsxContent = `import React from 'react';
import './${compName}.css';

const ${compName} = () => {
  return (
    <div className="${compName.toLowerCase()}-container">
      <h2>${compName} Component</h2>
      <p>Implementation goes here...</p>
    </div>
  );
};

export default ${compName};
`;

    const cssContent = `.${compName.toLowerCase()}-container {
  padding: 20px;
  font-family: sans-serif;
}
`;

    fs.writeFileSync(path.join(dirPath, `${compName}.jsx`), jsxContent);
    fs.writeFileSync(path.join(dirPath, `${compName}.css`), cssContent);
    console.log(`Created structure for ${compName}`);
});

console.log('Finished scaffolding the remaining components!');
