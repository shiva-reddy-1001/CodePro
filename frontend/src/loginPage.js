import React from "react";
import "./index.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Content from './Components/Content'
import LoginBox from "./Components/LoginBox";

const LoginPage = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >
                <Toolbar variant="dense" className="appbar">
                {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                    CodePro
                </Typography>
                <Button color="inherit">About</Button>
                <Button color="inherit">Contact Us</Button>
                </Toolbar>
            </AppBar>
        <div className="LoginGrid">
            <Grid container spacing={2} height="100%">
                <Grid item xs={12} md={6} lg={6}>
                    <Content />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <LoginBox />
                </Grid>
            </Grid>
        </div>
      {/* <AppBar position="static" color="primary">
        <Container>
            <Toolbar>
              <Typography variant="body1" color="inherit" className="footer">
                © 2021 
              </Typography>
            </Toolbar>
        </Container>
      </AppBar> */}
      <footer>
          <Box>
            © 2021
          </Box>
      </footer>
    </Box>
        </div>
    );
};

export default LoginPage;