import { Request, Response, NextFunction } from 'express';

const print_log = (req: Request, res: Response, next: NextFunction) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} ${req.path}`);
  next(); 
};

export default print_log;