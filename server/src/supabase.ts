import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables.');
}

// Instantiate a single client to be shared across the app, ensuring we don't open redundant connections.
export const supabase = createClient(supabaseUrl, supabaseKey);
