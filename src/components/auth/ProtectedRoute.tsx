import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    // Check for authentication token in localStorage
    const isAuthenticated = !!localStorage.getItem("accessToken");

    if (!isAuthenticated) {
        // If not authenticated, redirect to login page
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
