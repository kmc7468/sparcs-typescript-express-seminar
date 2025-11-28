import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {

  const now = new Date().toISOString();
  
  const method = req.method;
  
  const path = req.path;
  
  console.log(`[${now}] ${method} ${path}`);
  
  next();
};

export default logger;