import { Router, Request, Response } from "express";
import sql from "../db";
import { validateUser } from "../lib/validation";
import axios from "axios";

const authRouter = Router();

authRouter.post("/oauth", async (req: Request, res: Response) => {
  try {
    const { userData, token } = req.body;

    if (!userData.email || !userData.given_name || !userData.family_name) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // Check if user exists
    const existingUsers = await sql`
      SELECT * FROM users
      WHERE email = ${userData.email}
    `;

    if (existingUsers.length === 0) {
      const newUser = await sql`
        INSERT INTO users (email, fname, lname)
        VALUES (${userData.email}, ${userData.given_name}, ${userData.family_name})
        RETURNING id
      `;
      res
        .cookie("authToken", token, {
          httpOnly: false,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ user: newUser[0] });
    } else {
      return res
        .cookie("authToken", token, {
          httpOnly: false,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ user: existingUsers[0], message: "User exists" });
    }
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

    const user = await sql`
      SELECT * FROM users
      WHERE email = ${email.toLocaleString()}
    `;

    if (user.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user: user[0] });
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

    if (!fname || !lname) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    const user = await sql`
      SELECT * FROM users
      WHERE email = ${email.toLocaleString()}
    `;

    if (user.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await sql`
      UPDATE users
      SET fname = ${fname}, lname = ${lname}
      WHERE id = ${user[0].id}
    `;

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
