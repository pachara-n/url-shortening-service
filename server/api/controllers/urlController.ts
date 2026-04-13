import { Request, Response } from "express";
import { supabase } from "../supabase.js";
import crypto from "crypto";

const port = process.env.PORT || 8000;

const generateShortCode = () => {
  return crypto.randomBytes(4).toString("base64url");
};

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      const newUrl = new URL(url);
      const isHttp =
        newUrl.protocol === "http:" || newUrl.protocol === "https:";
      const hasDotInHost = newUrl.hostname.includes(".");
      if (!isHttp || !hasDotInHost) {
        throw new Error();
      }
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
        if (error.code === "23505") {
          attempts++;
          shortCode = generateShortCode();
        } else {
          throw error;
        }
      } else {
        isUnique = true;

        const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
        const shortUrl = `${baseUrl}/${data.short_code}`;

        return res.status(201).json({
          message: "URL shortened successfully",
          data: {
            ...data,
            short_url: shortUrl,
          },
        });
      }
    }

    return res.status(500).json({
      error:
        "Failed to generate a unique short code after multiple attempts. Please try again.",
    });
  } catch (error: any) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUrlDetails = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { data, error } = await supabase
      .from("urls")
      .select(
        "short_code, clicks, original_url, last_visited, created_at, updated_at",
      )
      .eq("short_code", code)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.status(200).json({ data });
  } catch (error: any) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateShortUrl = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
      new URL(url);
    } catch (_) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    const { data, error } = await supabase
      .from("urls")
      .update({ original_url: url, updated_at: new Date().toISOString() })
      .eq("short_code", code)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.status(200).json({ data });
  } catch (error: any) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteShortUrl = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    const { error, count } = await supabase
      .from("urls")
      .delete({ count: "exact" })
      .eq("short_code", code);

    if (error) throw error;
    if (count === 0)
      return res.status(404).json({ error: "Short URL not found" });

    // 204 No Content คือมาตรฐาน REST สำหรับการลบสำเร็จ ไม่ต้องส่ง body กลับ
    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    // ป้องกัน Express ไม่ให้ตีความ path ของ API เป็นรหัสย่อ
    if (code === "test-db" || code === "api" || code === "shorten") return;

    const { data, error } = await supabase
      .from("urls")
      .select("original_url, clicks")
      .eq("short_code", code)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // ดึงข้อมูลจาก Header ที่ Vercel และ Browser ส่งมาให้
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.ip;
    const country = (req.headers["x-vercel-ip-country"] as string) || "Unknown";
    const userAgent = req.headers["user-agent"] || "Unknown";

    supabase
      .from("click_logs")
      .insert([
        {
          short_code: code,
          ip_address: ip,
          country: country,
          user_agent: userAgent,
        },
      ])
      .then(({ error: logError }) => {
        if (logError) console.error("Failed to save click log:", logError);
      });

    // อัปเดต Stats รวมแบบเดิม (เพื่อความเร็วในการดึงเลขรวม)
    supabase
      .from("urls")
      .update({
        clicks: data.clicks + 1,
        last_visited: new Date().toISOString(),
      })
      .eq("short_code", code)
      .then(({ error: updateError }) => {
        if (updateError) console.error("Failed to update stats:", updateError);
      });

    return res.redirect(data.original_url);
  } catch (error: any) {
    console.error("Error redirecting:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleHome = (req: Request, res: Response) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  return res.redirect(frontendUrl);
};

export const testDbConnection = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("urls").select("*").limit(1);
    if (error) throw error;

    return res.json({
      message: "Database connection successful!",
      data: data,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Database connection failed!",
      error: error.message,
    });
  }
};

export const getAnalyticsDetail = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { data, error } = await supabase
      .from("click_logs")
      .select("short_code, ip_address, country, user_agent, created_at ")
      .eq("short_code", code)
    if (error || !data) {
      return res.status(404).json({ error: "URL Not Found" });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
