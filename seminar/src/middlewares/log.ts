/***************************
 * Assignment #3: Add a middleware that leaves log for every http request.
 * - Method, Path, Current Datetime
 * ---------------
 * <Done>
 * - Implement middleware
 * - Apply middleware
 * - Test
 ****************************/

import { Request, Response, NextFunction } from "express";
import { z } from "zod";

/* Reference: https://stackoverflow.com/a/54187918 */
const now = new Date();
const offsetMs = now.getTimezoneOffset() * 60 * 1000;
const dateLocal = new Date(now.getTime() - offsetMs);
const str = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");

const schema = z.object({
    method: z.string(),
    path: z.string()
});

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const zObj = schema.parse(req);
        console.log("[LOG-MIDDLEWARE] Method:", zObj.method, "| PATH:", zObj.path, "| DATE:", str);
        next();
    } catch (e) {
        console.log("[LOG-MIDDLEWARE] Something went wrong...", e);
        res.status(500).json({ error: e });
    }
};
