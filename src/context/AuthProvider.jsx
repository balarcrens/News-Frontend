import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import api from '../api/axios';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkMe = async () => {
            const token = localStorage.getItem('authorization');
            if (token) {
                try {
                    const { data } = await api.get('/api/auth/me');
                    setUser(data);
                } catch (err) {
                    console.log(err.message);
                    localStorage.removeItem('authorization');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkMe();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/api/auth/login', { email, password });
            localStorage.setItem('authorization', data.token);
            setUser(data);
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed.';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/api/auth/register', { name, email, password });
            localStorage.setItem('authorization', data.token);
            setUser(data);
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed.';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('authorization');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError }}>
            {children}
        </AuthContext.Provider>
    );
};