import React, { useState } from 'react';
import './MultiSelectDropdown.css';

const MultiSelectDropdown = () => {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const options = ['React', 'Vue', 'Angular', 'Svelte'];

  const toggle = (opt) => setSelected(selected.includes(opt) ? selected.filter(o => o !== opt) : [...selected, opt]);

  return (
    <div className="multiselect-container">
      <div className="selector" onClick={() => setOpen(!open)}>
        {selected.length ? selected.join(', ') : 'Select frameworks...'}
      </div>
      {open && (
        <ul className="options">
          {options.map(o => (
            <li key={o} onClick={() => toggle(o)}>
              <input type="checkbox" checked={selected.includes(o)} readOnly /> {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default MultiSelectDropdown;
