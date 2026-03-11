import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables.');
}

// สร้าง Singleton Client เพื่อให้เรียกใช้ซ้ำได้ทั้งแอป ประหยัด Connection
export const supabase = createClient(supabaseUrl, supabaseKey);
