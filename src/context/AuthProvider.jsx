import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const googleLogin = async (credential) => {
        setLoading(true);
        setError(null);

        try {
            const { data } = await api.post('/api/auth/google', {
                token: credential
            });

            localStorage.setItem('authorization', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);

            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Google login failed.';
            setError(message);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const githubLogin = async (code) => {
        setLoading(true);
        setError(null);

        try {
            const { data } = await api.post('/api/auth/github', { code });

            localStorage.setItem('authorization', data.token);
            setUser(data);

            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'GitHub login failed';
            setError(message);
            return { success: false };
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

    const forgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/api/auth/forgotpassword', { email });
            return { success: true, message: data.message };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to send reset email.';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (token, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.put(`/api/auth/resetpassword/${token}`, { password });
            return { success: true, token: data.token };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to reset password.';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('authorization');
        toast.success('Logout successfully');
        navigate('/');
        window.scroll(0, 0);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError, googleLogin, githubLogin, forgotPassword, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};
