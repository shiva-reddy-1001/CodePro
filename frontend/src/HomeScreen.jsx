
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ProjectCard from './Components/ProjectCard';
import Navbar2 from './Components/Navbar2';
import axios from 'axios';
import { useParams } from 'react-router';

const HomeScreen = () => {

  const { username } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('http://localhost:5000/api/getAllProjects/' + username, {
      "headers": {
        "content-type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })
      .then((res) => {
        setProjects(res.data);
      })
      .catch(err => window.location.href = 'http://localhost:3000/#/');
  }, [])

  return (
    <div>
      <Navbar2 />
      <div className="DisplayCards">
        <Grid container spacing={3}>
          {
            projects.length !== 0 ?
              projects.map((project) => {
                return (
                  <Grid key={project._id} item xs={12} lg={4} md={6}>
                    <ProjectCard user={username} name={project.name} htmlCode={project.html} cssCode={project.css} id={project._id.toString()}></ProjectCard>
                  </Grid>
                )
              })
              :
              <div>
                <h1>Hey, No Projects! Create one now and improve your frontend Skills!!</h1>
              </div>
          }

        </Grid>
      </div>
    </div>
  );
}

export default HomeScreen;