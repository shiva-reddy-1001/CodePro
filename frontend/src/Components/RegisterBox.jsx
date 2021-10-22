import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const RegisterBox = () => {
    return (
      <div className="LoginBox">
        <Card >
            <CardContent>
              <h3>Join Us! 😎</h3>
              <TextField label="Email"/>
              <br/><br/>
              <TextField label="Full Name"/>
              <br/><br/>
              <TextField label="Username"/>
              <br/><br/>
              <TextField label="Password" type="password" />
              <br/><br/>
              <TextField label="Check Password" type="password" />
              <br/><br/>
              <Button variant="outlined">Login</Button>
              <p>New User? <a href="www.google.com"><b>Register</b></a></p>
              </CardContent>
        </Card>
        </div>
      );
}

export default RegisterBox;