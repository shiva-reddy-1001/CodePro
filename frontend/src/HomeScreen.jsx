import CodeInput from './Components/CodeInput'
import { useState,useEffect } from 'react';
import Output from './Components/Output';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ProjectCard from './Components/ProjectCard';
import Navbar2 from './Components/Navbar2';
import axios from 'axios';
import { useParams } from 'react-router';

const HomeScreen = () => {
    
    const {username} = useParams();
    const [projects,setProjects] = useState([]);

    useEffect(() => {
    axios.get('http://localhost:5000/api/getAllProjects/'+username,)
    .then((res) => {
        setProjects(res.data);
        console.log(res.data);
    })
    },[])

    return (
        <div>
            <Navbar2/>
        <div className="DisplayCards">
            <Grid container spacing={3}>
            {
              projects.map((project) => {
              return (
                <Grid item xs={12} lg={4} md={6}>
                    <ProjectCard htmlCode={project.html} cssCode={project.css} id={project._id.toString()}></ProjectCard>
                </Grid>
              );
            }
              )
            }
                
            </Grid>
        </div>
        </div>
    );
}

export default HomeScreen;