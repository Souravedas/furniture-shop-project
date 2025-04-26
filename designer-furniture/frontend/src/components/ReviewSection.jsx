import React, { useState, useContext, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

const ReviewSection = () => {
    const { user } = useContext(AuthContext)
    const [rating, setRating] = useState(5)
    const [content, setContent] = useState("")
    const Navigate = useNavigate()

    const [allReviews, setAllReviews] = useState([])
    const [currentReview, setCurrentReview] = useState(0)
    const [fade, setFade] = useState(false)

    const touchStartX = useRef(0)
    const touchEndX = useRef(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            Navigate("/login")
            toast.error("Please login to submit a review.")
            return
        }
        try {
            await axios.post("/api/users/review", { rating, content }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            toast.success("Review submitted successfully!")
            setContent("")
            setRating(5)
        } catch (error) {
            toast.error("Failed to submit review.")
        }
    }

    // Fetch reviews
    const fetchReviews = async () => {
        try {
            const res = await axios.get("/api/users/reviews")

            const latestReviewPerUser = {}

            res.data.forEach((review) => {
                const key = review.name
                if (!latestReviewPerUser[key] || new Date(review.createdAt) > new Date(latestReviewPerUser[key].createdAt)) {
                    latestReviewPerUser[key] = review
                }
            })

            const uniqueLatestReviews = Object.values(latestReviewPerUser)

            // Shuffle the reviews randomly
            const shuffled = uniqueLatestReviews.sort(() => Math.random() - 0.5)

            setAllReviews(shuffled)
        } catch (error) {
            console.error("Error fetching reviews", error)
        }
    }


    useEffect(() => {
        fetchReviews()
    }, [])

    // Fade animation
    const changeReview = (index) => {
        setFade(true)
        setTimeout(() => {
            setCurrentReview(index)
            setFade(false)
        }, 400)
    }

    const nextReview = () => {
        changeReview((currentReview + 1) % allReviews.length)
    }

    const prevReview = () => {
        changeReview((currentReview - 1 + allReviews.length) % allReviews.length)
    }

    // Auto-slide reviews
    useEffect(() => {
        const interval = setInterval(nextReview, 5000)
        return () => clearInterval(interval)
    }, [currentReview, allReviews.length])

    // Handle touch swipe
    const handleTouchStart = (e) => {
        touchStartX.current = e.changedTouches[0].clientX
    }

    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].clientX
        if (touchStartX.current - touchEndX.current > 50) {
            nextReview()
        }
        if (touchStartX.current - touchEndX.current < -50) {
            prevReview()
        }
    }

    return (
        <section className="review-section">
            <h1>What Our Customers Say</h1>

            {/* Floating Elements */}
            <div className="floating-element star">⭐</div>
            <div className="floating-element quote">❝</div>
            <div className="review-form-container">
                <h3>Leave a Review</h3>
                <form onSubmit={handleSubmit} className="review-form">
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <i
                                key={star}
                                className={`fa-star ${star <= rating ? "fas" : "far"}`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>

                    <div className="form-group">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your review here..."
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">Submit Review</button>
                </form>
            </div>
            {/* Carousel */}
            <div className="review-carousel">
                {allReviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    <div
                        className="carousel-container"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <button className="carousel-btn left" onClick={prevReview}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>

                        <div className={`review-card ${fade ? "fade" : ""}`} key={allReviews[currentReview]?.createdAt}>
                            <div className="avatar">
                                <div className="initials">
                                    {allReviews[currentReview]?.name
                                        .split(" ")
                                        .map(n => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </div>
                            </div>
                            <div className="quote-icon">❝</div>
                            <h3>{allReviews[currentReview]?.name}</h3>
                            <div className="stars">
                                {[...Array(5)].map((_, index) => (
                                    <i
                                        key={index}
                                        className={`fa-star ${index < allReviews[currentReview]?.rating ? "fas filled" : "far"}`}
                                    />
                                ))}
                            </div>

                            <p className="content">"{allReviews[currentReview]?.content}"</p>
                            <small>{new Date(allReviews[currentReview]?.createdAt).toLocaleDateString()}</small>
                        </div>

                        <button className="carousel-btn right" onClick={nextReview}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                )}

                {/* Dots under carousel */}
                <div className="carousel-dots">
                    {allReviews.map((_, index) => (
                        <span
                            key={index}
                            className={currentReview === index ? "dot active" : "dot"}
                            onClick={() => changeReview(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ReviewSection
