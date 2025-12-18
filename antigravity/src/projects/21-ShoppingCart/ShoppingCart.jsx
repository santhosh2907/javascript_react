import React, { useState, useReducer } from 'react';
import { ArrowLeft, ShoppingCart as CartIcon, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRODUCTS = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
    { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
    { id: 3, name: 'Gaming Mouse', price: 49.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80' },
    { id: 4, name: 'Mechanical Keyboard', price: 129.99, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80' },
];

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                return state.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];

        case 'REMOVE_FROM_CART':
            return state.filter(item => item.id !== action.payload);

        case 'INCREASE_QUANTITY':
            return state.map(item =>
                item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            );

        case 'DECREASE_QUANTITY':
            return state.map(item => {
                if (item.id === action.payload) {
                    return { ...item, quantity: Math.max(1, item.quantity - 1) };
                }
                return item;
            });

        default:
            return state;
    }
};

const ShoppingCart = () => {
    const [cart, dispatch] = useReducer(cartReducer, []);
    const [isOpen, setIsOpen] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm p-4 sticky top-0 z-30">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-800">Shop redux-free</h1>
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
                    >
                        <CartIcon size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1 max-w-6xl mx-auto p-4 md:p-8 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.map(product => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-xl font-bold text-indigo-600">${product.price}</span>
                                    <button
                                        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                                        className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors active:scale-95"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cart Sidebar (using simulated overlay/portal logic roughly) */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex justify-end">
                    <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-slide-in-right">
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <CartIcon size={20} /> Your Cart
                            </h2>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-200 rounded-full">
                                <ArrowLeft size={20} className="rotate-180" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                    <CartIcon size={64} className="mb-4 opacity-20" />
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium text-gray-800">{item.name}</h3>
                                                <button
                                                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                                    <button
                                                        onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })}
                                                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:shadow text-gray-600"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })}
                                                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:shadow text-gray-600"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-indigo-600">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-6 border-t bg-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600">Total</span>
                                <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                            </div>
                            <button
                                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={cart.length === 0}
                                onClick={() => alert('Checkout demo!')}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
