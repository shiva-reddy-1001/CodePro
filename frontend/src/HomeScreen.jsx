import CodeInput from './Components/CodeInput'
import { useState,useEffect } from 'react';
import Output from './Components/Output';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ProjectCard from './Components/ProjectCard';
import Navbar from './Components/Navbar';

const HomeScreen = () => {
    

    return (
        <div>
            <Navbar/>
        <div className="DisplayCards">
            <Grid container spacing={3}>
                <Grid item xs={12} lg={4} md={6}>
                    <ProjectCard htmlCode='<html>
  <head>
    <meta charset="utf-8">
    <title>Squarespace layout</title>
  </head>
  <body>
    <nav></nav>
    <header></header>
    <section>
      <!-- main paragraph --> 
      <p></p>
      <!-- Two column-type things --> 
      <div id="flex-container">
        <div class="col"></div>
        <div class="col"></div>
      </div>

    </section>
    <footer></footer>
  </body>
</html>' cssCode='body {
  margin: 0;
}

#flex-container {
  display: flex;
  justify-content: space-between;
  height: 200px;
}

nav {
  background-color: royalblue;
  height: 75px;
}

header {
  background-color: lightskyblue;
  height: 400px;
}

section {
  background-color: gray;
  margin: 75px 100px;
}

footer {
  background-color: black;
  height: 100px;
}

p {
  background-color: khaki;
  height: 200px;
  margin-bottom: 75px;
}

div.col {
  background-color: tomato;
  border: 2px solid black;
  width: calc(50% - 10px);
}

' name='Squarespace layout'></ProjectCard>
                </Grid>
                <Grid item xs={12} lg={4} md={6}>
                    <ProjectCard htmlCode='<html>
  <head>
    <meta charset="utf-8">
    <title>Flexbox review</title>
  </head>
  <body>
    <nav>
      <a>Home</a>
      <a>About</a>
      <a>News</a>
      <a>Links</a>
      <a>Contact</a>
    </nav>
  </body>
</html>' cssCode='body {
  margin: 0;
}

a {
  font-weight: bold;
  font-size: 24px;
  background-color: tomato;
  color: white;
  padding: 5px 15px;
  border-radius: 50px;
}

nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  background-color: whitesmoke;
  font-family: Helvetica, sans-serif;
  height: 200px;
}' name='FlexBox'></ProjectCard>
                </Grid>
                <Grid item xs={12} lg={4} md={6}>
                    <ProjectCard htmlCode='<html>
  <head>
    <meta charset="utf-8">
    <title>JS Example</title>
  </head>
  <body>
    <h1>Click for a present:</h1>
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/gift-icon.png" />
  </body>
</html>' cssCode='body {
  font-family: monospace;
  text-align: center;
}

img {
  height: 200px;
}' name='GiftBox'></ProjectCard>
                </Grid>
            </Grid>
        </div>
        </div>
    );
}

export default HomeScreen;