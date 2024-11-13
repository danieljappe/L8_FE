import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Card from './components/Card';
import EventList from './components/EventList';

function App() {
    return (
        <div className="App">
            <h1>iOS-Style Project</h1>
            <Card title="Welcome to iOS Style">
                <p>This is a sample card component styled to resemble iOS.</p>
                <Button label="Get Started" onClick={() => alert('Button Clicked')} />
                <EventList />
            </Card>
        </div>
    );
}


export default App;
