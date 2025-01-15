import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Start loader
        try {
            const response = await signup({ email, password });
            console.log("Signup successful:", response.data);
            navigate("/signin"); // Redirect to SignIn page
        } catch (err: any) {
            console.error("Signup failed:", err);
            setError(err.response?.data?.error || "An error occurred. Please try again.");
        } finally {
            setLoading(false); // Stop loader
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
            <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="submit"
                        disabled={loading} // Disable button when loading
                        className={`w-full py-3 rounded-lg text-white ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
                            }`}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                <span>Signing Up...</span>
                            </div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>
                <p className="text-gray-600 mt-4 text-center">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/signin")}
                        className="text-green-500 hover:underline cursor-pointer"
                    >
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
