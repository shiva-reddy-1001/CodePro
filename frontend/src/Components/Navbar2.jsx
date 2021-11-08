import Box from '@mui/material/Box';
import React, { useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import { Button, TextField } from '@mui/material';
import { useParams } from 'react-router';
import Popup from 'reactjs-popup';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const NavBar = () => {
    const [name, setName] = useState('');
    const { username } = useParams();
    const token = localStorage.getItem("token");
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/#/';
    }
    const handleNewproject = () => {
        if (username) {
            const params = JSON.stringify({
                "username": username,
                "name": name
            });
            axios
                .post("/api/newProject", params, {
                    "headers": {
                        "content-type": "application/json",
                        "Authorization": "Bearer " + token,
                    },
                })
                .then(res => {
                    window.location.href = '/#/projects/' + res.data.id;
                })
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="Navbar">
            <Box sx={{ flexGrow: 1 }}>
                <Toolbar variant="dense">
                    <h1>{"<CodePro/>"}</h1>
                    <div className="homebuttons">
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>New Project</DialogTitle>
                            <DialogContent>
                                <TextField type="text" placeholder="Name of Project" variant="outlined" color="warning"
                                    onChange={(e) => setName(e.target.value)} />
                                <br />
                                <br />
                                <Button variant="text" onClick={handleNewproject}>Create</Button>
                            </DialogContent>
                        </Dialog>
                        <Button variant="outlined" className="codeMode-active" component="span" onClick={handleClickOpen}><AddBoxIcon></AddBoxIcon> </Button>

                        <Popup trigger={<Button variant="outlined" className="codeMode-active" color="secondary">Hi {username}!</Button>} position="bottom">
                            <Button variant="text" onClick={handleLogout}>LogOut</Button>
                        </Popup>

                    </div>
                </Toolbar>
            </Box>
        </div>
    );
}

export default NavBar;