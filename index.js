import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/books.js";
import issueRoutes from "./routes/issue.js";
import adminRoutes from "./routes/admin.js";
import connectToMongo from "./database/db.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://library-management-system-frontend-mu.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));


// 👇 Main async function to start everything after DB connects
const startServer = async () => {
  try {
    await connectToMongo(); // ✅ DB connect না হলে নিচে কিছুই হবে না

    // ✅ Routes use only after DB is connected
    app.use("/api/auth", authRoutes);
    app.use("/api/books", bookRoutes);
    app.use("/api/issue", issueRoutes);
    app.use("/api/admin", adminRoutes);

    app.get("/", (req, res) => {
      res.send("Hello");
    });

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error);
  }
};

startServer(); // 🔥 start everything here
