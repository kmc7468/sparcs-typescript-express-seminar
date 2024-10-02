/***************************
 * Assignment #4: Added a new router that includes CRUD.
 * ---------------
 * <To do>
 * - Implement BE for todo router
 *   - Implement schema validation (Done)
 *   - Implement routers (Done)
 *   - Test and Debug
 * - Implement FE for todo router
 *   - Implement req-res handling
 *   - Implement user interaction
 *   - Design (really??)
 * - Test TodoDB
 * - Link to homepage
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
const delSchema = z.object({
    id: z.number()
});

/* edit req should be { id: number, newState: string } */
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

router.post("/addTodo", async (req, res) => {
    try {
        const addObj = addSchema.parse(req.body);
        const [content, due, state] = [addObj.content, addObj.due, "not started"];
        const storeRes = todoStore.insertItem({ content, due, state });
        if (storeRes) {
            res.json({ isOK: true });
        } else {
            res.status(500).json({ isOK: false });
        }
    } catch (e) {
        res.status(500).json( { error: e });
    }
});

router.post("/deleteTodo", async (req, res) => {
    try {
        const delObj = delSchema.parse(req.body);
        const [id] = [delObj.id];
        const storeRes = todoStore.deleteItem(id);
        if (storeRes) {
            res.json({ isOK: true });
        } else {
            res.status(500).json({ isOK: false });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post("/editTodo", async (req, res) => {
    try {
        const editObj = editSchema.parse(req.body);
        const [id, state] = [editObj.id, editObj.newState];
        const storeRes = todoStore.editItem(id, state);
        if (storeRes) {
            res.json({ isOK: true });
        } else {
            res.status(500).json({ isOK: false });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
