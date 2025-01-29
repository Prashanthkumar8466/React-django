import { useEffect, useState } from "react"
import {Api} from '../api';
import api from "../api";
import '../css/ProductDetails.css'
import { useParams } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
export default function ProductDetails(){
    const [product,setproduct]=useState('');
    const [loading,setloading]=useState(false);
    const [quantity,setquantity]=useState(1);
    const [mainimage,setmainimage]=useState();
    const [message,setmessage]=useState('');
    const {id}=useParams();
    useEffect(()=>{
        async function getproduct() {
            const response = await Api.get(`/product/${id}/`);
            setproduct(response.data)
            setmainimage(response.data.image)
        }
        getproduct(); 
    },[id]);
    useEffect(() => {
        async function postRecent() {
            const token = localStorage.getItem(ACCESS_TOKEN);
            await Api.post(`/recent/`, { id: id }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        }
        postRecent();
    }, [id]);
    useEffect(()=>{
        async function mostrecent() {
            const token = localStorage.getItem(ACCESS_TOKEN);
            await Api.post(`/most/`, { id: id }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        }
        mostrecent()
    },[id])
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setloading(true);
        try{
            const token = localStorage.getItem(ACCESS_TOKEN)
            const response =await api.post('/cart/',{
                product_id:id,
                quantity:quantity,
            },{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(id,quantity)
            setquantity('');
            setmessage(response.data.message)
        }catch(error){
            console.log("Error",error)
        }finally{
            setloading(false)
        }
    }
    const fetchmain=(name)=>{
        setloading(true);
        try{
            setmainimage(name)
        }catch(error){
            console.log(error)
        }finally{
            setloading(false)
        }
    }
    return(
        <div className="productdetails">
                <div className="product-page">
                    <div className="slider-view">
                        <img onClick={()=>fetchmain(product.image_2)} className="slide-img" src={product.image_2} alt="Pure Coconut Oil" />
                        <img onClick={()=>fetchmain(product.image_3)} className="slide-img" src={product.image_3} alt="Pure Coconut Oil" />
                        <img onClick={()=>fetchmain(product.image_4)} className="slide-img" src={product.image_4} alt="Pure Coconut Oil" />
                        <img onClick={()=>fetchmain(product.image_5)} className="slide-img" src={product.image_5} alt="Pure Coconut Oil" />
                    </div>
                    <div className="product-image">
                        <img src={mainimage} alt="Pure Coconut Oil" />
                    </div>
                    <div className="product-details">
                        <h1>{product.Name}</h1>
                        <div className="flex">
                            <div className="details">
                                <p className="finalaccount"><span className="original-price"><b>₹{product.price}</b></span><span className="Final-price"> Total: ₹<b>{product.price}</b></span></p>
                                <p className="reviews">8 Reviews</p>
                                <p className="description">{product.description}</p>
                                <p className="popupmessagesucess">{message}</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="quantity">
                                        <label htmlFor="quantity">Quantity:</label>
                                        <select id="quantity" name="quantity" value={quantity} onChange={(e)=>setquantity(e.target.value)}>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                        </select>
                                           
                                    </div>
                                    <button className="add-to-cart">{loading ? 'loading..':'ADD TO CART'}</button>
                                </form>
                                <div className="product-tabs">
                                    <div className="tab">
                                        <button className="tab-button">Ingredients</button>
                                        <div className="tab-content">
                                            <p>Coconut Oil (100%)</p>
                                        </div>
                                    </div>
                                    <div className="tab">
                                        <button className="tab-button">Watch Video</button>
                                        <div className="tab-content">
                                            <p>Video content here.</p>
                                        </div>
                                    </div>
                                    <div className="tab">
                                        <button className="tab-button">Benefits & How to Use</button>
                                        <div className="tab-content">
                                            <p>Instructions on how to use the product.</p>
                                        </div>
                                    </div>
                                    <div className="tab">
                                        <button className="tab-button">Why Love Hair Coconut Oil</button>
                                        <div className="tab-content">
                                            <p>Reasons why this product is great.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

    )
}