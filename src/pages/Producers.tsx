import React, { useState, useEffect } from "react";
import { fetchProducers, createProducer, updateProducer, deleteProducer } from "../api/ProducerApi";

const Producers: React.FC = () => {
    const [producers, setProducers] = useState<any[]>([]);
    const [newProducer, setNewProducer] = useState({ name: "", gender: "", dob: "", bio: "" });
    const [editProducer, setEditProducer] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({}); // Validation errors

    // Fetch producers from API
    const loadProducers = async () => {
        setLoading(true);
        try {
            const response = await fetchProducers();
            setProducers(response.data.producers);
        } catch (error) {
            console.error("Error fetching producers:", error);
        } finally {
            setLoading(false);
        }
    };

    // Validate form fields
    const validate = (data: any) => {
        const newErrors: any = {};
        if (!data.name.trim()) newErrors.name = "Name is required";
        if (!data.gender) newErrors.gender = "Gender is required";
        if (!data.dob) newErrors.dob = "Date of birth is required";
        return newErrors;
    };

    // Add a new producer
    const handleAddProducer = async () => {
        const newErrors = validate(newProducer);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            await createProducer(newProducer);
            setNewProducer({ name: "", gender: "", dob: "", bio: "" });
            setErrors({});
            loadProducers();
        } catch (error) {
            console.error("Error creating producer:", error);
        } finally {
            setLoading(false);
        }
    };

    // Update an existing producer
    const handleUpdateProducer = async () => {
        if (editProducer) {
            const newErrors = validate(editProducer);
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            try {
                setLoading(true);
                await updateProducer(editProducer.id, editProducer);
                setEditProducer(null);
                setErrors({});
                loadProducers();
            } catch (error) {
                console.error("Error updating producer:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Delete a producer
    const handleDeleteProducer = async (id: number) => {
        try {
            setLoading(true);
            await deleteProducer(id);
            loadProducers();
        } catch (error) {
            console.error("Error deleting producer:", error);
        } finally {
            setLoading(false);
        }
    };

    // Load producers on component mount
    useEffect(() => {
        loadProducers();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Producers Management</h1>

            {/* Loader */}
            {loading && (
                <div className="text-center mb-6">
                    <div className="inline-block w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            )}

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add Producer Form */}
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Add / Edit Producer</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={editProducer ? editProducer.name : newProducer.name}
                            onChange={(e) =>
                                editProducer
                                    ? setEditProducer({ ...editProducer, name: e.target.value })
                                    : setNewProducer({ ...newProducer, name: e.target.value })
                            }
                            className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : "focus:ring focus:ring-blue-200"
                                }`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                        <select
                            value={editProducer ? editProducer.gender : newProducer.gender}
                            onChange={(e) =>
                                editProducer
                                    ? setEditProducer({ ...editProducer, gender: e.target.value })
                                    : setNewProducer({ ...newProducer, gender: e.target.value })
                            }
                            className={`w-full p-2 border rounded ${errors.gender ? "border-red-500" : "focus:ring focus:ring-blue-200"
                                }`}
                        >
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

                        <input
                            type="date"
                            value={editProducer ? editProducer.dob : newProducer.dob}
                            onChange={(e) =>
                                editProducer
                                    ? setEditProducer({ ...editProducer, dob: e.target.value })
                                    : setNewProducer({ ...newProducer, dob: e.target.value })
                            }
                            className={`w-full p-2 border rounded ${errors.dob ? "border-red-500" : "focus:ring focus:ring-blue-200"
                                }`}
                        />
                        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

                        <textarea
                            placeholder="Bio"
                            value={editProducer ? editProducer.bio : newProducer.bio}
                            onChange={(e) =>
                                editProducer
                                    ? setEditProducer({ ...editProducer, bio: e.target.value })
                                    : setNewProducer({ ...newProducer, bio: e.target.value })
                            }
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                        ></textarea>

                        <button
                            onClick={editProducer ? handleUpdateProducer : handleAddProducer}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            {editProducer ? "Update Producer" : "Add Producer"}
                        </button>
                        {editProducer && (
                            <button
                                onClick={() => setEditProducer(null)}
                                className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                {/* Producer List */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Producer List</h2>
                    {producers.map((producer) => (
                        <div key={producer.id} className="p-4 border rounded mb-4 bg-gray-50 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800">{producer.name}</h3>
                            <p className="text-gray-600">{producer.gender}</p>
                            <p className="text-gray-600">{new Date(producer.dob).toDateString()}</p>
                            <p className="text-gray-600">{producer.bio}</p>
                            <div className="flex space-x-2 mt-2">
                                <button
                                    onClick={() => setEditProducer(producer)}
                                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteProducer(producer.id)}
                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Producers;
