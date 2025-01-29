import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import chair from '../images/pngwing.com.png';
import  api  from '../api';
import Homeproduct from './Homeproduct';
import { ACCESS_TOKEN } from '../constants';

export default function Home() {
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token=localStorage.getItem(ACCESS_TOKEN); 
        const response = await api.get('/recent/',{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        });
        setRecent(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  //biggest sales Hook statement
  const[bigsales,setbigsales]=useState([]);
  useEffect(()=>{
    const fetchinfo= async()=>{
      try{
        setLoading(true)
        const bigsalesinfo=await api.get('/bigsales/')
        setbigsales(bigsalesinfo.data)
      }
      catch(e){
        setError(e)
      }finally{
        setLoading(false)
      }
    }
    fetchinfo()
  },[])
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        bigsales.length ? (prevIndex + 1) % bigsales.length : 0
      );
    }, 5000);

    return () => clearInterval(interval); // Cleanup to prevent multiple intervals
  }, [bigsales]);
  console.log(currentIndex)
  return (
    <div className="body">
      <div className="Home-display">
        <div className="container-home">
        {bigsales.length > 0 && (
            <div key={bigsales[currentIndex]?.id} className="display-flex most-deal">
              <div className="text-container">
                <p className="biggest-offer">Biggest Offer Revealed</p>
                <p className="more-deals">MORE DEALS INSIDE</p>
                <p className="discount">UP TO 50% OFF</p>
                <a href={`product/${bigsales[currentIndex]?.product?.id}`} className="wishlist-button">
                  View Now ➻
                </a>
              </div>
              <div className="image-container">
                <img
                  src={bigsales[currentIndex]?.product?.image || chair}
                  alt="Big Sales Item"
                />
              </div>
            </div>
          )}
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <div>
          <h6 className="title top">Recent</h6>
          <div className="product-list">
            {recent.map((product) => (
              <a key={product.id} className='links' href={`product/${product.product.id}`}><Homeproduct product={product}/></a>
            ))}
          </div>
          <h6 className="title">Suggestion for You</h6>
          <div className="product-list links">
            {recent.map((product) => (
              <Homeproduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
