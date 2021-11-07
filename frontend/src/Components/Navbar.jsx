import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
const NavBar = () => {
    const handleTheme = (e) => {
        const mode = e.target.checked ?"DARK":"LIGHT";
        localStorage.setItem("Theme",mode);
        window.location.reload(true);
    }
    return (
        <div className="Navbar">
            <Box sx={{ flexGrow: 1 }}>
                    <Toolbar variant="dense">
                    <h1>{"<CodePro/>"}</h1>
                    <FormControlLabel control={<Switch color="default" onChange={handleTheme}/>} label="Dark Mode" />
                    </Toolbar>
            </Box>
        </div>
    );
} 

export default NavBar;