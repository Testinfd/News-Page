import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link'; // For styled links

import { fetchArticleById } from './supabaseClient';
import { Article } from './types';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) {
        setError('Article ID is missing.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const fetchedArticle = await fetchArticleById(id);
        if (fetchedArticle) {
          setArticle(fetchedArticle);
        } else {
          // Check if the warning for placeholder credentials was logged by supabaseClient
          if (sessionStorage.getItem('supabase_placeholder_warning_logged_article') === 'true') {
            setError(`Article with ID "${id}" not found. Please also ensure Supabase client is correctly configured.`);
          } else {
            setError(`Article with ID "${id}" not found.`);
          }
        }
      } catch (e) {
        setError('An unexpected error occurred while fetching the article.');
        console.error(e); // Log the actual error for debugging
      } finally {
        setLoading(false);
      }
    };

    // Add a mechanism to detect if supabaseClient logged the placeholder warning
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      if (args.length > 0 && typeof args[0] === 'string' && args[0].includes('Supabase credentials are set to placeholder values')) {
        sessionStorage.setItem('supabase_placeholder_warning_logged_article', 'true');
      }
      originalWarn.apply(console, args);
    };

    sessionStorage.removeItem('supabase_placeholder_warning_logged_article'); // Reset flag
    loadArticle();

    return () => {
      console.warn = originalWarn; // Cleanup
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Link component={RouterLink} to="/" variant="body1">
          &larr; Back to News Feed
        </Link>
      </Container>
    );
  }

  if (!article) {
    // This case should ideally be covered by the error state from fetchArticleById returning null
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>Article not found.</Alert>
        <Link component={RouterLink} to="/" variant="body1">
          &larr; Back to News Feed
        </Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" variant="body1">
          &larr; Back to News Feed
        </Link>
      </Box>
      <Typography variant="h3" component="h1" gutterBottom>
        {article.title}
      </Typography>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        Published on: {new Date(article.createdAt).toLocaleDateString()}
        {article.category && ` | Category: ${article.category}`}
      </Typography>
      {article.imageUrl && (
        <CardMedia
          component="img"
          image={article.imageUrl}
          alt={article.title}
          sx={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            my: 2,
            borderRadius: '4px'
          }}
        />
      )}
      <Box sx={{ my: 4 }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {article.content}
        </Typography>
      </Box>
    </Container>
  );
};

export default ArticlePage;
