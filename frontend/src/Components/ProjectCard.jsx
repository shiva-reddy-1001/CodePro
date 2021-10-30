
import {Card, CardMedia, CardContent,CardActions, Typography, Button} from '@mui/material'

const ProjectCard = (props) => {

    const code =`
    <html>
      <body>${props.htmlCode}</body>
      <style>${props.cssCode}</style>
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
          {props.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className="codeMode" size="small">Open</Button>
      </CardActions>
    </Card>
    );
}

export default ProjectCard;