import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);
const port = process.env.PORT || 8000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        allowedOrigins.includes("*")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

app.use("/", urlRoutes);

// สำหรับ Vercel Serverless Functions จะต้อง Export app ออกไป
// แต่ถ้าเราอยากรันในเครื่องตัวเอง (Local) เราจะใช้เงื่อนไขตรวจสอบว่าเราไม่ได้รันบน Vercel
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`[LOCAL] Server running at http://localhost:${port}`);
  });
}

export default app;
