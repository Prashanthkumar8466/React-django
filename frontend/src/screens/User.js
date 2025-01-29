import React, { useEffect, useState } from 'react';
import api from '../api';
import '../css/Profile.css';
import { ACCESS_TOKEN } from '../constants';

export default function User() {
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        profile: '',
        mobile: '',
        Bio: '',
        Address: '',
    });

    const token = localStorage.getItem(ACCESS_TOKEN);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            setLoading(true);
            try {
                const response = await api.get('/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleChanges = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();

        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            await api.post('/profile/', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFormData({
                profile: '',
                mobile: '',
                Bio: '',
                Address: '',
            });
            const response = await api.get('/profile/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setProfile(response.data);
        } catch (error) {
            console.log('Error submitting form', error);
            console.log(data)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='profile'>
            {loading && <p>Loading....</p>}
            {profile.length > 0 ? (
                profile.map((profileItem) => (
                    <div className='details' key={profileItem.id}>
                        <img src={profileItem.profile} alt='profile' />
                        <p>Name: {profileItem.user.username}</p>
                        <p>Address: {profileItem.Address}</p>
                        <p>Bio: {profileItem.Bio}</p>
                    </div>
                ))
            ) : (
                <form className='form' onSubmit={handleSubmit}>
                    <h1>Profile Details</h1>
                    <div>
                        Address:
                        <input
                            name='Address'
                            type='text'
                            value={formData.Address}
                            onChange={handleChanges}
                            required
                        />
                        phone:
                        <input
                            name='mobile'
                            type='text'
                            value={formData.mobile}
                            onChange={handleChanges}
                        />
                        Bio:
                        <input
                            name='Bio'
                            type='text'
                            value={formData.Bio}
                            onChange={handleChanges}
                        />
                        profile:<br />
                        <input
                            name='profile'
                            type='file'
                            onChange={handleChanges}
                        />
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            )}
        </div>
    );
}
