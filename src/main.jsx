import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './routes/Layout';
import NotFound from './routes/NotFound';
import Create from './routes/Create';
import Update from './routes/Update'
import PostDetail from './routes/PostDetail';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="*" element={<NotFound />}/>
          <Route path="Create" element={<Create />}/>
          <Route path="/edit/:id" element={<Update />}/>
          <Route path="/post/:id" element={<PostDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>    
  </StrictMode>,
)
