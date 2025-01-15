import axiosInstance from "./axiosInstance";

// Fetch all producers
export const fetchProducers = async () => {
    return axiosInstance.get("/producers");
};

// Create a new producer
export const createProducer = async (data: { name: string; gender: string; dob: string; bio?: string }) => {
    return axiosInstance.post("/producers", data);
};

// Update a producer
export const updateProducer = async (id: number, data: { name?: string; gender?: string; dob?: string; bio?: string }) => {
    return axiosInstance.put(`/producers/${id}`, data);
};

// Delete a producer
export const deleteProducer = async (id: number) => {
    return axiosInstance.delete(`/producers/${id}`);
};
