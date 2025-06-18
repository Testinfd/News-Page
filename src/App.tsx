import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsFeedPage from './NewsFeedPage';
import ArticlePage from './ArticlePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NewsFeedPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
