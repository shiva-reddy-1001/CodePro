import './App.css';
import CodeInput from './Components/CodeInput'
import { useState } from 'react';
import Output from './Components/Output';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function App() {
  const [jsCode, setjsCode] = useState("");
  const [htmlCode, sethtmlCode] = useState("");
  const [cssCode, setcssCode] = useState("");
  const [totalCode, settotalCode] = useState("");
  const [fullScreenView, setfullScreenView] = useState(false);

  const updateJSCode = (value) => {
    setjsCode(value);
    settotalCode(htmlCode+ '<style>' + cssCode + '</style>'+'<script>' + jsCode + '</script>')
  }

  const updateHTMLCode = (value) => {
    sethtmlCode(value);
    settotalCode(htmlCode+ '<style>' + cssCode + '</style>'+'<script>' + jsCode + '</script>')
  }

  const updateCSSCode = (value) => {
    setcssCode(value);
    settotalCode(htmlCode+ "<style>" + cssCode + "</style>"+"<script>" + jsCode + "</script>")
  }

  return (
    <div className="App">
    <Grid container spacing={2}>
      {!fullScreenView ? 
        <Grid item xs={12} md={6} lg={6}>
        <CodeInput language="xml" value={htmlCode} save={updateHTMLCode}></CodeInput>
        <CodeInput language="css"  value={cssCode} save={updateCSSCode}></CodeInput>
        <CodeInput language="javascript" value={jsCode} save={updateJSCode}></CodeInput>
        </Grid>
        :
        null
      }
        <Grid item xs={12} md={fullScreenView? 12 : 6} lg={fullScreenView? 12 : 6}>
        <Button className="FullScreenToggle" onClick={() => {
              setfullScreenView(!fullScreenView)
            }}variant="outlined"> 
        Primary</Button>
        <Output code={totalCode}></Output>
        </Grid>
      </Grid> 
    </div>
  );
}

export default App;
