import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import ProtectedRoute from './components/ProtectedRoute';
import CategoryPage from './pages/CategoryPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import ScrollToTop from './components/ScrollToTop';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ArticlesList from './pages/admin/ArticlesList';
import ArticleEditor from './pages/admin/ArticleEditor';
import CategoryManager from './pages/admin/CategoryManager';
import { AuthProvider } from './context/AuthContext';
import UserManager from './pages/admin/UserManager';

const Layout = () => (
    <div className="app-layout">
        <Navbar />
        <main className="app-main container">
            <Outlet />
        </main>
        <Footer />
        <ScrollToTop />
    </div>
);


import LanguageSyncManager from './components/LanguageSyncManager';

const publicRoutes = [
    { path: "", element: <HomePage /> },
    { path: "article/:slug", element: <ArticlePage /> },
    { path: "category/:slug", element: <CategoryPage /> },
    { path: "login", element: <LoginPage /> },
    { path: "register", element: <RegisterPage /> },
    { path: "about", element: <AboutUsPage /> },
    { path: "contact", element: <ContactUsPage /> },
    { path: "privacy-policy", element: <PrivacyPolicy /> },
    { path: "terms-of-service", element: <TermsOfService /> },
    { path: "cookie-policy", element: <CookiePolicy /> },
    { path: "*", element: <NotFoundPage /> },
];

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <LanguageSyncManager />
                <Routes>
                    {/* Public Routes with Navbar and Footer */}
                    <Route element={<Layout />}>
                        {publicRoutes.map((route, i) => (
                            <Route key={`base-${i}`} path={`/${route.path}`} element={route.element} />
                        ))}
                        {publicRoutes.map((route, i) => (
                            <Route key={`lang-${i}`} path={`/:lang/${route.path}`} element={route.element} />
                        ))}
                    </Route>

                    {/* Admin Routes - Standalone Layout */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute adminOnly={true}>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="articles" element={<ArticlesList />} />
                        <Route path="articles/create" element={<ArticleEditor />} />
                        <Route path="articles/edit/:id" element={<ArticleEditor />} />
                        <Route path="categories" element={<CategoryManager />} />
                        <Route path="users" element={<UserManager />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
