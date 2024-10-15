import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import AddHafalanPage from './pages/AddHafalanPage';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/hafalan" element={<HafalanPage />} />
                <Route path="/recording" element={<RecordingPage />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/instructions" element={<InstructionPage />} />
                <Route path="/submit-recording" element={<SubmitRecording />} />
                <Route path="/about" element={<About />} />
                <Route path="/add-hafalan" element={<AddHafalanPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <ToastContainer />
        </Router>
    );
}

export default App;