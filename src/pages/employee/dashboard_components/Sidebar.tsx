import React from 'react';

interface SidebarProps {
    setActiveTab: (tab: string) => void;
    handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, handleLogout }) => {
    return (
        <div className="sidebar">
            <ul>
                <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
                <li onClick={() => setActiveTab('profile')}>Profile</li>
                <li onClick={() => setActiveTab('createEvent')}>Create Event</li>
                <li onClick={() => setActiveTab('createArtist')}>Create Artist</li>
                <li onClick={() => setActiveTab('')}>About us</li>
            </ul>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
