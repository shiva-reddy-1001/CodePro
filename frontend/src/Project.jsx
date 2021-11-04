import CodeInput from './Components/CodeInput'
import { useState,useEffect,useParams } from 'react';
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
  let token;
  const {id} = props.match.params;

  axios.get('http://localhost:5000/api/getProject/'+id,)
      .then((res) => {
        setjsCode(res.data.js);
        sethtmlCode(res.data.html);
        setcssCode(res.data.css);
      })
      .catch(err => console.error(err))

  useEffect(() => {
    token = localStorage.getItem("token");
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
      .then()
      .catch(err => console.error(err));
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
        <Output code={totalCode}></Output>
        </Grid>
      </Grid> 
    </div>
  );
}

export default Project;
