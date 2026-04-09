import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import { AuthProvider } from './context/AuthProvider';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/category/:slug" element={<CategoryPage />} />
                        <Route path="/article/:slug" element={<ArticlePage />} />
                    </Routes>
                </Layout>
            </AuthProvider>
        </Router>
    );
}

export default App;
