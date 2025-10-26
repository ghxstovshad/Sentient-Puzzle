
import React from 'react';

const SentientLogo = () => (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" stroke="#FFFFFF" strokeWidth="5"/>
        <path d="M50 20L50 80" stroke="#FFFFFF" strokeWidth="5"/>
        <path d="M20 50L80 50" stroke="#FFFFFF" strokeWidth="5"/>
        <path d="M30 30L70 70" stroke="#FFFFFF" strokeWidth="5"/>
        <path d="M30 70L70 30" stroke="#FFFFFF" strokeWidth="5"/>
    </svg>
);


const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm text-white p-4 flex items-center justify-between shadow-lg z-50">
            <div className="flex items-center gap-3">
                <SentientLogo />
                <span className="hidden sm:block text-xl font-bold tracking-wider">Sentient</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold absolute left-1/2 -translate-x-1/2">Sentient Puzzle</h1>
            <div></div>
        </header>
    );
};

export default Header;
