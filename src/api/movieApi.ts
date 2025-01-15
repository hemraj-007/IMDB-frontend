import axiosInstance from "./axiosInstance";

// Fetch all movies
export const fetchMovies = async () => {
    return axiosInstance.get("/movies");
};

// Create a new movie
export const createMovie = async (data: { name: string; yearOfRelease: number; plot?: string; poster?: string; producerId?: number; actorIds?: number[] }) => {
    return axiosInstance.post("/movies", data);
};

// Update a movie
export const updateMovie = async (id: number, data: { name?: string; yearOfRelease?: number; plot?: string; poster?: string; producerId?: number; actorIds?: number[] }) => {
    return axiosInstance.put(`/movies/${id}`, data);
};

// Delete a movie
export const deleteMovie = async (id: number) => {
    return axiosInstance.delete(`/movies/${id}`);
};
