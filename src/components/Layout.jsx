import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-[#C10007] selection:text-white">
            <Header />
            <main className="flex-grow pt-[110px] md:pt-[118px]">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
