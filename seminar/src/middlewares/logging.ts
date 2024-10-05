// 백엔드 서버로 HTTP Request가 날라올 때마다, Method와 Path 그리고 현재 시각을 console.log  로 출력하는 미들웨어 만들기
import { Request, Response, NextFunction } from "express"

export default async (req: Request, res:Response, next: NextFunction) => {
    let time = new Date();
    try {
        console.log(`Method : ${req.method}, Path : ${req.path}, Time : ${time.toLocaleString()}`);
        next();
    } catch (e){
        res.status(400).json({ error: "error" });
        console.log(`Error occured; Method : ${req.method}, Path : ${req.path}, Time : ${time.toLocaleString()}, error message: ${e}`);
    }
  };
