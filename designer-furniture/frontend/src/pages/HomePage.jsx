import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";
import ImageSlider from "../components/ImageSlider";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import ProductSection from "../components/ProductSection";

const HomePage = () => {
	const [images, setImages] = useState([]);
	const location = useLocation();

	// ✅ Get refs from MainLayout
	const { aboutRef, contactRef } = useOutletContext();

	useEffect(() => {
		const fetchSliderImages = async () => {
			try {
				const lastCategory = localStorage.getItem("lastSearchedCategory") || "all"; // ✅ Get stored category
				const response = await axios.get(
					lastCategory === "all" ? "/api/furniture" : `/api/furniture?category=${encodeURIComponent(lastCategory)}`
				);
				setImages(response.data.map((item) => item.image).slice(0, 5)); // ✅ Show only 5 images
			} catch (error) {
				console.error("Error fetching images:", error);
			}
		};
	
		fetchSliderImages();
	}, []);
	

	// ✅ Scroll when coming from another page
	useEffect(() => {
		if (location.state?.scrollTo === "about") {
			aboutRef.current?.scrollIntoView({ behavior: "smooth" });
		}
		if (location.state?.scrollTo === "contact") {
			contactRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [location]);

	return (
		<div>
			{/* Image Slider */}
			<ImageSlider images={images} />

			{/* About Section */}
			<AboutSection aboutRef={aboutRef} />

			{/* Product Section */}
			<ProductSection />

			{/* Contact Section */}
			<ContactSection contactRef={contactRef} />
		</div>
	);
};

export default HomePage;
