// src/components/Header.tsx

import React, { useEffect, useState } from 'react';
import logo from '../assets/files/l8logo.jpg';
import '../assets/styles/layout/_header.scss';
import {useSelector} from "react-redux";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const user = useSelector((state: any) => state.auth.user);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setIsVisible(currentScrollY <= lastScrollY);
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <header className={`header ${isVisible ? 'visible' : 'hidden'}`}>
            <a href="/">
                <img src={logo} alt="Logo" className="logo"/>
            </a>
            <nav className="nav-links">
                <a href="#home">Næste Event</a>
                <a href="/events">Events</a>
                <a href="#services">Om L8</a>
                <a href="#contact">Contact</a>
                <div>
                    {user ? (
                        <a href={"/dashboard"}>Dashboard</a>
                    ): (
                        <a href="/users/login">Login</a>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
