import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@store";

const ProtectedRoute = () => {
    // Check for authentication token in store
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        // If not authenticated, redirect to login page
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
