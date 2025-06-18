import { createClient } from '@supabase/supabase-js';
import { Article } from './types'; // Import the Article interface

// TODO: Replace with your actual Supabase URL and Anon Key
// These are placeholder values and will not work.
// You can find your Supabase URL and Anon Key in your Supabase project settings.
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn(
    'Supabase credentials are set to placeholder values. ' +
    'Please update them in src/supabaseClient.ts with your actual Supabase project URL and Anon key.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetches all articles from the 'articles' table, ordered by creation date.
 * @returns A promise that resolves to an array of Article objects.
 */
export const fetchArticles = async (): Promise<Article[]> => {
  // Ensure placeholders are not used in a real fetch attempt
  if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
    console.error('Cannot fetch articles: Supabase credentials are not configured.');
    return []; // Return empty array if credentials are placeholders
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
    return data as Article[];
  } catch (e) {
    console.error('Exception when fetching articles:', e);
    return [];
  }
};

/**
 * Fetches a single article by its ID from the 'articles' table.
 * @param id The ID of the article to fetch.
 * @returns A promise that resolves to an Article object, or null if not found or error.
 */
export const fetchArticleById = async (id: string): Promise<Article | null> => {
  // Ensure placeholders are not used in a real fetch attempt
  if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
    console.error(`Cannot fetch article by ID (${id}): Supabase credentials are not configured.`);
    return null; // Return null if credentials are placeholders
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single(); // Use single() to get one record or null

    if (error) {
      // If error is due to 'PGRST116' (resource not found), it's not a critical error, just means no article.
      if (error.code === 'PGRST116') {
        console.log(`Article with id ${id} not found.`);
        return null;
      }
      console.error(`Error fetching article by ID (${id}):`, error);
      return null;
    }
    return data as Article | null;
  } catch (e) {
    console.error(`Exception when fetching article by ID (${id}):`, e);
    return null;
  }
};
