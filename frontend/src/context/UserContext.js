import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get('http://localhost:1234/api/auth/authCheck', { withCredentials: true });
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser(null);
            } finally {
                setLoading(false); 
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
