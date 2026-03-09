import React, { useState } from 'react';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Shoes', price: 50, qty: 1 },
    { id: 2, name: 'Shirt', price: 20, qty: 2 }
  ]);

  const updateQty = (id, d) => {
    setCart(cart.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + d) } : c));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.map(c => (
        <div key={c.id} className="cart-item">
          <span>{c.name} - $${c.price}</span>
          <div>
            <button onClick={() => updateQty(c.id, -1)}>-</button>
            <span style={{ margin: '0 10px' }}>{c.qty}</span>
            <button onClick={() => updateQty(c.id, 1)}>+</button>
          </div>
        </div>
      ))}
      <h3>Total: $${total}</h3>
    </div>
  );
};
export default ShoppingCart;
