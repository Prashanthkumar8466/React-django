import React, {useState } from 'react';
import api from "../api";
import '../css/Contact.css'
export default function Contact() {
    const [Loading ,setLoading]=useState(false);
    const [formData ,setformData] =useState({
        Name:'',
        email:'',
        message:'',
    });
    const [status,setstatus]=useState('');
    const handleChanges=(e)=>{
        const {name,value}=e.target;
        setformData({
            ...formData,
            [name]:value,
        });
    };
    const handleSubmit= async(e)=>{
        setLoading(true)
        e.preventDefault();
        try{
            await api.post('contact/',formData);
            setstatus('Message send Sucessfully');
            setformData({
                Name:'',
                email:'',
                message:'',
            });
        }catch(error){
            setstatus('Message send Failed',error)
        }finally{
            setLoading(false)
        }
    };
  return (
    <div className='main'>
        <div className="contact-container">
            <h2>Contact Us</h2>
            <p>If you have any questions, feel free to reach out to us!</p>
            {status && <p className='status'>{status}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="name">Your Name</label>
                    <input 
                        type="text" 
                        id='Name' 
                        name="Name" 
                        value={formData.Name}
                        onChange={handleChanges}
                        required />
                </div>
                <div class="form-group">
                    <label for="email">Your Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChanges}
                        required />
                </div>
                <div class="form-group">
                    <label for="message">Your Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        rows="3" 
                        value={formData.message}
                        onChange={handleChanges}
                        required ></textarea>
                </div>
                <button className='button' type="submit" disabled={Loading}>{Loading ? 'Sending...' : 'Send Message'}</button>
            </form>
        </div>
    </div>
  )
}
