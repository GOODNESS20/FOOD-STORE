import React, {useState} from "react";
import Product from "../data/products";
import { useProduct } from "../ProductContext/productcontext";
import ProductCard from "../ProductCard/productcard";
import './Navbar.css';

function Navbar() {
    const [openDropdown, setOpenDropdown] = useState();
    const [selectedProduct, setSelectedProduct] = useState();

  const categories = [
    "Fresh food", "Soups", "Rice", "Stew", "Plantain", "Beaf", "Chicken", "Turkey", "Fruits", "Beans", "Pasta", "Drinks", "Sauce"
  ];

  const getProductsByCategory = (category) => {
    return Product.filter((product) => product.Category === category);
  };

  const handleProductClick = (product) => {
    const newProduct = { ...product, id: product.id || Date.now() };// Set the clicked product
    console.log("Setting selected product:", newProduct);
    setSelectedProduct(newProduct);
    setOpenDropdown(null); // Close the dropdown
  };

  const {addToCart} = useProduct();

return (
    <nav className="navbar">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category"
          onMouseEnter={() => setOpenDropdown(category)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          {category} <span>▼</span>
          {openDropdown === category && (
            <div className="dropdown">
              {getProductsByCategory(category).length > 0 ? (
                getProductsByCategory(category).map((product) => (
                  <div key={product.id} className="dropdown-item">
                    {product.name} (₦{product.price})
                    <button className="category-btn" onClick={() => handleProductClick(product)}>View</button>
                    <button className="category-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                ))
              ) : (
                <div className="dropdown-item"></div>
              )}
            </div>
          )}
        </div>
      ))}
      {selectedProduct && (
  <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", zIndex: 29 }}>
    <ProductCard product={selectedProduct} onClose={() => setSelectedProduct(null)} />
  </div>
)}
    </nav>
  );
}

export default Navbar;