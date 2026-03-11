import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import { supabase } from "./supabase.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express + Supabase!");
});

// เปิด Endpoint ให้ระบบ Monitoring ข้างนอกมาเช็คได้ว่า DB ไม่ล่ม
app.get("/test-db", async (req: Request, res: Response) => {
  try {
    // ดึง 1 แถวเพื่อเช็คสิทธิ์ RLS และความถูกต้องของ API Key แบบประหยัดที่สุด
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

const generateShortCode = () => {
  return crypto.randomBytes(4).toString("base64url");
};

app.post("/api/shorten", async (req: Request, res: Response): Promise<any> => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (_) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    let shortCode = generateShortCode();
    let isUnique = false;
    let attempts = 0;

    // ระบบป้องกัน Collision: ยอมให้ลองสุ่มใหม่ได้ 3 ครั้งถ้าบังเอิญรหัสซ้ำจริงๆ
    while (!isUnique && attempts < 3) {
      const { data, error } = await supabase
        .from("urls")
        .insert([{ short_code: shortCode, original_url: url }])
        .select()
        .single();

      if (error) {
        // 23505 คือ Error Code ของ Postgres เมื่อข้อมูลละเมิดกฎ Unique (มีรหัสนี้แล้ว)
        if (error.code === '23505') {
          attempts++;
          shortCode = generateShortCode();
        } else {
          throw error;
        }
      } else {
        isUnique = true;
        return res.status(201).json({
          message: "URL shortened successfully",
          data: data
        });
      }
    }

    if (!isUnique) {
       return res.status(500).json({ error: "Failed to generate a unique short code after multiple attempts. Please try again." });
    }

  } catch (error: any) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/:code", async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.params;

    // ป้องกันไม่ให้ Express ตีความคำว่า api หรือ test-db เป็นรหัสย่อ (Collision บน Route)
    if (code === "test-db" || code === "api") return;

    const { data, error } = await supabase
      .from("urls")
      .select("original_url, clicks")
      .eq("short_code", code)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // อัปเดต Stats แบบ Fire-and-forget (ไม่ใส่ await) เพื่อไม่ให้ User ต้องรอจังหวะเด้งหน้าเว็บ
    supabase
      .from("urls")
      .update({ 
        clicks: data.clicks + 1,
        last_visited: new Date().toISOString()
      })
      .eq("short_code", code)
      .then(({ error: updateError }) => {
          if(updateError) console.error("Failed to update stats:", updateError);
      });

    res.redirect(data.original_url);

  } catch (error: any) {
    console.error("Error redirecting:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
