import React, { useState } from "react";
import "./index.css"
import Grid from '@mui/material/Grid';
import Content from './Components/Content'
import LoginBox from "./Components/LoginBox";
import NavBar from "./Components/Navbar";
import Footer from "./Components/Footer";
import RegisterBox from "./Components/RegisterBox";

const LoginPage = () => {

    const [loginMode, setLoginMode] = useState(false)
    const switchMode = () => {
        setLoginMode(!loginMode);
    }
    return (
        <>
            <NavBar></NavBar>
            <div className="LoginGrid">
                <Grid container spacing={2} height="100%">
                    <Grid item xs={12} md={6} lg={6}>
                        <Content></Content>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        {!loginMode ? <LoginBox register={switchMode} /> :
                            <RegisterBox login={switchMode}></RegisterBox>}
                    </Grid>
                </Grid>
            </div>
            <Footer></Footer>
        </>
    );
};

export default LoginPage;