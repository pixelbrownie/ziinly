import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BookLibrary from './components/BookLibrary';
import ScrapbookEditor from './components/ScrapbookEditor';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/library" element={<BookLibrary />} />
        <Route path="/editor/:bookId" element={<ScrapbookEditor />} />
      </Routes>
    </div>
  );
}

export default App;
