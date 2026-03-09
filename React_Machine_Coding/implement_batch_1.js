const fs = require('fs');
const path = require('path');

const componentsData = {
    "11_ColorPicker": {
        jsx: `import React, { useState } from 'react';\nimport './ColorPicker.css';\n\nconst ColorPicker = () => {\n  const [color, setColor] = useState('#000000');\n\n  return (\n    <div className="colorpicker-container" style={{ backgroundColor: color }}>\n      <span style={{ color: '#fff', mixBlendMode: 'difference' }}>Color Picker Component</span>\n      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />\n      <p style={{ color: '#fff', mixBlendMode: 'difference' }}>Selected: {color}</p>\n    </div>\n  );\n};\nexport default ColorPicker;\n`,
        css: `.colorpicker-container { padding: 50px; text-align: center; border-radius: 8px; transition: background-color 0.3s; }\n.colorpicker-container input { margin-top: 20px; cursor: pointer; }`
    },
    "15_TransferList": {
        jsx: `import React, { useState } from 'react';\nimport './TransferList.css';\n\nconst TransferList = () => {\n  const [left, setLeft] = useState(['Apple', 'Banana', 'Cherry']);\n  const [right, setRight] = useState(['Date']);\n  const [checked, setChecked] = useState([]);\n\n  const handleCheck = (item) => {\n    setChecked(checked.includes(item) ? checked.filter(i => i !== item) : [...checked, item]);\n  };\n\n  const moveRight = () => {\n    const toMove = left.filter(item => checked.includes(item));\n    setRight([...right, ...toMove]);\n    setLeft(left.filter(item => !checked.includes(item)));\n    setChecked(checked.filter(item => !toMove.includes(item)));\n  };\n\n  const moveLeft = () => {\n    const toMove = right.filter(item => checked.includes(item));\n    setLeft([...left, ...toMove]);\n    setRight(right.filter(item => !checked.includes(item)));\n    setChecked(checked.filter(item => !toMove.includes(item)));\n  };\n\n  return (\n    <div className="transferlist-container">\n      <div className="list">\n        {left.map(item => (\n          <div key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => handleCheck(item)} /> {item}</div>\n        ))}\n      </div>\n      <div className="actions">\n        <button onClick={moveRight}>{'>'}</button>\n        <button onClick={moveLeft}>{'<'}</button>\n      </div>\n      <div className="list">\n        {right.map(item => (\n          <div key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => handleCheck(item)} /> {item}</div>\n        ))}\n      </div>\n    </div>\n  );\n};\nexport default TransferList;\n`,
        css: `.transferlist-container { display: flex; align-items: center; gap: 20px; }\n.list { border: 1px solid #ccc; padding: 10px; width: 150px; min-height: 200px; }\n.actions { display: flex; flex-direction: column; gap: 10px; }`
    },
    "16_RangeSlider": {
        jsx: `import React, { useState } from 'react';\nimport './RangeSlider.css';\n\nconst RangeSlider = () => {\n  const [val, setVal] = useState(50);\n  return (\n    <div className="rangeslider-container">\n      <h2>Range Slider: {val}</h2>\n      <input type="range" min="0" max="100" value={val} onChange={e => setVal(e.target.value)} />\n    </div>\n  );\n};\nexport default RangeSlider;\n`,
        css: `.rangeslider-container { padding: 20px; }\ninput[type='range'] { width: 100%; cursor: pointer; }`
    },
    "17_PasswordGenerator": {
        jsx: `import React, { useState } from 'react';\nimport './PasswordGenerator.css';\n\nconst PasswordGenerator = () => {\n  const [pwd, setPwd] = useState('');\n  const [len, setLen] = useState(12);\n\n  const generate = () => {\n    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';\n    let res = '';\n    for(let i = 0; i < len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));\n    setPwd(res);\n  };\n\n  return (\n    <div className="passwordgenerator-container">\n      <h2>Password Generator</h2>\n      <div className="pwd-display">{pwd || 'Generate a password'}</div>\n      <div><label>Length: {len}</label><input type="range" min="6" max="32" value={len} onChange={e => setLen(e.target.value)} /></div>\n      <button onClick={generate}>Generate Password</button>\n    </div>\n  );\n};\nexport default PasswordGenerator;\n`,
        css: `.passwordgenerator-container { padding: 20px; max-width: 300px; border: 1px solid #ddd; }\n.pwd-display { padding: 10px; background: #eee; text-align: center; margin-bottom: 15px; font-family: monospace; word-break: break-all; }`
    },
    "18_FormValidation": {
        jsx: `import React, { useState } from 'react';\nimport './FormValidation.css';\n\nconst FormValidation = () => {\n  const [form, setForm] = useState({email: '', pwd: ''});\n  const [errors, setErrors] = useState({});\n\n  const submit = (e) => {\n    e.preventDefault();\n    let err = {};\n    if (!form.email.includes('@')) err.email = 'Invalid email';\n    if (form.pwd.length < 6) err.pwd = 'Password must be 6+ chars';\n    setErrors(err);\n    if(Object.keys(err).length === 0) alert('Submitted!');\n  };\n\n  return (\n    <form className="formvalidation-container" onSubmit={submit}>\n      <h2>Form Validation</h2>\n      <div>\n        <input type="text" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />\n        {errors.email && <span className="err">{errors.email}</span>}\n      </div>\n      <div>\n        <input type="password" placeholder="Password" value={form.pwd} onChange={e => setForm({...form, pwd: e.target.value})} />\n        {errors.pwd && <span className="err">{errors.pwd}</span>}\n      </div>\n      <button type="submit">Submit</button>\n    </form>\n  );\n};\nexport default FormValidation;\n`,
        css: `.formvalidation-container { display: flex; flex-direction: column; gap: 15px; max-width: 300px; }\n.err { color: red; font-size: 12px; display: block; }\ninput { padding: 8px; width: 100%; box-sizing: border-box; }`
    },
    "19_Calendar": {
        jsx: `import React, { useState } from 'react';\nimport './Calendar.css';\n\nconst Calendar = () => {\n  const [date, setDate] = useState(new Date());\n  return (\n    <div className="calendar-container">\n      <h2>Calendar Component</h2>\n      <p>Current Date: {date.toDateString()}</p>\n      <button onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}>Prev Day</button>\n      <button onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}>Next Day</button>\n      <p><i>Full calendar grid logic typically goes here</i></p>\n    </div>\n  );\n};\nexport default Calendar;\n`,
        css: `.calendar-container { padding: 20px; text-align: center; border: 1px solid #ccc; max-width: 300px; }`
    },
    "20_LikeButton": {
        jsx: `import React, { useState } from 'react';\nimport './LikeButton.css';\n\nconst LikeButton = () => {\n  const [liked, setLiked] = useState(false);\n  return (\n    <div className="likebutton-container">\n      <button className={liked ? 'liked' : ''} onClick={() => setLiked(!liked)}>\n        {liked ? '❤️ Liked' : '🤍 Like'}\n      </button>\n    </div>\n  );\n};\nexport default LikeButton;\n`,
        css: `.likebutton-container button { padding: 10px 20px; font-size: 16px; border: 1px solid #ccc; cursor: pointer; background: #fff; border-radius: 20px; transition: 0.2s; }\n.likebutton-container button.liked { background: #fee; color: red; border-color: red; }`
    },
    "21_Breadcrumbs": {
        jsx: `import React from 'react';\nimport './Breadcrumbs.css';\n\nconst Breadcrumbs = ({ paths = ['Home', 'Products', 'Electronics', 'Phones'] }) => {\n  return (\n    <nav className="breadcrumbs-container">\n      {paths.map((p, i) => (\n        <span key={i}>\n          <a href="#">{p}</a>\n          {i < paths.length - 1 && <span className="separator"> / </span>}\n        </span>\n      ))}\n    </nav>\n  );\n};\nexport default Breadcrumbs;\n`,
        css: `.breadcrumbs-container { padding: 15px; background: #f8f9fa; border-radius: 4px; }\n.breadcrumbs-container a { text-decoration: none; color: #007bff; }\n.breadcrumbs-container a:hover { text-decoration: underline; }\n.separator { color: #6c757d; margin: 0 8px; }`
    },
    "22_Tooltip": {
        jsx: `import React, { useState } from 'react';\nimport './Tooltip.css';\n\nconst Tooltip = ({ text = "I am a tooltip!" }) => {\n  const [show, setShow] = useState(false);\n  return (\n    <div className="tooltip-container" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>\n      <span>Hover me</span>\n      {show && <div className="tooltip-box">{text}</div>}\n    </div>\n  );\n};\nexport default Tooltip;\n`,
        css: `.tooltip-container { position: relative; display: inline-block; cursor: help; padding: 20px; }\n.tooltip-box { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: #333; color: #fff; padding: 5px 10px; border-radius: 4px; white-space: nowrap; margin-bottom: 5px; font-size: 12px; }`
    },
    "23_ContextMenu": {
        jsx: `import React, { useState, useEffect } from 'react';\nimport './ContextMenu.css';\n\nconst ContextMenu = () => {\n  const [pos, setPos] = useState({ x: 0, y: 0, show: false });\n\n  const handleContext = (e) => {\n    e.preventDefault();\n    setPos({ x: e.pageX, y: e.pageY, show: true });\n  };\n\n  useEffect(() => {\n    const close = () => setPos(p => ({ ...p, show: false }));\n    window.addEventListener('click', close);\n    return () => window.removeEventListener('click', close);\n  }, []);\n\n  return (\n    <div className="contextmenu-container" onContextMenu={handleContext}>\n      <h2>Right click anywhere here</h2>\n      {pos.show && (\n        <ul className="context-menu" style={{ top: pos.y, left: pos.x }}>\n          <li>Option 1</li>\n          <li>Option 2</li>\n          <li>Option 3</li>\n        </ul>\n      )}\n    </div>\n  );\n};\nexport default ContextMenu;\n`,
        css: `.contextmenu-container { width: 100%; height: 300px; background: #eee; display: flex; align-items: center; justify-content: center; }\n.context-menu { position: absolute; background: white; border: 1px solid #ccc; list-style: none; padding: 5px 0; margin: 0; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }\n.context-menu li { padding: 8px 15px; cursor: pointer; }\n.context-menu li:hover { background: #f0f0f0; }`
    },
    "24_MasonryGridLayout": {
        jsx: `import React from 'react';\nimport './MasonryGridLayout.css';\n\nconst MasonryGridLayout = () => {\n  const items = Array.from({length: 15}).map((_, i) => ({ id: i, height: Math.floor(Math.random() * (300 - 100 + 1) + 100) }));\n  return (\n    <div className="masonry-container">\n      {items.map(item => (\n        <div key={item.id} className="masonry-item" style={{ height: item.height }} />\n      ))}\n    </div>\n  );\n};\nexport default MasonryGridLayout;\n`,
        css: `.masonry-container { column-count: 3; column-gap: 15px; padding: 15px; }\n.masonry-item { background: #007bff; margin-bottom: 15px; break-inside: avoid; border-radius: 8px; }`
    },
    "25_VirtualizedList": {
        jsx: `import React, { useState } from 'react';\nimport './VirtualizedList.css';\n\nconst VirtualizedList = () => {\n  const items = Array.from({length: 1000}, (_, i) => \`Item \${i}\`);\n  const itemHeight = 35;\n  const windowHeight = 400;\n  const [scrollTop, setScrollTop] = useState(0);\n\n  const startIndex = Math.floor(scrollTop / itemHeight);\n  const endIndex = Math.min(items.length - 1, startIndex + Math.ceil(windowHeight / itemHeight));\n  const visibleItems = items.slice(startIndex, endIndex + 1);\n\n  return (\n    <div className="virtualized-container" onScroll={e => setScrollTop(e.target.scrollTop)} style={{ height: windowHeight, overflowY: 'auto', border: '1px solid black' }}>\n      <div style={{ height: items.length * itemHeight, position: 'relative' }}>\n        {visibleItems.map((item, index) => (\n          <div key={startIndex + index} style={{ position: 'absolute', top: (startIndex + index) * itemHeight, height: itemHeight, width: '100%', borderBottom: '1px solid #eee', boxSizing: 'border-box', padding: '8px' }}>\n            {item}\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n};\nexport default VirtualizedList;\n`,
        css: `.virtualized-container { width: 300px; }`
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
