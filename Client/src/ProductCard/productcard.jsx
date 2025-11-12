import React from "react";
import { useProduct } from "../ProductContext/productcontext";
import "./ProductCard.css";

function ProductCard({product, onClose}) {
  const { addToCart } = useProduct();
   const productData = product?.product || product;// Handle both nested and direct cases
   console.log("ProductCard rendered with productData:", productData, "Type:", typeof productData, "Details:", { name: productData?.name, price: productData?.price });
   console.log("ProductCard onClose prop:", onClose);
   if (!productData || !productData.name || !productData.price) {
    console.log("ProductCard not rendering due to:", { productData, hasName: !!productData?.name, hasPrice: !!productData?.price });
    return null;
  }

  return (
    <div className="product-card">
      <h3>{productData.name}</h3>
      {productData.image && (
        <img
          src={productData.image}
          alt={productData.name}
          className="product-card-image"
        />
      )}
      <p>Price: ₦{productData.price}</p>
      <button onClick={() => addToCart(productData)}>Add to Cart</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ProductCard;