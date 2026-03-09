import React, { useState } from 'react';
import './SortableDataTable.css';

const SortableDataTable = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Alice', age: 28 },
    { id: 2, name: 'Bob', age: 24 },
    { id: 3, name: 'Charlie', age: 32 }
  ]);
  const [sortConfig, setSortConfig] = useState(null);

  const sort = (key) => {
    let dir = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.dir === 'asc') dir = 'desc';
    setSortConfig({ key, dir });
    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return dir === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return dir === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sorted);
  };

  return (
    <table className="datatable">
      <thead>
        <tr>
          <th onClick={() => sort('name')}>Name</th>
          <th onClick={() => sort('age')}>Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map(d => (
          <tr key={d.id}><td>{d.name}</td><td>{d.age}</td></tr>
        ))}
      </tbody>
    </table>
  );
};
export default SortableDataTable;
