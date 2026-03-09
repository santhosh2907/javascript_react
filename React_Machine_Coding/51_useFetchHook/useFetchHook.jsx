import React, { useState, useEffect } from 'react';
import './useFetchHook.css';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url).then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(e => setLoading(false));
  }, [url]);
  return { data, loading };
};

const UseFetchDemo = () => {
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/todos/1');
  return (
    <div className="usefetch-container">
      <h2>useFetch Hook Demo</h2>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};
export default UseFetchDemo;
