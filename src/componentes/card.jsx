//import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard({imagen,titulo,cuerpo,onClick}) {
  return (
    <Card sx={{ maxWidth: 345 }} onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={imagen}
          alt="Inventora del WiFi"
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {titulo}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {cuerpo}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}