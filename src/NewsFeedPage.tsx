import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import ArticleCard from './components/ArticleCard';
import { fetchArticles } from './supabaseClient';
import { Article } from './types';

const NewsFeedPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedArticles = await fetchArticles();
        // Check if the warning for placeholder credentials was logged by supabaseClient
        // This is a proxy to see if the fetch was truly attempted or short-circuited.
        // A more robust way would be for fetchArticles to return a status object.
        if (fetchedArticles.length === 0 &&
            (sessionStorage.getItem('supabase_placeholder_warning_logged') === 'true')) {
          // Clear the flag if you want it to be per-attempt rather than session-sticky
          // sessionStorage.removeItem('supabase_placeholder_warning_logged');
          setError("Failed to fetch articles. Please ensure Supabase client is correctly configured with valid credentials.");
        } else {
          setArticles(fetchedArticles);
        }
      } catch (e) {
        setError('An unexpected error occurred while fetching articles.');
        console.error(e); // Log the actual error for debugging
      } finally {
        setLoading(false);
      }
    };

    // Add a mechanism to detect if supabaseClient logged the placeholder warning
    // This is a bit hacky; ideally, fetchArticles would return more status info.
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      if (args.length > 0 && typeof args[0] === 'string' && args[0].includes('Supabase credentials are set to placeholder values')) {
        sessionStorage.setItem('supabase_placeholder_warning_logged', 'true');
      }
      originalWarn.apply(console, args);
    };

    sessionStorage.removeItem('supabase_placeholder_warning_logged'); // Reset flag before fetch
    loadArticles();

    // Cleanup console.warn override
    return () => {
      console.warn = originalWarn;
    }
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Sports & eSports News
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>
            Please try again later or check your configuration.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Sports & eSports News
      </Typography>
      {articles.length === 0 ? (
        <Typography sx={{ textAlign: 'center', mt: 4 }}>
          No articles found. This could be because there are no articles in the database,
          or the Supabase client is not configured correctly (check console for warnings).
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {articles.map((article) => (
            <Grid item key={article.id} xs={12} sm={6} md={4}>
              <ArticleCard
                id={article.id}
                title={article.title}
                snippet={article.snippet}
                imageUrl={article.imageUrl}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default NewsFeedPage;
