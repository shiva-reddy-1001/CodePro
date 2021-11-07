import CodeInput from './Components/CodeInput'
import React, { useState, useEffect } from 'react';
import Output from './Components/Output';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Project = (props) => {
  const [jsCode, setjsCode] = useState("");
  const [htmlCode, sethtmlCode] = useState("");
  const [cssCode, setcssCode] = useState("");
  const [totalCode, settotalCode] = useState("");
  const [fullScreenView, setfullScreenView] = useState(false);
  const [codeMode, setcodeMode] = useState(0);
  const [open, setOpen] = useState(false);


  const { id } = props.match.params;
  let token, username;
  token = localStorage.getItem("token");
  username = localStorage.getItem("username");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  useEffect(() => {
    token = localStorage.getItem("token");
    username = localStorage.getItem("username");
    const params = JSON.stringify({
      "username": username,
      "token": token
    });
    axios
      .post('http://localhost:5000/api/userValidation', params, {
        "headers": {
          "content-type": "application/json",
          "Authorization": "Bearer " + token,
        },
      })
      .then(res => {
        localStorage.setItem("token", res.data.token);
      })
      .catch(err => {
        window.location.href = 'http://localhost:3000/#/';
      })

    axios.get('http://localhost:5000/api/getProject/' + id, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })
      .then((res) => {
        setjsCode(res.data.js);
        sethtmlCode(res.data.html);
        setcssCode(res.data.css);
      })
      .catch(err => {
        if (err.Status === 403) {
          console.log(err.data);
          window.location.href = 'http://localhost:3000/#/';
        }
      })
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      settotalCode(`
        <html>
          <body>${htmlCode}</body>
          <style>${cssCode}</style>
          <script>${jsCode}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [htmlCode, cssCode, jsCode])

  const handleSave = () => {
    setOpen(true);
    const params = JSON.stringify({
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      id: id
    });
    token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/api/saveProject", params, {
        "headers": {
          "content-type": "application/json",
          "Authorization": "Bearer " + token,
        },
      })
      .then(console.log("saved"))
      .catch(err => console.error(err));
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handlemyProjects = () => {
    window.location.href = 'http://localhost:3000/#/' + username;
  }
  return (
    <div className="Project">
      <Grid container spacing={2}>
        {!fullScreenView &&

          <Grid item xs={12} md={6} lg={6}>
            <Button disabled={codeMode===0} className={codeMode === 0 ? "codeMode-active" : "codeMode-inactive"} onClick={() => { setcodeMode(0) }} variant="outlined"> HTML</Button>
            <Button disabled={codeMode===1} className={codeMode === 1 ? "codeMode-active" : "codeMode-inactive"} onClick={() => { setcodeMode(1) }} variant="outlined"> CSS</Button>
            <Button disabled={codeMode===2} className={codeMode === 2 ? "codeMode-active" : "codeMode-inactive"} onClick={() => { setcodeMode(2) }} variant="outlined"> JS</Button>
            {codeMode === 0 && <CodeInput language="xml" value={htmlCode} save={sethtmlCode}></CodeInput>}
            {codeMode === 1 && <CodeInput language="css" value={cssCode} save={setcssCode}></CodeInput>}
            {codeMode === 2 && <CodeInput language="javascript" value={jsCode} save={setjsCode}></CodeInput>}
          </Grid>

        }
        <Grid item xs={12} md={fullScreenView ? 12 : 6} lg={fullScreenView ? 12 : 6}>
          <Button className="FullScreenToggle" onClick={() => { setfullScreenView(!fullScreenView) }} variant="outlined">
            View</Button>
          <Button className="FullScreenToggle" onClick={() => { handleSave() }} variant="outlined">
            Save</Button>
          <Button className="FullScreenToggle" onClick={() => { handlemyProjects() }} variant="outlined">
            My Projects</Button>
          <Output code={totalCode}></Output>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Project Saved Succesfully!
          </Alert>
        </Snackbar>
      </Grid>
    </div>
  );
}

export default Project;
