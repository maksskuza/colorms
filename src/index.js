import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Main from './pages/Main';
import Market from './pages/Market';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> 
        <Route path="/market" element={<Market />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="*" element={<NotFound />} /> 
      </Routes> 
    </BrowserRouter>
  </React.StrictMode>
);