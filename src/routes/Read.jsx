import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';

const Read = (props) => {
    const [posts, setPosts] = useState([]);
    const [sortOption, setSortOption] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('desc'); // Add a state to handle ascending or descending
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch posts from Supabase when component mounts
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .order(sortOption, { ascending: sortOrder === 'asc' }); // Dynamically use ascending/descending

            if (error) {
                console.error("Error fetching posts:", error);
            } else {
                setPosts(data); // Update state with fetched posts
            }
        };

        fetchPosts();
    }, [sortOption, sortOrder]); // Re-run when either sortOption or sortOrder changes

    const filteredPosts = posts.filter(post =>
        post.movieTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="ReadPosts">
            <div className="sort-options">
                <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                    <option value="created_at">Sort by Creation Time</option>
                    <option value="likes">Sort by Upvotes</option>
                </select>
                <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                    <Card
                        key={post.id}
                        movieId={post.id}
                        movieTitle={post.movieTitle}
                        rating={post.rating}
                        review={post.review}
                        likes={post.likes}
                        imageUrl={post.imageUrl}
                        createdAt={post.created_at} // Make sure to pass createdAt
                    />
                ))
            ) : (
                <h2>{'No Challenges Yet 😞'}</h2>
            )}
        </div>
    );
};

export default Read;
