import React from "react";
import "./Productsection.css";

function ProductSection() {
  return (
    <section className="product-section">
        <div className="promo-item">
          <span role="img" aria-label="box">📦</span> Wide Assortment Over 10,000 items
        </div>
        <div className="promo-item">
          <span role="img" aria-label="tag">🏷️</span> Save Time, Stress & Money Order online today
        </div>
        <div className="promo-item">
          <span role="img" aria-label="truck">🚚</span> Delivery Across Lagos Home and office delivery
        </div>
      <div className="broad-image">
        <img src="https://i.pinimg.com/736x/d0/4f/2a/d04f2ac1ee16edfbce449fd0031ee6a3.jpg" alt="Promo Banner" />
      </div>
    </section>
  );
}

export default ProductSection;