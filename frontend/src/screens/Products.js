import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../css/Home.css';
import Product from './product';
import { getproducts } from '../redux/actions/Productactions';

function Products({getproducts,products=[],isLoading,error}) {
    useEffect(()=>{
        getproducts();
    },[getproducts])
  return (
    <div className='container'>
        <h1>Products</h1>
        {isLoading && <p>loading...</p>}
        {error && <p>ERROR:{error}</p>}
        <div className='product-grid'>
            {products.map((product)=>(
                <a key={product.id} className='links' href={`product/${product.id}`}><Product product={product}/></a>
            ))}
        </div>
    </div>
  )
}

const mapStateToprops=(state)=>{
    return{
        products:state.products.products,
        isLoading:state.products.isLoading,
        error:state.products.error,
    }
}

const mapdispatchToprops=(dispatch)=>{
    return{
        getproducts:()=>dispatch(getproducts())
    }
}

export default connect(mapStateToprops,mapdispatchToprops)(Products)