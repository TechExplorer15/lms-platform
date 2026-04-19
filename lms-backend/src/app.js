import express from "express";
import authRoutes from "./routes/auth.routes.js"

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
