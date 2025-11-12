import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Product from '../data/products';
import { useProduct } from '../ProductContext/productcontext';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header({ toggleCart }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
      const [searchTerm, setSearchTerm] = useState ("");
      const { cart} = useProduct();

    const [searchResults, setSearchResults] = useState([]);
  //const [isCartOpen, setIsCartOpen] = useState(false);
  //const { setSelectedProduct } = useProduct();
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);


  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      const results = Product.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSearchTerm(""); // Clear search input
    setSearchResults([]); // Clear results
  };
  
    return (
        <header className='header-overall'>
          <div className='header-container'>
            <div className='logo-container'>
                <img className='header-logo' src='./logo food store.jpeg' alt='logo' />
                <h1 className='logo'>Food Store</h1>
            </div>
            {isSearchOpen && (
              <div className='search-controls'>
                <div className='search-arrang'>
                <select className='search-bars'>
                    <option value="all">All</option>
                    <option value="fresh">Fresh Food</option>
                    <option value="soups">Soups</option>
                    <option value="rice">Rice</option>
                </select>
                <input className='search-bars'
                type="text"
                placeholder="Search for prod..."
                value={searchTerm}
                onChange={handleSearch}
                />
              {searchResults.length > 0 && (
            <div className="search-results">
            {searchResults.map((product) => (
           <div key={product.id} onClick={() => handleProductClick(product)} className="search-result-item">
              {product.name}
            </div>
            ))}
            </div>
            )}
            </div>
            </div>

            )}
            
            <div className='header-clicks'>
              <button className='header-icon' onClick={toggleSearch}><SearchIcon /></button>
                <NavLink to="../login">
                <button className="header-icon"><AccountCircleIcon /></button>
                </NavLink>
                <button className="header-icon" onClick={() => { console.log("ToggleCart prop:", toggleCart); toggleCart(); }}>
  <ShoppingCartIcon /> {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
</button>

            </div>
            
          </div>
        </header>
    );
}

export default Header;