const baseUrl = "http://localhost:5123"

// paths
const auth = "auth"
const profile = "profile"

// methods
const GET = "GET"
const POST = "POST"
const PATCH = "PATCH"
const DELETE_METHOD = "DELETE"

const routeMaker = (paths, route, method) => {
    return {
        url: `${baseUrl}/api/${paths}/${route}`,
        method: method,
    }
}

// auth routes
const authRoutes = {
    login: routeMaker(auth, "login", POST),
    register: routeMaker(auth, "register", POST),
}

export {
    baseUrl,
    authRoutes
}