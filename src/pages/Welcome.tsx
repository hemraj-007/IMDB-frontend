import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to IMDB Clone</h1>
            <p className="text-gray-600 mb-6">Your ultimate movie and actor database.</p>
            <button
                onClick={() => navigate("/signup")}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Get Started
            </button>
        </div>
    );
};

export default Welcome;
