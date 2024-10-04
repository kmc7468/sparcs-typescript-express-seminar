import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  console.log(`Server Time: ${new Date().toISOString()}`);
  next();
};
