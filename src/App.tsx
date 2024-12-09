import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import HomePage from "./pages/Homepage";
import Eventspage from "./pages/Eventspage";
import EventPage from "./pages/EventPage";
import Loginpage from "./pages/Loginpage";
import Dashboard from "./pages/employee/Dashboard";
import PrivateRoute from './components/PrivateRoute';
import { AnimatePresence, motion } from "framer-motion";
import AboutUs from "./pages/AboutUsPage";

const App: React.FC = () => {
    const location = useLocation();

    // Page transition animations
    const pageVariants = {
        initial: { opacity: 0.5 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return (
        <div className="App">
            <Header title="Header" />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <HomePage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/events"
                        element={
                            <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <Eventspage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/event/:eventId"
                        element={
                            <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <EventPage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/aboutus"
                        element={
                            <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <AboutUs />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/users/login"
                        element={
                            <motion.div
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <Loginpage />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <motion.div
                                    variants={pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <Dashboard />
                                </motion.div>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </div>
    );
};

const AppWithRouter: React.FC = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

export default AppWithRouter;
