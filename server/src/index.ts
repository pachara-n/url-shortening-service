import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./supabase.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express + Supabase!");
});

// Expose a health check endpoint so we can easily verify if the database integration is working during deployment or local setup.
app.get("/test-db", async (req: Request, res: Response) => {
  try {
    // Fetching just 1 row is the most lightweight way to validate that our API keys are correct and RLS policies allow reading.
    const { data, error } = await supabase.from("urls").select("*").limit(1);
    
    if (error) throw error;
    
    res.json({
      message: "Database connection successful!",
      data: data
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Database connection failed!",
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
