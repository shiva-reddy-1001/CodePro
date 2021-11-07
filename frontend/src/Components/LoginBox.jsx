import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const LoginBox = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setOpenAlert(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:5000/api/userValidation", {}, {
          "headers": {
            "content-type": "application/json",
            "Authorization": "Bearer " + token,
          },
        })
        .then(res => {

          const userName = res.data.username;
          localStorage.setItem("token", res.data.token);
          window.location.href = 'http://localhost:3000/#/' + userName;
        })
        .catch(err => {
          console.log(err)
        })
    }

  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = JSON.stringify({
      "username": username,
      "password": password
    });

    axios
      .post("http://localhost:5000/api/login", params, {
        "headers": {
          "content-type": "application/json",
        },
      })
      .then(res => {

        localStorage.setItem("username", res.data.username);
        localStorage.setItem("token", res.data.token);
        window.location.href = 'http://localhost:3000/#/' + username;
      })
      .catch(err => setOpenAlert(true));
  };

  return (
    <div className="LoginBox">
      <Card>
        <CardContent>
          <h3>Welcome Back! 😎</h3>
          <TextField label="Username"
            onChange={e => setUsername(e.target.value)}
          />
          <br /><br />
          <TextField label="Password" type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <br /><br />
          <Button variant="outlined" onClick={handleSubmit}>Login</Button>
          <p>New User? <a onClick={props.register}><b>Register</b></a></p>
        </CardContent>
      </Card>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          Please check your username and password!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginBox;