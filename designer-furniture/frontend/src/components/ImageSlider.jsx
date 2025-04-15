import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const ImageSlider = ({ images }) => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 800,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		fade: true,
		cssEase: "linear",
	}

	return (
		<div className="slider-container">
			<Slider {...settings}>
				{images.map((image, index) => (
					<div key={index} className="slide">
						<img src={image} alt={`Slide ${index + 1}`} className="slide-image" />
						<div className="slider-text">
							<h1>Discover Elegance in Every Design</h1>
							<p>Find the perfect designer furniture for your space.</p>
						</div>
					</div>
				))}
			</Slider>
			<div className="scroll-button" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}>
				⬇ Scroll Down
			</div>
		</div>
	)
}

export default ImageSlider
