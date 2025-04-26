import { supabase } from '../client'
import { useParams } from 'react-router-dom'
import './Update.css'
import { useState, useEffect } from 'react'

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


const Update = ({data}) => {
    const [rating, setRating] = useState(0);
    const {id} = useParams();
    const [post, setPost] = useState({id: null, movieTitle: "", rating: 0, review: "", likes: "", imageUrl: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost ( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase.from('Posts').update({ movieTitle: post.movieTitle, rating: post.rating, review: post.review, imageUrl: post.imageUrl}).eq('id', id);
        window.location = "/";
    }

    const deletePost = async(event) => {
        event.preventDefault();
        await supabase.from('Posts').delete().eq('id', id);
        window.location = "http://localhost:5174/";
    }

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase.from('Posts').select().eq('id', id).single();
        
        if (error) {
            console.error(error);
        } else {
            setPost(data)
            setRating(data.rating);
        }
    };
    fetchPost();
    }, [id])


    return (
        <div>
            <h1>Movie Review</h1>
            <form>
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
                <button type="submit" onClick={updatePost}>Submit</button>
                <button className='deleteButton' onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default Update