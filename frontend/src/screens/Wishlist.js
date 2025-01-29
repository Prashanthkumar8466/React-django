import React, { useEffect, useState } from 'react'
import '../css/Wishlist.css'
import { Api } from '../api';
import { ACCESS_TOKEN } from '../constants';

export default function Wishlist() {
    const [wishlist,setwishlist]=useState([]);
    const [loading, setloading]=useState(false);
    const[error,seterror]=useState();
    const fetchdata=async()=>{
        setloading(true);
        try{
            const token = localStorage.getItem(ACCESS_TOKEN)
            const response = await Api.get('wishlist/',{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            setwishlist(response.data)
            console.log(response.data)
        }
        catch(error){
            seterror(error)
        }finally{
            setloading(false)
        }
    }
    useEffect(()=>{
        fetchdata();
    },[])
    const deleteData=async(id)=>{
        setloading(true);
        try{
            const token = localStorage.getItem(ACCESS_TOKEN)
            await Api.delete(`/wishlist/${id}/`,{
                headers:{
                    'Authorization':`Bearer${token}`
                }
            })
            fetchdata();
        }catch{
            seterror('message')
        }finally{
            setloading(false)
        }
    };
    return (
    <div className='wishlist'>
    <div className="container-wishlist" >
        <div className="wishlist-header">
            <h1>My Wishlist</h1>
        </div>
        {loading && loading}
        { error && error }
        <table className="wishlist-table">
            <thead>
                <tr>
                    <th>Product name</th>
                    <th>Unit price</th>
                    <th>Stock status</th>
                    <th>Added on</th>
                </tr>
            </thead>
            <tbody>
                {wishlist && wishlist.map((item,index)=>(
                    <tr key={index}>
                        <td className="product">
                            <button className="delete-btn" onClick={()=>deleteData(item.id)}>🗑️</button>
                            <img src={item.product.image} alt="Beanie with Logo" />
                            <span>Beanie with Logo</span>
                        </td>
                        <td>
                            <span className="original-price">${item.product.price}</span>
                            <span className="discounted-price">${item.product.price}</span>
                        </td>
                        <td>In Stock</td>
                        <td className="action">
                            <span>December 5, 2019</span>
                            <button className="add-to-cart">Add to cart</button>
                        </td>  
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
    )
}
