import React, { useState, useEffect } from "react";
import { fetchMovies, createMovie, updateMovie, deleteMovie } from "../api/movieApi";
import { fetchActors } from "../api/actorApi";
import { fetchProducers } from "../api/ProducerApi";

const Movies: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [actors, setActors] = useState<any[]>([]);
    const [producers, setProducers] = useState<any[]>([]);
    const [newMovie, setNewMovie] = useState({
        name: "",
        yearOfRelease: "",
        plot: "",
        poster: "",
        producerId: "",
        actorIds: [] as number[],
    });
    const [editMovie, setEditMovie] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({}); // Validation errors

    // Fetch movies, actors, and producers
    const loadData = async () => {
        setLoading(true);
        try {
            const [moviesRes, actorsRes, producersRes] = await Promise.all([
                fetchMovies(),
                fetchActors(),
                fetchProducers(),
            ]);
            setMovies(moviesRes.data.movies);
            setActors(actorsRes.data.actors);
            setProducers(producersRes.data.producers);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Validate form fields
    const validate = (data: any) => {
        const newErrors: any = {};
        if (!data.name.trim()) newErrors.name = "Name is required";
        if (!data.yearOfRelease) newErrors.yearOfRelease = "Year of release is required";
        return newErrors;
    };

    const handleAddMovie = async () => {
        const newErrors = validate(newMovie);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            const payload = {
                ...newMovie,
                yearOfRelease: parseInt(newMovie.yearOfRelease), // Ensure it's a number
                producerId: newMovie.producerId ? parseInt(newMovie.producerId) : undefined, // Convert producerId to number
                actorIds: newMovie.actorIds, // actorIds is already an array of numbers
            };
            await createMovie(payload);
            setNewMovie({ name: "", yearOfRelease: "", plot: "", poster: "", producerId: "", actorIds: [] });
            setErrors({});
            loadData();
        } catch (error) {
            console.error("Error creating movie:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateMovie = async () => {
        if (editMovie) {
            const newErrors = validate(editMovie);
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            try {
                setLoading(true);
                const payload = {
                    ...editMovie,
                    yearOfRelease: parseInt(editMovie.yearOfRelease), // Ensure it's a number
                    producerId: editMovie.producerId ? parseInt(editMovie.producerId) : undefined, // Convert producerId to number
                    actorIds: editMovie.actorIds, // actorIds is already an array of numbers
                };
                await updateMovie(editMovie.id, payload);
                setEditMovie(null);
                setErrors({});
                loadData();
            } catch (error) {
                console.error("Error updating movie:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    // Delete a movie
    const handleDeleteMovie = async (id: number) => {
        try {
            setLoading(true);
            await deleteMovie(id);
            loadData();
        } catch (error) {
            console.error("Error deleting movie:", error);
        } finally {
            setLoading(false);
        }
    };

    // Load data on component mount
    useEffect(() => {
        loadData();
    }, []);

    console.log("movies", movies);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Movies Management</h1>

            {loading && (
                <div className="text-center mb-6">
                    <div className="inline-block w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Add / Edit Movie</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={editMovie ? editMovie.name : newMovie.name}
                            onChange={(e) =>
                                editMovie
                                    ? setEditMovie({ ...editMovie, name: e.target.value })
                                    : setNewMovie({ ...newMovie, name: e.target.value })
                            }
                            className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : "focus:ring focus:ring-blue-200"
                                }`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                        <input
                            type="number"
                            placeholder="Year of Release"
                            value={editMovie ? editMovie.yearOfRelease : newMovie.yearOfRelease}
                            onChange={(e) =>
                                editMovie
                                    ? setEditMovie({ ...editMovie, yearOfRelease: e.target.value })
                                    : setNewMovie({ ...newMovie, yearOfRelease: e.target.value })
                            }
                            className={`w-full p-2 border rounded ${errors.yearOfRelease ? "border-red-500" : "focus:ring focus:ring-blue-200"
                                }`}
                        />
                        {errors.yearOfRelease && <p className="text-red-500 text-sm">{errors.yearOfRelease}</p>}

                        <textarea
                            placeholder="Plot"
                            value={editMovie ? editMovie.plot : newMovie.plot}
                            onChange={(e) =>
                                editMovie
                                    ? setEditMovie({ ...editMovie, plot: e.target.value })
                                    : setNewMovie({ ...newMovie, plot: e.target.value })
                            }
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                        ></textarea>

                        <input
                            type="text"
                            placeholder="Poster URL"
                            value={editMovie ? editMovie.poster : newMovie.poster}
                            onChange={(e) =>
                                editMovie
                                    ? setEditMovie({ ...editMovie, poster: e.target.value })
                                    : setNewMovie({ ...newMovie, poster: e.target.value })
                            }
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                        />

                        <select
                            value={editMovie ? editMovie.producerId : newMovie.producerId}
                            onChange={(e) =>
                                editMovie
                                    ? setEditMovie({ ...editMovie, producerId: e.target.value })
                                    : setNewMovie({ ...newMovie, producerId: e.target.value })
                            }
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                        >
                            <option value="">Select Producer</option>
                            {producers.map((producer) => (
                                <option key={producer.id} value={producer.id}>
                                    {producer.name}
                                </option>
                            ))}
                        </select>

                        <select
                            multiple
                            value={editMovie ? editMovie.actorIds : newMovie.actorIds}
                            onChange={(e) => {
                                const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
                                    parseInt(option.value)
                                );
                                editMovie
                                    ? setEditMovie({ ...editMovie, actorIds: selectedOptions })
                                    : setNewMovie({ ...newMovie, actorIds: selectedOptions });
                            }}
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                        >
                            {actors.map((actor) => (
                                <option key={actor.id} value={actor.id}>
                                    {actor.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={editMovie ? handleUpdateMovie : handleAddMovie}
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            {editMovie ? "Update Movie" : "Add Movie"}
                        </button>
                        {editMovie && (
                            <button
                                onClick={() => setEditMovie(null)}
                                className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Movie List</h2>
                    {movies.map((movie) => (
                        <div key={movie.id} className="p-4 border rounded mb-4 bg-gray-50 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800">{movie.name}</h3>
                            <p className="text-gray-600">Year: {movie.yearOfRelease}</p>
                            <p className="text-gray-600">Plot: {movie.plot}</p>
                            <p className="text-gray-600">Producer: {movie.producer?.name || "Unknown"}</p>
                            <p className="text-gray-600">
                                Actors:{" "}
                                {movie.actors && movie.actors.length > 0
                                    ? movie.actors.map((actorData:any) => actorData.actor.name).join(", ")
                                    : "No actors available"}
                            </p>
                            <div className="flex space-x-2 mt-2">
                                <button
                                    onClick={() => setEditMovie(movie)}
                                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteMovie(movie.id)}
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

export default Movies;
