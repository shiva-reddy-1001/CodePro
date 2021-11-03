import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const bcrypt = require("bcrypt");
const saltRounds = 10;
const RegisterBox = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    
  }
    return (
      <div className="RegisterBox">
        <Card >
            <CardContent>
              <h3>Join Us! 😎</h3>
              <TextField label="Email"
                  onChange={e => setEmail(e.target.value)}
              />
              &emsp;
              <TextField label="Username"
                  onChange={e => setUsername(e.target.value)}
              />
              <br/><br/>
              <TextField label="First Name"
                  onChange={e => setFirstName(e.target.value)}
              />
              &emsp;
              <TextField label="Last Name"
                  onChange={e => setLastName(e.target.value)}
              />
              <br/><br/>  
              <TextField label="Password" type="password" 
                  onChange={e => setPassword(bcrypt.hash(e.target.value, saltRounds))}
              />
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