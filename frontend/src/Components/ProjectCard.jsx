
import {Card, CardMedia, CardContent,CardActions, Typography, Button} from '@mui/material'

const ProjectCard = (props) => {

    const code =`
    <html>
      <body>${props.htmlCode}</body>
      <style>${props.cssCode}</style>
      <script>${props.jsCode}</script>
    </html>
  `;
    return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="iframe"
        height="140"
        srcDoc={code}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    );
}

export default ProjectCard;