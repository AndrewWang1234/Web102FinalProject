import { useEffect, useState } from 'react'
import './App.css'
import Read from './routes/Read'
import { supabase } from './client'

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from('Posts').select();
      setPosts(data);
    }
    fetchPosts();
  }, [])

  return (
    <div>
      <h1>Couch Critics</h1>
      <Read data={posts} />
    </div>
  )
}

export default App
