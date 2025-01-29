import React from 'react'
import '../css/Homeproduct.css'
export default function Homeproduct({product}) {
  return (
        <div className="product-card">
            <img className='Homeproduct_image' src={product.product.image} alt="Red Leather Gucci Bag" />
            <div className="product-info">
                <h2 className='product-name'>{product.product.Name}</h2>
                <p>₹ {product.product.price}</p>
            </div>
        </div>
  )
}
