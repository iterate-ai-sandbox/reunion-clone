import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/auth";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://iterate-ai-sandbox-reunion-clone-test.iterate-ai.com",
      "https://iterate-ai-sandbox-reunion-clone-main.iterate-ai.com/",
    ],
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Health check
app.get("/", (req, res) => {
  res.send("Hello World! 👋");
});

app.use("/api", router);

async function main() {
  try {
    await prisma.$connect();
    console.log("Successfully connected to the database");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
