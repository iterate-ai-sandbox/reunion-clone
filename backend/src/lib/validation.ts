import { Request, Response } from "express";

export const validateUser = (req: Request, res: Response): boolean => {
  const authToken = req.cookies?.authToken;

  if (!authToken) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return false;
  }

  if (!authToken.startsWith("ya29.")) {
    res.status(401).json({ success: false, message: "Invalid token" });
    return false;
  }

  return true;
};
