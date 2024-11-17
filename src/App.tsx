import React from 'react';
import { BrowserRouter , Route, Routes, Router } from 'react-router-dom'
import './App.css';
import Header from "./components/Header";
import HomePage from "./components/Homepage";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header title="Header"/>
                <Routes>
                    <Route path='/' element={<HomePage />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}


export default App;
