import axios from "axios"

const apiHandler = async (route, data = {}) => {
    try {
        const token = localStorage.getItem("token")

        const response = await axios({
            method: route.method,
            url: route.url,
            data,
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })

        return response.data
    } catch (err) {
        return { error: true, message: err.response?.data?.message || err.message }
    }
}

export default apiHandler
