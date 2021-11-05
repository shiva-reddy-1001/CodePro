import React,{useState,useEffect} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'

const LoginBox = (props) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("username");
    if(token && userName){
      const params = JSON.stringify({
        "username": userName,
        "token": token
      });
      axios
        .post("http://localhost:5000/api/userValidation", params, {
          "headers": {
            "content-type": "application/json",
          },
        })
        .then(res => {
          if(res.data!==false){
            localStorage.setItem("token",res.data.token);
            window.location.href = 'http://localhost:3000/#/'+userName;
          }
        })
    }
    
  })

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        },})
      .then(res => {
        localStorage.setItem("username", res.data.username);  
        localStorage.setItem("token", res.data.token);
        window.location.href = 'http://localhost:3000/#/'+username;
      })
      .catch(err => console.error(err));
  };

    return (
      <div className="LoginBox">
        <Card>
            <CardContent>
              <h3>Welcome Back! 😎</h3>
              <TextField label="Username"
                onChange={e => setUsername(e.target.value)}
              />
              <br/><br/>
              <TextField label="Password" type="password" 
                onChange={e => setPassword(e.target.value)}
              />
              <br/><br/>
              <Button variant="outlined" onClick={handleSubmit}>Login</Button>
              <p>New User? <a onClick={props.register}><b>Register</b></a></p>
              </CardContent>
        </Card>
        </div>
      );
}

export default LoginBox;