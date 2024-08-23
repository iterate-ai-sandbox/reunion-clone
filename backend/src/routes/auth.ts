import { Router, Request, Response } from "express";
import sql from "../db";
import { validateUser } from "../lib/validation";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const authRouter = Router();

authRouter.post("/oauth", async (req: Request, res: Response) => {
  try {
    const { userData, token } = req.body;

    if (
      !userData.email ||
      !userData.given_name ||
      !userData.family_name ||
      !token
    ) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userData.email,
          fname: userData.given_name,
          lname: userData.family_name,
        },
      });
    }
    res
      .cookie("authToken", token, {
        httpOnly: false,
        sameSite: process.env.BACKEND_EV === "production" ? "none" : "lax",
        secure: process.env.BACKEND_EV === "production" ? true : false,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ user, message: user ? "User exists" : "New user created" });
  } catch (error: any) {
    console.error("Error processing OAuth:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.get("/user", async (req: Request, res: Response) => {
  try {
    const validationResponse = validateUser(req, res);
    if (!validationResponse) {
      return;
    }

    const { authToken } = req.cookies;

    let userInfoResponse;
    try {
      userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }

    const email = userInfoResponse?.data?.email;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error processing user request:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

authRouter.patch("/user", async (req: Request, res: Response) => {
  try {
    const validationResponse = validateUser(req, res);
    if (!validationResponse) {
      return;
    }

    const { fname, lname, email } = req.body;

    if (!fname || !lname || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { fname, lname },
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", user: updatedUser });
    }

    return res.status(200).json({ success: true, message: "User updated" });
  } catch (error) {
    console.error("Error processing user request:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

authRouter.get("/logout", async (req: Request, res: Response) => {
  try {
    const validationResponse = validateUser(req, res);
    if (!validationResponse) {
      return;
    }

    res.clearCookie("authToken");

    return res.status(200).json({ success: true, message: "User logged out" });
  } catch (error) {
    console.error("Error processing user request:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export default authRouter;
