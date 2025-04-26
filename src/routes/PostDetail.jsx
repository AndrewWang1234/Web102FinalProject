import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import more from '../components/more.png'; // Ensure to import the image if needed

const PostDetail = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null); // Store post data
    const [likeCount, setLikeCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    // Fetch the post when the component mounts
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single(); // Fetch a single post

            if (error) {
                console.error("Error fetching post:", error);
            } else {
                setPost(data); // Update state with the post data
                setLikeCount(data.likes);
            }
        };

        fetchPost(); // Fetch the post based on ID
    }, [id]); // Re-fetch when `id` changes

    // Return a loading message until post is fetched
    if (!post) return <div>Loading...</div>;

    // Helper functions to format date and render stars
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Format the date as a string
    };

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating); // Render stars based on rating
    };

    
        const handleLike = async () => {
            if (!hasLiked) {
                setLikeCount(likeCount + 1);
                setHasLiked(true);
    
                const { data } = await supabase.from('Posts').update({likes: likeCount + 1}).eq('id', post.id); 
            }
        };

    // Once the post is fetched, render the post details
    return (
        <div className="card">
            {/* Conditional rendering to ensure post is loaded before using its properties */}
            <Link to={`/edit/${post.id}`}>
                <img className="moreButton" alt="edit button" src={more} />
            </Link>
            {post.imageUrl && <img className="movieImage" src={post.imageUrl} alt={post.movieTitle} />}
            <h1>{post.movieTitle}</h1>
            <p>Created at: {formatDate(post.created_at)}</p>
            <p>{renderStars(post.rating)}</p>
            <p>{post.review}</p>
                <button onClick={handleLike} disabled={hasLiked}>
                    {hasLiked ? 'Liked' : 'Like'}
                </button>
            <span>Likes: {likeCount}</span>
        </div>
    );
};

export default PostDetail;
