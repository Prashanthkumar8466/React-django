import React, { useState } from 'react'
import '../css/Register.css'
import api from "../api";
export default function Register() {
  const [Confirmpassword,setconfirmpassword]=useState('');
  const [formData,setformData]=useState({
    username :'',
    email:'',
    password:'',
    
  });
  const [loading ,setLoading]=useState(false);
  const [status,setstatus]=useState('');

  const handleChanges=(e)=>{
    const {name,value}=e.target;
    setformData({
      ...formData,
      [name]:value,
    })
  }
  const handleSubmit=async(e)=>{
    setLoading(true);
    e.preventDefault();
    try{
      if (Confirmpassword === formData.password){
        await api.post('register/',formData);
        setstatus('Registration Sucessfull');
        setformData({
          username :'',
          email:'',
          password:'',
          password2:'',
        });
      }
      else{
        setstatus('password Not match')
      }
    }catch(error){
      setstatus('Registration Failed',error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='main'>
      <div className="register-container">
        <h2>Register</h2>
        {loading && <p>loading....</p>}
        {status && <p>{status}</p>}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  value={formData.username}
                  onChange={handleChanges}
                  required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChanges}
                  required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleChanges}
                  required />
            </div>
            <div className="form-group">
                <label htmlFor="password2">Confirm Password:</label>
                <input 
                  type="password" 
                  id="password2" 
                  name="password2"
                  value={Confirmpassword}
                  onChange={(e)=>setconfirmpassword(e.target.value)}
                  required />
            </div>
            <button type="submit" className='button'>Register</button>
        </form>
        <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
    </div>
  )
}
