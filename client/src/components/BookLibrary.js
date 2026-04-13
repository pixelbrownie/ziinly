import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './BookLibrary.css';

const BookLibrary = () => {
  const [books, setBooks] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBookName, setNewBookName] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const createBook = async () => {
    if (!newBookName.trim()) return;
    
    try {
      const response = await axios.post('/api/books', { name: newBookName });
      setBooks([response.data, ...books]);
      setNewBookName('');
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const openBook = (bookId) => {
    navigate(`/editor/${bookId}`);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleBookDoubleClick = (book) => {
    openBook(book._id);
  };

  return (
    <div className="book-library">
      <div className="library-header">
        <h1>My Memory Books</h1>
        <motion.button
          className="add-book-btn"
          onClick={() => setShowCreateModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          + New Book
        </motion.button>
      </div>

      <div className="books-container">
        {books.length === 0 ? (
          <div className="empty-state">
            <h2>No books yet</h2>
            <p>Create your first memory book to get started!</p>
          </div>
        ) : (
          books.map((book, index) => (
            <motion.div
              key={book._id}
              className={`book-card ${selectedBook?._id === book._id ? 'focused' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => handleBookClick(book)}
              onDoubleClick={() => handleBookDoubleClick(book)}
            >
              <div className="book-cover">
                <div className="book-spine"></div>
                <div className="book-pages">
                  <div className="page left-page"></div>
                  <div className="page right-page"></div>
                </div>
                <div className="book-title">{book.name}</div>
              </div>
              <div className="book-info">
                <p>{book.pages?.length || 1} pages</p>
                <small>{new Date(book.createdAt).toLocaleDateString()}</small>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {showCreateModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Create New Book</h2>
            <input
              type="text"
              placeholder="Enter book name..."
              value={newBookName}
              onChange={(e) => setNewBookName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createBook()}
              autoFocus
            />
            <div className="modal-buttons">
              <button onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button onClick={createBook} className="create-btn">Create</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BookLibrary;
