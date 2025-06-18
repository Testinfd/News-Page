import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface ArticleCardProps {
  id: string;
  imageUrl: string;
  title: string;
  snippet: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ id, imageUrl, title, snippet }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2, textDecoration: 'none' }} component={Link} to={`/article/${id}`}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {snippet}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArticleCard;
