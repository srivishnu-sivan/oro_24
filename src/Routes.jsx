import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './pages/signin/SignIn.jsx';
import ServicesPage from './pages/services/Services.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
};

export default AppRoutes;