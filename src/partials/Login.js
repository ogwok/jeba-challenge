import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

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
      color: '#fff',
    },
    '& .MuiInputBase-root': {
      backgroundColor: '#fff',
    },
  },
  button: {
    marginBottom: theme.spacing(2),
    borderRadius: '20px',
    padding: '10px 24px',
  },
}));

const Login = ({ onCreateAccount }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateAccount({ username, password });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography variant="h4" className={classes.title}>
        Login
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
        Login
      </Button>
      <Link to="/create-account" style={{ textDecoration: 'none' }}>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          fullWidth
        >
          Back to Create Account
        </Button>
      </Link>
    </form>
  );
};

export default Login;
