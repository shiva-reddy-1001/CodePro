import CodeInput from './Components/CodeInput'
import { useState,useEffect } from 'react';
import Output from './Components/Output';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ProjectCard from './Components/ProjectCard';

const HomeScreen = () => {
    

    return (
        
        <div className="DisplayCards">
            <ProjectCard htmlCode='<h1>Hello Shiva</h1>'></ProjectCard>
        </div>
    );
}

export default HomeScreen;