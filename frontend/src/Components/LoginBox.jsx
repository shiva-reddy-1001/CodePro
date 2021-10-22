import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

const LoginBox = () => {
    return (
        <Card sx={{ minWidth: 275 }} height="100%" className="LoginBox">
            <div>
            <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Username
            </Typography>
            <TextField id="standard-basic" label="" variant="standard" />
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Password
            </Typography>
            <TextField id="standard-basic" label="" variant="standard" /> 
          </CardContent>
          <CardActions className="cardActions">
              <div>
              <Button variant="outlined">Login</Button>
              </div>
              <div>
              <p>New User? <a href=""><b>Register</b></a></p>
              </div>
          </CardActions>
            </div>
        </Card>
      );
}

export default LoginBox;