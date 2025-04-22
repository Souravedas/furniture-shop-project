import React, { useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../navs/Navbar"
import { Outlet } from "react-router"
import Footer from "../Footer"
import { ToastContainer, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "react-confirm-alert/src/react-confirm-alert.css";

const MainLayout = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const aboutRef = useRef(null)
    const contactRef = useRef(null)

    const scrollToAbout = () => {
        if (location.pathname === "/") {
            setTimeout(() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }, 100)
        } else {
            navigate("/", { state: { scrollTo: "about" } })
        }
    }

    const scrollToContact = () => {
        if (location.pathname === "/") {
            setTimeout(() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }, 100)
        } else {
            navigate("/", { state: { scrollTo: "contact" } })
        }
    }


    const hideFooter =
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/forgot-password" ||
        location.pathname === "/verify-email-success" ||
        location.pathname === "/admin" ||
        location.pathname === "/admin/users" ||
        location.pathname === "/admin/messages" ||
        location.pathname === "/admin/add-furniture"

    const hideNavbar = location.pathname === "/verify-email-success"

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
            {!hideNavbar && <Navbar scrollToAbout={scrollToAbout} scrollToContact={scrollToContact} />}
            <Outlet context={{ aboutRef, contactRef }} />
            {!hideFooter && <Footer scrollToAbout={scrollToAbout} scrollToContact={scrollToContact} />}
        </>
    )
}
export default MainLayout
