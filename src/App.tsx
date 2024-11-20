import React from 'react';
import { BrowserRouter , Route, Routes, Router } from 'react-router-dom'
import './App.css';
import Header from "./components/Header";
import HomePage from "./pages/Homepage";
import Eventspage from "./pages/Eventspage";
import Loginpage from "./pages/Loginpage";
import Dashboard from "./pages/employee/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header title="Header"/>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/events' element={<Eventspage/>} />
                    <Route path='/users/login' element={<Loginpage/>} />
                    <Route path='/dashboard' element={<Dashboard/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}


export default App;
