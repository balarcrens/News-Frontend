import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthProvider';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/common/PageLoader';

// Admin Imports (Lazy Loaded)
const AdminRoute = lazy(() => import('./components/admin/AdminRoute'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminArticles = lazy(() => import('./pages/admin/AdminArticles'));
const AdminArticleEditor = lazy(() => import('./pages/admin/AdminArticleEditor'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

// Public Pages (Lazy Loaded)
const Home = lazy(() => import('./pages/Home'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/legal/TermsConditions'));
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy'));
const GitHubCallback = lazy(() => import('./pages/callback/GitHubCallback'));
const NotFound = lazy(() => import('./pages/NotFound'));

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'

function App() {
    return (
        <Router>
            <ScrollToTop />
            <AuthProvider>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        {/* Admin Routes */}
                        <Route path="/admin"
                            element={
                                <AdminRoute>
                                    <AdminLayout>
                                        <Outlet />
                                    </AdminLayout>
                                </AdminRoute>
                            }
                        >
                            <Route index element={<AdminDashboard />} />
                            <Route path="articles" element={<AdminArticles />} />
                            <Route path="articles/new" element={<AdminArticleEditor />} />
                            <Route path="articles/edit/:id" element={<AdminArticleEditor />} />
                            <Route path="categories" element={<AdminCategories />} />
                            <Route path="users" element={<AdminUsers />} />
                            <Route path="settings" element={<AdminSettings />} />
                        </Route>

                        {/* Public Routes */}
                        <Route path="/"
                            element={
                                <Layout>
                                    <Outlet />
                                </Layout>
                            }
                        >
                            <Route index element={<Home />} />
                            <Route path="auth" element={<AuthPage />} />
                            <Route path="category/:slug" element={<CategoryPage />} />
                            <Route path="article/:slug" element={<ArticlePage />} />
                            <Route path="about" element={<About />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="search" element={<SearchPage />} />
                            <Route path="privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="terms-conditions" element={<TermsConditions />} />
                            <Route path="cookie-policy" element={<CookiePolicy />} />
                            <Route path="auth/github/callback" element={<GitHubCallback />} />
                        </Route>

                        {/* 404 Not Found Catch-all */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </AuthProvider>
        </Router>
    );
}

export default App;

