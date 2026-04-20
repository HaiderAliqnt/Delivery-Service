import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from 'C:/Users/PC/Documents/GIKGo/FrontEnd/src/utils/auth.js';

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
