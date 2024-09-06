import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';

const PrivateRoute = ({ element: Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
