import React, { useState, useEffect } from "react";
import { fetchActors, createActor, updateActor, deleteActor } from "../api/actorApi";

const Actors: React.FC = () => {
    const [actors, setActors] = useState<any[]>([]);
    const [newActor, setNewActor] = useState({ name: "", gender: "", dob: "", bio: "" });
    const [editActor, setEditActor] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({}); // Validation errors

    // Fetch actors from API
    const loadActors = async () => {
        setLoading(true);
        try {
            const response = await fetchActors();
            setActors(response.data.actors);
        } catch (error) {
            console.error("Error fetching actors:", error);
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

    // Add a new actor
    const handleAddActor = async () => {
        const newErrors = validate(newActor);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            await createActor(newActor);
            setNewActor({ name: "", gender: "", dob: "", bio: "" });
            setErrors({});
            loadActors();
        } catch (error) {
            console.error("Error creating actor:", error);
        } finally {
            setLoading(false);
        }
    };

    // Update an existing actor
    const handleUpdateActor = async () => {
        if (editActor) {
            const newErrors = validate(editActor);
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            try {
                setLoading(true);
                await updateActor(editActor.id, editActor);
                setEditActor(null);
                setErrors({});
                loadActors();
            } catch (error) {
                console.error("Error updating actor:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Delete an actor
    const handleDeleteActor = async (id: number) => {
        try {
            setLoading(true);
            await deleteActor(id);
            loadActors();
        } catch (error) {
            console.error("Error deleting actor:", error);
        } finally {
            setLoading(false);
        }
    };

    // Load actors on component mount
    useEffect(() => {
        loadActors();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Actors Management</h1>

            {/* Loader */}
            {loading && (
                <div className="text-center mb-6">
                    <div className="inline-block w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            )}

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add Actor Form */}
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Add / Edit Actor</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={editActor ? editActor.name : newActor.name}
                            onChange={(e) =>
                                editActor
                                    ? setEditActor({ ...editActor, name: e.target.value })
                                    : setNewActor({ ...newActor, name: e.target.value })
                            }
                            className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : "focus:ring focus:ring-blue-200"
                                }`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                        <select
                            value={editActor ? editActor.gender : newActor.gender}
                            onChange={(e) =>
                                editActor
                                    ? setEditActor({ ...editActor, gender: e.target.value })
                                    : setNewActor({ ...newActor, gender: e.target.value })
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
                            value={editActor ? editActor.dob : newActor.dob}
                            onChange={(e) =>
                                editActor
                                    ? setEditActor({ ...editActor, dob: e.target.value })
                                    : setNewActor({ ...newActor, dob: e.target.value })
                            }
                            className={`w-full p-2 border rounded ${errors.dob ? "border-red-500" : "focus:ring focus:ring-blue-200"
                                }`}
                        />
                        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

                        <textarea
                            placeholder="Bio"
                            value={editActor ? editActor.bio : newActor.bio}
                            onChange={(e) =>
                                editActor
                                    ? setEditActor({ ...editActor, bio: e.target.value })
                                    : setNewActor({ ...newActor, bio: e.target.value })
                            }
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                        ></textarea>

                        <button
                            onClick={editActor ? handleUpdateActor : handleAddActor}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            {editActor ? "Update Actor" : "Add Actor"}
                        </button>
                        {editActor && (
                            <button
                                onClick={() => setEditActor(null)}
                                className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                {/* Actor List */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Actor List</h2>
                    {actors.map((actor) => (
                        <div key={actor.id} className="p-4 border rounded mb-4 bg-gray-50 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800">{actor.name}</h3>
                            <p className="text-gray-600">{actor.gender}</p>
                            <p className="text-gray-600">{new Date(actor.dob).toDateString()}</p>
                            <p className="text-gray-600">{actor.bio}</p>
                            <div className="flex space-x-2 mt-2">
                                <button
                                    onClick={() => setEditActor(actor)}
                                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteActor(actor.id)}
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

export default Actors;
