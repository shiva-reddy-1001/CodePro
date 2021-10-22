import React from "react";
import "./index.css"
import Grid from '@mui/material/Grid';
import Content from './Components/Content'
import LoginBox from "./Components/LoginBox";
import NavBar from "./Components/Navbar";
import Footer from "./Components/Footer";
import RegisterBox from "./Components/RegisterBox";


const LoginPage = () => {
    return (
        <div>
        <NavBar></NavBar>
        <div className="LoginGrid">
            <Grid container spacing={2} height="100%">
                <Grid item xs={12} md={6} lg={6}>
                    <Content></Content>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <LoginBox />
                    {/* <RegisterBox></RegisterBox> */}
                </Grid>
            </Grid>
        </div>
        <Footer></Footer>
        </div>
    );
};

export default LoginPage;