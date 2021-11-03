import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'
const RegisterBox = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && username && firstName && lastName && password){
      const params = JSON.stringify({
        "username": username,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "password": password
      });
  
      axios
        .post("http://localhost:5000/api/register", params, {
          "headers": {
            "content-type": "application/json",
          },})
        .then(res => {
          console.log(res);
        })
        .catch(err => console.error(err));
    }
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
                  onChange={e => setPassword(e.target.value)}
              />
              &emsp;
              <TextField label="Check Password" type="password" />
              <br/><br/>
              <Button variant="outlined" onClick={handleSubmit}>Register</Button>
              <p>Existing User? <a onClick={props.login}><b>Login</b></a></p>
              </CardContent>
        </Card>
        </div>
      );
}

export default RegisterBox;