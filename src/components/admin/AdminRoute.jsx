import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../context/useAuth';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        // Log unauthorized access attempt if needed
        console.warn('Unauthorized admin access attempt', user);
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminRoute;

