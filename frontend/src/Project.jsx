import CodeInput from './Components/CodeInput'
import { useState,useEffect } from 'react';
import Output from './Components/Output';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';

const Project = (props) => {
  const [jsCode, setjsCode] = useState("");
  const [htmlCode, sethtmlCode] = useState("");
  const [cssCode, setcssCode] = useState("");
  const [totalCode, settotalCode] = useState("");
  const [fullScreenView, setfullScreenView] = useState(false);
  const [codeMode, setcodeMode] = useState(0);
  // const [username, setUsername] = useState("");
  // const [token, setToken] = useState("");
  const {id} = props.match.params;
  let token,username;
  token = localStorage.getItem("token") ;
  username = localStorage.getItem("username") ;
  useEffect(() => {
    token = localStorage.getItem("token") ;
    username = localStorage.getItem("username") ;
    const params = JSON.stringify({
      "username": username,
      "token": token
    });
    axios
      .post('http://localhost:5000/api/userValidation', params, {
        "headers": {
          "content-type": "application/json",
        },
      })
      .then(res=>{
        console.log(res.data);
        if(res.data===false){
          console.log(res.data);
          window.location.href = 'http://localhost:3000/#/';
        }else{
          //setToken(res.data.token);
          localStorage.setItem("token",res.data.token);
        }
      })
    axios.get('http://localhost:5000/api/getProject/'+id,)
      .then((res) => {
        setjsCode(res.data.js);
        sethtmlCode(res.data.html);
        setcssCode(res.data.css);
      })
      .catch(err => console.error(err))
  },[])
  
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
    const params = JSON.stringify({
      html:htmlCode,
      css:cssCode,
      js:jsCode,
      id: id
    });
    axios
      .post("http://localhost:5000/api/saveProject",params,{
        "headers": {
          "content-type": "application/json",
          "Authorization": "Bearer" + token,
        },
      })
      .then(console.log("saved"))
      .catch(err => console.error(err));
  }

  const handlemyProjects = () => {
    console.log(username);
    console.log(token);
    window.location.href = 'http://localhost:3000/#/'+username;
  }
  return (
    <div className="Project">
    <Grid container spacing={2}>
      {!fullScreenView &&
        
          <Grid item xs={12} md={6} lg={6}>
          <Button  className="codeMode" onClick={() => {setcodeMode(0)}}variant="outlined"> HTML</Button>
          <Button  className="codeMode" onClick={() => {setcodeMode(1)}}variant="outlined"> CSS</Button>
          <Button  className="codeMode" onClick={() => {setcodeMode(2)}}variant="outlined"> JS</Button>
          {codeMode===0 && <CodeInput language="xml" value={htmlCode} save={sethtmlCode}></CodeInput>}
          {codeMode===1 && <CodeInput language="css"  value={cssCode} save={setcssCode}></CodeInput> }
          {codeMode===2 && <CodeInput language="javascript" value={jsCode} save={setjsCode}></CodeInput> }
          </Grid>
        
      }
        <Grid item xs={12} md={fullScreenView? 12 : 6} lg={fullScreenView? 12 : 6}>
        <Button className="FullScreenToggle" onClick={() => { setfullScreenView(!fullScreenView) }}variant="outlined"> 
        View</Button>
        <Button className="FullScreenToggle" onClick={() => {handleSave()}}variant="outlined"> 
        Save</Button>
        <Button className="FullScreenToggle" onClick={() => {handlemyProjects()}}variant="outlined"> 
        My Projects</Button>
        <Output code={totalCode}></Output>
        </Grid>
      </Grid> 
    </div>
  );
}

export default Project;
