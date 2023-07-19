import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './partials/Home';
import Layout from './layout';
import Login from './partials/Login';
import CreateAccount from './partials/CreateAccount';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a3744',
    },
  },
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if userId exists in local storage
    
    const userId = localStorage.getItem('gebaUserId');
    if (userId) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    window.location.reload(); // Reload the page on logout
  };

  const handleLogout = () => {
    setLoggedIn(false);
    window.location.reload(); // Reload the page on logout
  };

  return (
    <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {!loggedIn ? (
              <Route path="/*" element={<Layout />}>
                <Route index element={<CreateAccount onLogin={handleLogin} />} />
              </Route>
            ) : (
              <Route path="/" element={<Layout />}>
                <Route index element={<Home onLogout={handleLogout} />} />
              </Route>
            )}
            <Route path="/create-account" element={<Layout />}>
              <Route index element={<CreateAccount />} />
            </Route>
            <Route path="/login" element={<Layout />}>
              <Route index element={<Login onLogin={handleLogin} />} />
            </Route>
          </Routes>
        </ThemeProvider>
    </Router>
  );
}

export default App;
