import axios from "axios";

const apiHandler = async (route, data = {}) => {
    try {
        const response = await axios({
            url: route.url,
            method: route.method,
            data: data,
        });

        return response?.data;
    } catch (error) {
        const message = error?.response?.data?.message || "An error occurred";
        return { error: true, message };
    }
};

export default apiHandler;
