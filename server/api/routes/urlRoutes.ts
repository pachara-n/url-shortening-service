import { Router } from "express";
import {
  createShortUrl,
  getUrlDetails,
  updateShortUrl,
  deleteShortUrl,
  redirectToOriginalUrl,
  handleHome,
  testDbConnection,
  getAnalyticsDetail,
} from "../controllers/urlController.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: { error: "Too many requests, please try again later." },
});

const router = Router();

router.get("/", handleHome);

router.get("/test-db", testDbConnection);

router.post("/shorten", limiter, createShortUrl);

router.get("/shorten/:code", getUrlDetails);

router.put("/shorten/:code", updateShortUrl);

router.delete("/shorten/:code", deleteShortUrl);

router.get("/analytics/:code", getAnalyticsDetail);

// Redirect route ต้องอยู่ล่างสุดเสมอ เพราะ /:code จะ match ทุก path ที่ไม่มี prefix
router.get("/:code", redirectToOriginalUrl);

export default router;
