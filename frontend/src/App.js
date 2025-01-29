import {  BrowserRouter as Router, Route, Routes, Navigate, } from 'react-router-dom';
import Header from './screens/Header';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Cart from './screens/Cart';
import Contact from './screens/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import Wishlist from './screens/Wishlist';
import './App.css';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN } from './constants';
import ProductDetails from './screens/ProductDetails';
import User from './screens/User';

function Logout({setisAuthenticated}){
  useEffect(()=>{
    localStorage.clear();
    setisAuthenticated(false);
  },[setisAuthenticated])
  return <Navigate to='/login' /> 
  
}

function App() {
  const [isAuthenticated , setisAuthenticated]=useState(!!localStorage.getItem(ACCESS_TOKEN))
  
  return (
    <Router>
      <Header isAuthenticated={isAuthenticated}/> 
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='/login' element={<Login setisAuthenticated={setisAuthenticated}/>}/>
        <Route path='/logout' element={<Logout setisAuthenticated={setisAuthenticated}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/profile/' element={<ProtectedRoute><User /></ProtectedRoute>}/>
        <Route path='/wishlist/' element={<ProtectedRoute><Wishlist /></ProtectedRoute>}/>
      </Routes>
  </Router>
  );
}

export default App;
