import React, { useState } from 'react';
import '../css/Login.css'
import api from '../api'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

export default function Login({setisAuthenticated}) {
  const [username,setusername]=useState('');
  const [password,setpassword]=useState('');
  const [error,seterror]=useState('');
  const [Loading ,setLoading]=useState(false);
  const Navigate=useNavigate();

  const handleSubmit = async(e)=>{
    setLoading(true)
    e.preventDefault();
    try{
      const response = await api.post('/api/token/',{
        username:username,
        password:password,
      });
      localStorage.setItem(ACCESS_TOKEN,response.data.access);
      localStorage.setItem(REFRESH_TOKEN,response.data.refresh);
      setisAuthenticated(true);
      Navigate('/') 
    }catch(error){
      seterror('Invalid credentials');
      console.error('Login error:', error);
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='main'>
      <div className="login-container">
          <h2>Login</h2>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input className='input' type="text" id="username" name="username" value={username} onChange={(e)=>setusername(e.target.value)}required />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input className='input' type="password" id="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value)} required />
              </div>
              <button type="submit" className='button' disabled={Loading}>{Loading ? 'loging in...':'Login'}</button>
          </form>
          <p>Don't have an account? <a href="/register">Sign up here</a>.</p>
        </div>
      </div> 
  )
}
