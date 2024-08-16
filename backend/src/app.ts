import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/auth";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
