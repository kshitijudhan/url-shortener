import express from "express";
import "dotenv/config.js";
import { connectDB } from "./config/db.js";
import urlRoutes from "./routes/url.route.js";
import redirectRoutes from "./routes/redirectRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await connectDB();

    app.use(express.json());

    app.use(cors());

    app.use("/api/urls", urlRoutes);

    app.use("/", redirectRoutes);

    app.listen(PORT, () => {
      console.log("Port is on", { PORT });
    });
  } catch (error) {
    console.error("unable to start server : ", error);
  }
})();
