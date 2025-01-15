import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/Movies";
import Actors from "./pages/Actors";
import Producers from "./pages/Producers";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Welcome from "./pages/Welcome";

const AppRouter: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem("token"); // Check for token

    // A helper component to exclude the header for specific routes
    const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const location = useLocation();
        const noHeaderRoutes = ["/signin", "/signup"]; // Routes without Header

        return (
            <>
                {!noHeaderRoutes.includes(location.pathname) && <Header />}
                {children}
            </>
        );
    };

    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/movies"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Layout>
                                <Movies />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/actors"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Layout>
                                <Actors />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/producers"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Layout>
                                <Producers />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Welcome />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
