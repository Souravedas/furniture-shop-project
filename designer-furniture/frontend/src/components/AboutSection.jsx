import React from 'react'

const AboutSection = ({aboutRef}) => {

	return (
		<div>

			<section className="about my-section" id="about" ref={aboutRef}>
				<div className="container">
					<div className="section-title">
						<h2>About Us</h2>
					</div>

					<div className="inner-wrapper">
						<div className="left-side">
							<div className="about-img">
								<img src="https://assets.timothyoulton.com/images/block-square_med/126432-30961-arc-poker-table-detail-1.jpg" alt="Modern furniture showroom" />
							</div>
						</div>

						<div className="right-side">
							<h3>Welcome to EliteFurnish</h3>
							<p>
								At <strong>EliteFurnish</strong>, we believe that <em>furniture is more than just decor</em>—it's a reflection of style, comfort, and personality.
								Our platform connects you with a curated selection of <strong>high-quality designer furniture</strong>, making it easy to find the perfect piece for your home.
							</p>

							<p>
								<strong>🌟 Why Choose EliteFurnish?</strong><br />
								✔ <strong>Curated Collection</strong> – We showcase only the finest <em>sofas, tables, chairs, and cushions</em> from leading designers.<br />
								✔ <strong>Smart Search & Compare</strong> – Find furniture by category and compare details effortlessly.<br />
								✔ <strong>Seamless Experience</strong> – Simple navigation, smooth search algorithms, and a user-friendly interface.<br />
								✔ <strong>Verified Listings</strong> – We work with <em>trusted brands</em> to ensure authenticity and quality.
							</p>

							<p>
								Whether you're looking for a <strong>luxury sofa for your living room</strong>, a <strong>modern dining table</strong>, or a <strong>comfortable designer chair</strong>,
								EliteFurnish makes it easier to find what you need.
							</p>

							<p><strong>🌍 Start Exploring Today!</strong></p>
						</div>
					</div>
				</div>
			</section>

		</div>
	)
}

export default AboutSection
