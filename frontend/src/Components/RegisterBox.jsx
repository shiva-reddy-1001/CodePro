import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const RegisterBox = (props) => {
    return (
      <div className="RegisterBox">
        <Card >
            <CardContent>
              <h3>Join Us! 😎</h3>
              <TextField label="Email"/>
              &emsp;
              <TextField label="Username"/>
              <br/><br/>
              <TextField label="First Name"/>
              &emsp;
              <TextField label="Last Name"/>
              <br/><br/>  
              <TextField label="Password" type="password" />
              &emsp;
              <TextField label="Check Password" type="password" />
              <br/><br/>
              <Button variant="outlined">Register</Button>
              <p>Existing User? <a onClick={props.login}><b>Login</b></a></p>
              </CardContent>
        </Card>
        </div>
      );
}

export default RegisterBox;