import React from 'react';

export default function Product({product}) {  
  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt="Product 6" 
        className="image"
      />
      <h2 className="product-name">{product.Name}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">RS.{product.price}</p>
    </div>
  );
}
