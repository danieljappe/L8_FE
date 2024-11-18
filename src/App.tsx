import React from 'react';
import { BrowserRouter , Route, Routes, Router } from 'react-router-dom'
import './App.css';
import Header from "./components/Header";
import HomePage from "./pages/Homepage";
import Eventspage from "./pages/Eventspage";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header title="Header"/>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/events' element={<Eventspage/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}


export default App;
