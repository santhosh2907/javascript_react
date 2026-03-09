const fs = require('fs');
const path = require('path');

const componentsData = {
    "42_DarkModeToggle": {
        jsx: `import React, { useState, useEffect } from 'react';\nimport './DarkModeToggle.css';\n\nconst DarkModeToggle = () => {\n  const [dark, setDark] = useState(false);\n  useEffect(() => {\n    if (dark) document.body.classList.add('dark-mode');\n    else document.body.classList.remove('dark-mode');\n  }, [dark]);\n  return (\n    <div className={\`darkmode-container \${dark ? 'dark' : 'light'}\`}>\n      <h2>{dark ? 'Dark Mode' : 'Light Mode'} Active</h2>\n      <button onClick={() => setDark(!dark)}>Toggle Theme</button>\n    </div>\n  );\n};\nexport default DarkModeToggle;\n`,
        css: `.darkmode-container { padding: 50px; text-align: center; border: 1px solid #ccc; transition: 0.3s; }\n.darkmode-container.light { background: #fff; color: #000; }\n.darkmode-container.dark { background: #222; color: #fff; }`
    },
    "43_ImageZoomHover": {
        jsx: `import React, { useState } from 'react';\nimport './ImageZoomHover.css';\n\nconst ImageZoomHover = () => {\n  const [style, setStyle] = useState({});\n  const handleMove = (e) => {\n    const { left, top, width, height } = e.target.getBoundingClientRect();\n    const x = ((e.clientX - left) / width) * 100;\n    const y = ((e.clientY - top) / height) * 100;\n    setStyle({ transformOrigin: \`\${x}% \${y}%\`, transform: 'scale(1.5)' });\n  };\n  return (\n    <div className="zoom-container">\n      <div className="img-wrapper" onMouseMove={handleMove} onMouseLeave={() => setStyle({transform: 'scale(1)'})}>\n        <img src="https://via.placeholder.com/300x200" alt="mock" style={style} />\n      </div>\n    </div>\n  );\n};\nexport default ImageZoomHover;\n`,
        css: `.zoom-container { padding: 20px; }\n.img-wrapper { width: 300px; height: 200px; overflow: hidden; border: 1px solid #ccc; }\n.img-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.1s ease-out; }`
    },
    "45_OTPInput": {
        jsx: `import React, { useState } from 'react';\nimport './OTPInput.css';\n\nconst OTPInput = () => {\n  const [otp, setOtp] = useState(['', '', '', '']);\n  const handleChange = (val, index) => {\n    if (isNaN(val)) return;\n    const newOtp = [...otp];\n    newOtp[index] = val;\n    setOtp(newOtp);\n    if (val && index < 3) document.getElementById(\`otp-\${index + 1}\`).focus();\n  };\n  return (\n    <div className="otp-container">\n      <h2>Enter OTP</h2>\n      <div className="otp-inputs">\n        {otp.map((d, i) => (\n          <input key={i} id={\`otp-\${i}\`} type="text" maxLength="1" value={d} onChange={e => handleChange(e.target.value, i)} />\n        ))}\n      </div>\n    </div>\n  );\n};\nexport default OTPInput;\n`,
        css: `.otp-container { padding: 20px; text-align: center; }\n.otp-inputs { display: flex; gap: 10px; justify-content: center; }\n.otp-inputs input { width: 40px; height: 50px; font-size: 24px; text-align: center; border: 1px solid #ccc; border-radius: 4px; }`
    },
    "46_StickyHeader": {
        jsx: `import React, { useState, useEffect } from 'react';\nimport './StickyHeader.css';\n\nconst StickyHeader = () => {\n  const [isSticky, setSticky] = useState(false);\n  useEffect(() => {\n    const onScroll = () => setSticky(window.scrollY > 50);\n    window.addEventListener('scroll', onScroll);\n    return () => window.removeEventListener('scroll', onScroll);\n  }, []);\n  return (\n    <div className="sticky-page">\n      <header className={\`header \${isSticky ? 'sticky' : ''}\`}>\n        <h2>My Logo</h2>\n        <nav>Links...</nav>\n      </header>\n      <main style={{ height: '200vh', padding: '20px' }}>\n        <p>Scroll down to see the sticky header action...</p>\n      </main>\n    </div>\n  );\n};\nexport default StickyHeader;\n`,
        css: `.sticky-page { font-family: sans-serif; }\n.header { padding: 20px; background: #007bff; color: white; transition: 0.3s; display: flex; justify-content: space-between; align-items: center; }\n.header.sticky { position: fixed; top: 0; width: 100%; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 10px 20px; z-index: 1000; box-sizing: border-box; }`
    },
    "47_ResponsiveNavBar": {
        jsx: `import React, { useState } from 'react';\nimport './ResponsiveNavBar.css';\n\nconst ResponsiveNavBar = () => {\n  const [open, setOpen] = useState(false);\n  return (\n    <nav className="navbar">\n      <div className="logo">Brand</div>\n      <button className="hamburger" onClick={() => setOpen(!open)}>☰</button>\n      <ul className={\`nav-links \${open ? 'open' : ''}\`}>\n        <li>Home</li><li>About</li><li>Services</li><li>Contact</li>\n      </ul>\n    </nav>\n  );\n};\nexport default ResponsiveNavBar;\n`,
        css: `.navbar { display: flex; justify-content: space-between; align-items: center; background: #333; color: white; padding: 15px; position: relative; }\n.nav-links { list-style: none; display: flex; gap: 20px; margin: 0; padding: 0; }\n.hamburger { display: none; background: none; color: white; border: none; font-size: 24px; cursor: pointer; }\n@media (max-width: 600px) {\n  .nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; width: 100%; background: #444; padding: 10px 0; }\n  .nav-links.open { display: flex; }\n  .nav-links li { text-align: center; padding: 10px; }\n  .hamburger { display: block; }\n}`
    },
    "48_DragAndDropList": {
        jsx: `import React, { useState } from 'react';\nimport './DragAndDropList.css';\n\nconst DragAndDropList = () => {\n  const [items, setItems] = useState(['Alpha', 'Bravo', 'Charlie', 'Delta']);\n  const [draggedItem, setDraggedItem] = useState(null);\n  \n  const onDragStart = (e, index) => setDraggedItem(items[index]);\n  const onDragOver = e => e.preventDefault();\n  const onDrop = (e, targetIndex) => {\n    const newItems = items.filter(i => i !== draggedItem);\n    newItems.splice(targetIndex, 0, draggedItem);\n    setItems(newItems);\n    setDraggedItem(null);\n  };\n\n  return (\n    <div className="dnd-container">\n      <h2>Drag and Drop</h2>\n      <ul className="dnd-list">\n        {items.map((item, i) => (\n          <li key={item} draggable onDragStart={e => onDragStart(e, i)} onDragOver={onDragOver} onDrop={e => onDrop(e, i)}>\n            {item}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n};\nexport default DragAndDropList;\n`,
        css: `.dnd-container { padding: 20px; max-width: 300px; }\n.dnd-list { list-style: none; padding: 0; }\n.dnd-list li { padding: 15px; border: 1px solid #ccc; margin-bottom: 5px; background: white; cursor: grab; }`
    },
    "49_CarouselSlider": {
        jsx: `import React, { useState } from 'react';\nimport './CarouselSlider.css';\n\nconst CarouselSlider = () => {\n  const slides = ['Slide 1', 'Slide 2', 'Slide 3'];\n  const [curr, setCurr] = useState(0);\n  const next = () => setCurr(c => (c + 1) % slides.length);\n  const prev = () => setCurr(c => (c - 1 + slides.length) % slides.length);\n  return (\n    <div className="carousel-container">\n      <button onClick={prev}>&lt;</button>\n      <div className="slide">{slides[curr]}</div>\n      <button onClick={next}>&gt;</button>\n    </div>\n  );\n};\nexport default CarouselSlider;\n`,
        css: `.carousel-container { display: flex; align-items: center; justify-content: center; gap: 20px; padding: 20px; }\n.slide { width: 200px; height: 150px; background: #007bff; color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; border-radius: 8px; }\n.carousel-container button { padding: 10px 15px; cursor: pointer; }`
    },
    "50_NestedFileExplorer": {
        jsx: `import React, { useState } from 'react';\nimport './NestedFileExplorer.css';\n\nconst explorer = { name: 'root', isFolder: true, items: [{ name: 'public', isFolder: true, items: [{ name: 'index.html', isFolder: false }] }, { name: 'src', isFolder: true, items: [{ name: 'App.js', isFolder: false }] }, { name: 'package.json', isFolder: false }] };\n\nconst Folder = ({ explorer }) => {\n  const [exp, setExp] = useState(false);\n  if (explorer.isFolder) {\n    return (\n      <div className="folder">\n        <span onClick={() => setExp(!exp)}>📁 {explorer.name}</span>\n        <div style={{ display: exp ? 'block' : 'none', paddingLeft: 15 }}>\n          {explorer.items.map((item, i) => <Folder key={i} explorer={item} />)}\n        </div>\n      </div>\n    );\n  }\n  return <div className="file">📄 {explorer.name}</div>;\n};\n\nconst NestedFileExplorer = () => (\n  <div className="fileexplorer-container">\n    <h2>File Explorer</h2>\n    <Folder explorer={explorer} />\n  </div>\n);\nexport default NestedFileExplorer;\n`,
        css: `.fileexplorer-container { padding: 20px; font-family: monospace; }\n.folder > span { font-weight: bold; cursor: pointer; display: inline-block; margin-bottom: 5px; }\n.file { margin-bottom: 5px; color: #555; }`
    },
    "51_useFetchHook": {
        jsx: `import React, { useState, useEffect } from 'react';\nimport './useFetchHook.css';\n\nconst useFetch = (url) => {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    fetch(url).then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(e => setLoading(false));\n  }, [url]);\n  return { data, loading };\n};\n\nconst UseFetchDemo = () => {\n  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/todos/1');\n  return (\n    <div className="usefetch-container">\n      <h2>useFetch Hook Demo</h2>\n      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}\n    </div>\n  );\n};\nexport default UseFetchDemo;\n`,
        css: `.usefetch-container { padding: 20px; border: 1px solid #ccc; max-width: 400px; }\npre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }`
    },
    "52_useLocalStorageHook": {
        jsx: `import React, { useState } from 'react';\nimport './useLocalStorageHook.css';\n\nconst useLocalStorage = (key, initialVal) => {\n  const [val, setVal] = useState(() => {\n    try { const item = window.localStorage.getItem(key); return item ? JSON.parse(item) : initialVal; } catch(e) { return initialVal; }\n  });\n  const setValStorage = (v) => { setVal(v); window.localStorage.setItem(key, JSON.stringify(v)); };\n  return [val, setValStorage];\n};\n\nconst UseLocalStorageDemo = () => {\n  const [name, setName] = useLocalStorage('name', 'Guest');\n  return (\n    <div className="uselocalstorage-container">\n      <h2>useLocalStorage Demo</h2>\n      <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />\n      <p>Hello, {name}! (Refresh to see it persisted)</p>\n    </div>\n  );\n};\nexport default UseLocalStorageDemo;\n`,
        css: `.uselocalstorage-container { padding: 20px; }\n.uselocalstorage-container input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }`
    }
};

Object.keys(componentsData).forEach(dir => {
    const componentName = dir.split('_')[1];
    const dirPath = path.join(__dirname, dir);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(path.join(dirPath, `${componentName}.jsx`), componentsData[dir].jsx);
    fs.writeFileSync(path.join(dirPath, `${componentName}.css`), componentsData[dir].css);
    console.log(`Implemented ${componentName}`);
});
