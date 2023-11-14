import {Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("jwtToken") !== null;
    const isUser = localStorage.getItem("user") !== null;

  if (!isLoggedIn && !isUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
