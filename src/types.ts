export interface Article {
  id: string; // Assuming UUID from Supabase, can be number if using serial PK
  title: string;
  snippet: string;
  content: string;
  imageUrl: string;
  createdAt: string; // ISO date string
  category?: string; // Optional: e.g., 'Sports', 'eSports'
}
