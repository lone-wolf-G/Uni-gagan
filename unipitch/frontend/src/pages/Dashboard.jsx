import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const Dashboard = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('/protected');
                setMessage(response.data.message);
            } catch (error) {
                setMessage('Error fetching protected data.');
            }
        };
        fetchProtectedData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{message}</p>
        </div>
    );
};

export default Dashboard;
