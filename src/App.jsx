import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import { AuthProvider } from './context/AuthProvider';
import About from './pages/About';
import Contact from './pages/Contact';
import SearchPage from './pages/SearchPage';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsConditions from './pages/legal/TermsConditions';
import CookiePolicy from './pages/legal/CookiePolicy';
import ScrollToTop from './components/ScrollToTop';
import GitHubCallback from './pages/callback/GitHubCallback';

// Admin Imports
import AdminRoute from './components/admin/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminArticles from './pages/admin/AdminArticles';
import AdminArticleEditor from './pages/admin/AdminArticleEditor';
import AdminCategories from './pages/admin/AdminCategories';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';

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
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
