/***************************
 * Assignment #4: Added a new router that includes CRUD.
 * ---------------
 * <To do>
 * - Implement BE for todo router
 *   - Implement schema validation (Done?)
 *   - Implement routers
 * - Implement FE for todo router
 *   - Implement req-res handling
 *   - Implement user interaction
 *   - Design (really??)
 * - Test TodoDB
 * <Done>
 * - Write TodoDB
 ****************************/

import express from "express";
import todoStore from "../modules/todoStore";
import { z } from "zod";

/* add req should be { content: string, due: Date} */
const addSchema = z.object({
    content: z.string(),
    due: z.date()
  });
  
/* del req should be { id: number } */
const deleteSchema = z.object({
    id: z.number()
});

/* edit req should be { id: number } */
const editSchema = z.object({
    id: z.number(),
    newState: z.string()
});

const router = express.Router();

router.get("/getTodo", async (req, res) => {
    try {
        const reqState = req.query.state as string;
        const storeRes = todoStore.selectItems(reqState);
        if (storeRes.success) {
            res.json(storeRes.data);
        } else {
            res.status(500).json( {error: "/getTodo Internal Error"} );
        }
    } catch (e) {
        res.status(500).json( { error: e } );
    }
});
