import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_MARKDOWN = `# Welcome to React Markup Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`javascript
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

| Wild Header | Crazy Header | Another Header? |
| ------------ | ------------- | ------------- |
| Your content can | be here, and it | can be here.... |
| And here. | Okay. | I think we get it. |

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png)
`;

const MarkdownPreviewer = () => {
    const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col p-4">
            <div className="flex items-center mb-6">
                <Link to="/" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow mr-4">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Markdown Live Previewer</h1>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
                {/* Editor */}
                <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-bold text-gray-600 uppercase text-xs tracking-wider flex justify-between">
                        <span>Editor</span>
                        <span className="text-gray-400">Markdown Input</span>
                    </div>
                    <textarea
                        className="flex-1 w-full p-4 resize-none focus:outline-none font-mono text-sm bg-gray-50"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        spellCheck="false"
                    />
                </div>

                {/* Preview */}
                <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-bold text-gray-600 uppercase text-xs tracking-wider flex justify-between">
                        <span>Preview</span>
                        <span className="text-gray-400">Rendered Output</span>
                    </div>
                    <div className="flex-1 w-full p-6 overflow-auto prose prose-blue max-w-none">
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownPreviewer;
