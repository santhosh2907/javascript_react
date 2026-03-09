import React from 'react';
import './Breadcrumbs.css';

const Breadcrumbs = ({ paths = ['Home', 'Products', 'Electronics', 'Phones'] }) => {
  return (
    <nav className="breadcrumbs-container">
      {paths.map((p, i) => (
        <span key={i}>
          <a href="#">{p}</a>
          {i < paths.length - 1 && <span className="separator"> / </span>}
        </span>
      ))}
    </nav>
  );
};
export default Breadcrumbs;
