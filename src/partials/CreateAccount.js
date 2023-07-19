import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    margin: '0 auto',
    marginTop: theme.spacing(8),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(2),
    '& .MuiInputBase-input': {
      color: '#000', // Set the text color to black
    },
    '& .MuiInputBase-root': {
      backgroundColor: '#fff', // Set the background color to white
    },
  },
  button: {
    marginBottom: theme.spacing(2),
    borderRadius: '20px',
    padding: '10px 24px',
  },
}));

const CreateAccount = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.createUser(username, password);
      // Handle successful account creation
      console.log('Account created successfully');

      // Save userId and userName in local storage
      localStorage.setItem('gebaUserId', response.data.userID);
      localStorage.setItem('gebaUserName', response.data.username);
      window.open('/', '_blank'); // Open in a new tab
    } catch (error) {
      // Handle error during account creation
      console.error('Error creating account:', error);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography variant="h4" className={classes.title}>
        Create Account
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        variant="outlined"
        className={classes.textField}
        fullWidth
      />
      <TextField
        label="Password"
        value={password}
        onChange={handlePasswordChange}
        variant="outlined"
        className={classes.textField}
        fullWidth
        type="password"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        fullWidth
      >
        Create Account
      </Button>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        {/* <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          fullWidth
        >
          Back to Login
        </Button> */}
      </Link>
    </form>
  );
};

export default CreateAccount;
