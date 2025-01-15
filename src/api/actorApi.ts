import axiosInstance from "./axiosInstance";

// Fetch all actors
export const fetchActors = async () => {
    return axiosInstance.get("/actors");
};

// Create a new actor
export const createActor = async (data: { name: string; gender: string; dob: string; bio?: string }) => {
    return axiosInstance.post("/actors", data);
};

// Update an actor
export const updateActor = async (id: number, data: { name?: string; gender?: string; dob?: string; bio?: string }) => {
    return axiosInstance.put(`/actors/${id}`, data);
};

// Delete an actor
export const deleteActor = async (id: number) => {
    return axiosInstance.delete(`/actors/${id}`);
};
