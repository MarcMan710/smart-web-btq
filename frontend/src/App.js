import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import HafalanPage from './pages/HafalanPage';
import RecordingPage from './pages/RecordingPage';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import InstructionPage from './pages/InstructionPage';
import SubmitRecording from './pages/SubmitRecording';
import PrivateRoute from './components/PrivateRoute';
import MonitorPage from './pages/MonitorPage';
import About from './pages/About';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <main>
                    <Routes> {/* Updated from Switch to Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<PrivateRoute component={Profile} />} />
                        <Route path="/hafalan" element={<HafalanPage />} />
                        <Route path="/recording/:id" element={<RecordingPage />} />
                        <Route path="/instructions" element={<InstructionPage />} />
                        <Route path="/submit-recording" element={<SubmitRecording />} />
                        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                        <Route path="/monitor" element={<PrivateRoute component={MonitorPage} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
                <ToastContainer />
            </div>
        </Router>
    );
};

export default App;