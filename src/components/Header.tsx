// src/components/Header.tsx

import React, { useEffect, useState } from 'react';
import logo from '../assets/files/l8logo.jpg';
import '../assets/styles/layout/_header.scss';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import useUpcomingEvent from "../hooks/fetchUpcomingEvent";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const user = useSelector((state: any) => state.auth.user);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const upcomingEvent = useUpcomingEvent();

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
                <Link to={`/event/${upcomingEvent?.id}`}>Næste Event</Link>
                <Link to="/events">Events</Link>
                <Link to="#services">Om L8</Link>
                <Link to="#contact">Contact</Link>
                <div>
                    {user ? (
                        <Link to="/dashboard">Dashboard</Link>
                    ) : (
                        <Link to="/users/login">Login</Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
