import { Request, Response, NextFunction } from "express";

const credentials = "SPARCS2024";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const method = req.method;
    const path = req.path;
    const currentTime = new Date().toISOString();

    console.log(`${currentTime} ${method} ${path}`);

    next();
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
