import React, { useState } from 'react';
import { supabase } from '../client';
import './Card.css'
import { Link } from 'react-router-dom'
import more from './more.png'

const Card = ({ movieId, movieTitle, rating, review, likes, imageUrl, createdAt }) => {
    const [likeCount, setLikeCount] = useState(likes);
    const [hasLiked, setHasLiked] = useState(false);

    const handleLike = async () => {
        if (!hasLiked) {
            setLikeCount(likeCount + 1);
            setHasLiked(true);

            const { data } = await supabase.from('Posts').update({likes: likeCount + 1}).eq('id', movieId); 
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) {
            console.error('Invalid timestamp:', timestamp);
            return 'Invalid Date';  // Return a fallback message or value if the timestamp is invalid
        }
    
        // Ensure it's in the correct format (ISO 8601)
        const cleanedTimestamp = timestamp.split('.')[0]; // Remove microseconds if present
        const date = new Date(cleanedTimestamp);
        
        // Check if the date object is invalid
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
    
        return date.toLocaleTimeString(); // Format the time as needed
    };

    console.log(formatDate(createdAt))
    

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    return (
        <Link to={`/post/${movieId}`} className='card-link'>
            <div className="card">
                <Link to={'edit/'+ movieId}><img className="moreButton" alt="edit button" src={more} /></Link>
                {/* {imageUrl ? (
                    <img className="movieImage" src={imageUrl} alt={movieTitle} />
                ) : null} */}
                <h1>{movieTitle}</h1>
                <p>Created at: {formatDate(createdAt)}</p>
                {/* <p>{renderStars(rating)}</p> */}
                {/* <p>{review}</p>
                <button onClick={handleLike} disabled={hasLiked}>
                    {hasLiked ? 'Liked' : 'Like'}
                </button> */}
                <span>Likes: {likeCount}</span>
            </div>
        </Link>
    );
};

export default Card;