import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to IMDB Clone</h1>
                <p className="text-gray-600 text-lg">
                    Manage your favorite movies, actors, and producers with ease.
                </p>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <Link
                    to="/movies"
                    className="bg-blue-500 text-white flex flex-col items-center justify-center py-8 px-6 rounded-lg shadow-md hover:bg-blue-600 transform hover:scale-105 transition duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-12 h-12 mb-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.22l8.5-4.25a2 2 0 012.04 0l8.5 4.25M12 12.76v6.48m0-6.48l8.5-4.25M12 12.76L3.5 8.51m8.5 4.25l8.5-4.25"
                        />
                    </svg>
                    <h2 className="text-xl font-semibold">View Movies</h2>
                    <p className="text-sm mt-2">Browse, add, edit, or delete movies.</p>
                </Link>
                <Link
                    to="/actors"
                    className="bg-green-500 text-white flex flex-col items-center justify-center py-8 px-6 rounded-lg shadow-md hover:bg-green-600 transform hover:scale-105 transition duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-12 h-12 mb-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.121 17.804A2.5 2.5 0 017.5 16h9a2.5 2.5 0 012.379 1.804M12 14.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
                        />
                    </svg>
                    <h2 className="text-xl font-semibold">View Actors</h2>
                    <p className="text-sm mt-2">Manage actor details easily.</p>
                </Link>
                <Link
                    to="/producers"
                    className="bg-purple-500 text-white flex flex-col items-center justify-center py-8 px-6 rounded-lg shadow-md hover:bg-purple-600 transform hover:scale-105 transition duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-12 h-12 mb-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 12h3m4 0h.01M9 16h6m-7 4h8a2 2 0 002-2v-9.5a2 2 0 00-2-2h-2l-2-3h-4l-2 3H7a2 2 0 00-2 2V18a2 2 0 002 2z"
                        />
                    </svg>
                    <h2 className="text-xl font-semibold">View Producers</h2>
                    <p className="text-sm mt-2">Add or update producer information.</p>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
