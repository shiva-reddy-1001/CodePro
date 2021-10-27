import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LoginBox = (props) => {
    return (
      <div className="LoginBox">
        <Card >
            <CardContent>
              <h3>Welcome Back! 😎</h3>
              <TextField label="Username"/>
              <br/><br/>
              <TextField label="Password" type="password" />
              <br/><br/>
              <Button variant="outlined">Login</Button>
              <p>New User? <a onClick={props.register}><b>Register</b></a></p>
              </CardContent>
        </Card>
        </div>
      );
}

export default LoginBox;