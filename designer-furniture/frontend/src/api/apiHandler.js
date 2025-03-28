import axios from "axios"

const apiHandler = async (route, data = {}) => {
    try {
        const options = {
            url: route.url,
            method: route.method,
            data: data
        }

        const response = await axios(options)
        const responseResult = response?.data

        return responseResult

    } catch (error) {
        console.log(error)
        const message = error?.response?.data
        if (message){
            alert(message?.message)
        }
        else{
            alert("An error occurred while trying to perform the requested operation.")
        }
        return false
    }
}

export default apiHandler