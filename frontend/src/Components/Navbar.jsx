import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const NavBar = () => {
    return (
        <div className="Navbar">
            <Box sx={{ flexGrow: 1 }}>
                    <Toolbar variant="dense">
                    <h1>{"<CodePro/>"}</h1>
                    </Toolbar>
            </Box>
        </div>
    );
} 

export default NavBar;