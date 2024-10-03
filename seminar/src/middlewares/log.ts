import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
    const method=req.method;
    const path=req.path;
    const time=new Date().toISOString();

    console.log(`${time} ${method} ${path}`);

    next();
};