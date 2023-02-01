import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);

// Routes
app.get("/", async (req, res) => {
  res.send("Hello from Instagram");
});

const startServer = async () => {
  app.listen(8080, () => {
    try {
      connectDB(process.env.MONGODB_URL);
    } catch (err) {
      console.log(err);
    }
    console.log(`Server has started on port http://localhost:8080`);
  });
};
startServer();
