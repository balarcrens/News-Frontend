import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingState from './components/LoadingState';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import LanguageSyncManager from './components/LanguageSyncManager';
import { AuthProvider } from './context/AuthContext';

// Public Pages - Lazy Loaded
const HomePage = lazy(() => import('./pages/HomePage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Admin Pages - Lazy Loaded
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ArticlesList = lazy(() => import('./pages/admin/ArticlesList'));
const ArticleEditor = lazy(() => import('./pages/admin/ArticleEditor'));
const CategoryManager = lazy(() => import('./pages/admin/CategoryManager'));
const UserManager = lazy(() => import('./pages/admin/UserManager'));

const Layout = () => (
    <div className="app-layout">
        <Navbar />
        <main className="app-main container">
            <Suspense fallback={<LoadingState fullPage={false} />}>
                <Outlet />
            </Suspense>
        </main>
        <Footer />
        <ScrollToTop />
    </div>
);


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
    { path: "disclaimer", element: <Disclaimer /> },
    { path: "forgot-password", element: <ForgotPasswordPage /> },
    { path: "reset-password/:token", element: <ResetPasswordPage /> },
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
-
                    {/* Admin Routes - Standalone Layout */}
                    <Route
                        path="/admin"
                        element={
                            <Suspense fallback={<LoadingState fullPage={true} />}>
                                <ProtectedRoute adminOnly={true}>
                                    <AdminLayout />
                                </ProtectedRoute>
                            </Suspense>
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
