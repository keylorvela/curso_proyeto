import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from 'src/components/utils/AuthContext.jsx';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    alert('You must be logged in to access this page.');
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
