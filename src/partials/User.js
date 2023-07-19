import React from 'react';
import { Button, Avatar, MenuItem, Menu, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
    cursor: 'pointer',
  },
}));

const UserComponent = ({ user, onDeleteUser }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear the user data and redirect to the home page in a new tab
    localStorage.removeItem('gebaUserId');
    localStorage.removeItem('gebaUserName');
    window.open('/', '_blank');
  };

  return (
    <div>
      <Tooltip title="Click to reveal options" placement="bottom">
        <Avatar
          className={classes.avatar}
        //  src="https://example.com/avatar.jpg" // Replace with the actual URL of the avatar image
          alt={user?.name}
          onClick={handleMenuOpen}
        />
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserComponent;
