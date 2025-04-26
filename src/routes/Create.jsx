import {Outlet, Link } from "react-router-dom";
import { useState } from "react";
import './Create.css'
import { supabase } from '../client'

function StarRating({ rating, setRating }) {
    const [hovered, setHovered] = useState(0);

    return (
        <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`star ${star <= (hovered || rating) ? "selected" : ""}`} onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)} onClick={() => setRating(star)}>
                    &#9733;
                </span>
            ))}
        </div>
    );
}



function Create() {
    const [rating, setRating] = useState(0);


    const [post, setPost] = useState({movieTitle: "", rating: 0, review: "", likes: 0, imageUrl: ""})

    const createPost = async (event) => {
        event.preventDefault();
        console.log("Submitting post:", { ...post, rating });
        const { data, error } = await supabase
          .from('Posts')
          .insert({movieTitle: post.movieTitle, rating: rating, review: post.review, likes: 0, imageUrl: post.imageUrl})
          .select();
        if (error) {
            console.error("Insert error:", error);
            return;
        }

        console.log("Insert success:", data);
        window.location = "/";

      }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <h1>Movie Review</h1>
            <form onSubmit={createPost}>
                <div>
                    <label htmlFor="movieTitle">Movie Title:</label>
                    <input type="text" id="movieTitle" name="movieTitle" placeholder="Enter movie title" value={post.movieTitle} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="imageUrl">Image URL (optional):</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="https://example.com/image.jpg" value={post.imageUrl} onChange={handleChange}/>
                </div>
                <div>
                    <label>Stars:</label>
                    <StarRating rating={rating} setRating={setRating} />
                </div>
                <div>
                    <label htmlFor="movieReview">Review:</label>
                    <textarea id="movieReview" name="review" rows="5" placeholder="Write your review here" value={post.review} onChange={handleChange}></textarea>
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    )
}

export default Create
