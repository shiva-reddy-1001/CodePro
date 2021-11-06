import Box from '@mui/material/Box';
import React,{useState} from "react";
import Toolbar from '@mui/material/Toolbar';
import { Button,TextField} from '@mui/material';
import { useParams } from 'react-router';
import Popup from 'reactjs-popup';
import axios from 'axios';


const NavBar = () => {
    const [name, setName] = useState('');
    const {username} = useParams();
    const token  = localStorage.getItem("token");
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = 'http://localhost:3000/#/';
    }
    const handleNewproject = () => {
        if(username){
            const params = JSON.stringify({
                "username": username,
                "name": name
              });
              axios
                .post("http://localhost:5000/api/newProject", params, {
                "headers": {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                })
                .then(res => {
                    window.location.href = 'http://localhost:3000/#/projects/'+res.data.id;
                })
        }
    }
    return (
        <div className="Navbar">
            <Box sx={{ flexGrow: 1 }}>
                    <Toolbar variant="dense">
                    <h1>{"<CodePro/>"}</h1>
                    
                    <div className="homebuttons">
                    <Popup trigger={<Button variant="contained" component="span">New Project</Button>} position="bottom">
                        <div>
                            <TextField type="text" placeholder="Name of Project" variant="outlined" color="warning"
                            onChange={(e)=>setName(e.target.value)}/>
                            <br/>
                            <Button variant="text" onClick={handleNewproject}>Create</Button>
                        </div>
                        {/* <textarea label="name"
                            onChange={e => setName(e.target.value)}
                        /> */}
                    </Popup>
                    
                    <Popup trigger={<Button color="secondary">Hi {username}!</Button>} position="bottom">
                        <Button variant="text" onClick={handleLogout}>LogOut</Button>
                    </Popup>

                    </div>
                    </Toolbar>
            </Box>
        </div>
    );
} 

export default NavBar;