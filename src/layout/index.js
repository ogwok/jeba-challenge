import React from "react";
import { Outlet } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import UserComponent from "../partials/User";

const Layout = () => {
  return (
    <Stack>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jeba Challenge
          </Typography>
          <UserComponent />
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Stack>
  );
};

export default Layout;
