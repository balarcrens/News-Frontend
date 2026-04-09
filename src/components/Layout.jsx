import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow pt-[135px] md:pt-[118px]">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
