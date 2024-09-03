// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import About from './pages/About';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <PrivateRoute path="/profile" component={Profile} />
                        <Route path="/hafalan" component={HafalanPage} />
                        <Route path="/recording/:id" component={RecordingPage} />
                        <Route path="/instructions" component={InstructionPage} />
                        <Route path="/submit-recording" component={SubmitRecording} />
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        <Route path="/about" component={About} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
