import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Paper,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import api from '../api';

const AppContent = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editBookId, setEditBookId] = useState('');
  const [bookId, setBookId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);

      // Simulated API call
      const response = await api.getBooks();

      setBooks(response?.data?.books);
      setIsLoading(false);
    } catch (error) {
      console.error('Error retrieving books:', error);
      setIsLoading(false);
    }
  };

  const handleFetchAllBooks = () => {
    fetchBooks();
  };

  const handleSelectAllBooks = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map((book) => book.isbn));
    }
  };

  const handleBookSelection = (bookId) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  const handleDeleteSelectedBooks = () => {
    console.log('Delete Selected Books:', selectedBooks);
    setSelectedBooks([]);
    setDeleteConfirmationOpen(false);
  };

  const handleEditBook = (bookId) => {
    setEditBookId(bookId);
  };

  const handleSaveBookTitle = (bookId) => {
    console.log('Save Book Title:', bookId);
    setEditBookId('');
  };

  const handleDeleteBook = (bookId) => {
    console.log('Delete Book:', bookId);
  };

  const handleCreateDialogOpen = () => {
    setCreateDialogOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  };

  const handleCreateBook = () => {
    console.log('New Book Title:', newBookTitle);
    setCreateDialogOpen(false);
  };

  const handleRetrieveBook = async () => {
    try {
      const response = await api.getBook(bookId);
      setBooks([response.data]);
      console.log('book', response);
    } catch (error) {
      console.error('Error retrieving book:', error);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <Container maxWidth="md" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <TextField
            label="Book ID"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            style={{ flex: 1, marginRight: 16 }}
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleRetrieveBook}>
            Retrieve Book
          </Button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Button
            variant="contained"
            color="secondary"
            disabled={selectedBooks.length === 0}
            onClick={() => setDeleteConfirmationOpen(true)}
            style={{ marginRight: 16 }}
          >
            Delete Selected
          </Button>
          <Button sx={{ mr: 2 }} variant="contained" color="primary" onClick={handleFetchAllBooks}>
            Get All Books
          </Button>
          <Button variant="contained" color="primary" onClick={handleCreateDialogOpen}>
            Add Book
          </Button>
        </div>

        <TableContainer component={Paper} style={{ flexGrow: 1 }}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleSelectAllBooks}
                      startIcon={selectedBooks.length === books?.data?.books.length ? <CheckIcon /> : null}
                    >
                      {selectedBooks.length === books?.data?.books.length ? 'Deselect All' : 'Select All'}
                    </Button>
                  </TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books?.map((book) => (
                  <TableRow key={book.isbn}>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleBookSelection(book.isbn)}
                        startIcon={selectedBooks.includes(book.isbn) ? <CheckIcon /> : null}
                      >
                        {selectedBooks.includes(book.isbn) ? 'Selected' : 'Select'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {editBookId === book.isbn ? (
                        <TextField
                          size="small"
                          value={book.title}
                          onChange={(e) => {
                            setBooks((prevBooks) =>
                              prevBooks.map((prevBook) =>
                                prevBook.isbn === book.isbn ? { ...prevBook, title: e.target.value } : prevBook
                              )
                            );
                          }}
                          onBlur={() => handleSaveBookTitle(book.isbn)}
                          fullWidth
                        />
                      ) : (
                        book.title
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="Edit" color="primary" onClick={() => handleEditBook(book.isbn)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        color="secondary"
                        onClick={() => handleDeleteBook(book.isbn)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete the selected books?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmationOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteSelectedBooks} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={createDialogOpen} onClose={handleCreateDialogClose}>
          <DialogTitle>Create New Book</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              variant="outlined"
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateDialogClose}>Cancel</Button>
            <Button onClick={handleCreateBook} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default AppContent;
