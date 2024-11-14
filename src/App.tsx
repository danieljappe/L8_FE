import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import Card from './components/Card';
import EventList from './components/EventList';
import Header from "./components/Header";
import HomePage from "./components/Homepage";

function App() {
    return (
        <div className="App">
            <Header title="Header"/>
            <HomePage/>
        </div>
    );
}


export default App;
