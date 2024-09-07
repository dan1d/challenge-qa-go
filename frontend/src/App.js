import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';
import LoginPage from './pages/LoginPage';
import ChatroomPage from './pages/ChatroomPage';
import UserProfilePage from './pages/UserProfilePage';
import PrivateRoute from './utils/PrivateRoute';
import LandingPage from './pages/LandingPage';
import TriggerTestsPage from './pages/TriggerTestsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout className="layout">
        <AppHeader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chatroom" element={<PrivateRoute element={ChatroomPage} />} />
          <Route path="/profile" element={<PrivateRoute element={UserProfilePage} />} />
          <Route path="/trigger-tests" element={<PrivateRoute element={TriggerTestsPage} />} />
        </Routes>
        <AppFooter />
      </Layout>
    </Router>
  );
}

export default App;
