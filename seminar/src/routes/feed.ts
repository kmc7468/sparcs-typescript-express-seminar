import express from "express";
import feedStore from "../modules/feedStore";
import { z } from "zod";

const router = express.Router();

/***************************
 * Assignment #2: Add a schema validation with Zod for every POST method endpoint of feedRouter.
 * ---------------
 * <Done>
 * - (BE) Import Zod and create Zod schemas
 * - (BE) Apply schemas to endpoints
 ****************************/

const addSchema = z.object({
  title: z.string(),
  content: z.string()
});

const deleteSchema = z.object({
  id: z.string()
});

// for some reason id for editFeed req is number
const editSchema = z.object({
  id: z.number(),
  newTitle: z.string(),
  newContent: z.string()
});

router.get("/getFeed", (req, res) => {
  try {
    const requestCount = parseInt(req.query.count as string, 10);
    const storeRes = feedStore.selectItems(requestCount);
    if (storeRes.success) {
      res.json(storeRes.data);
      console.log(storeRes.data);
    } else {
      res.status(400).json(storeRes.data);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/addFeed", (req, res) => {
  try {
    const addObj = addSchema.parse(req.body);
    const [title, content] = [addObj.title, addObj.content];
    const storeRes = feedStore.insertItem({ title, content });
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/deleteFeed", (req, res) => {
  try {
    const deleteObj = deleteSchema.parse(req.body);
    const [id] = [deleteObj.id];
    const storeRes = feedStore.deleteItem(parseInt(id as string, 10));
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

/***************************
 * Assignment #1: Add an endpoint to feed that allows a feature to edit feeds.
 * - Method: POST
 * - Path: '/feed/editFeed'
 * - Request Body Type: { id: string; newTitle: string; newContent: string; }
 * ---------------
 * <Done>
 * - (BE) Added a router
 ****************************/

router.post("/editFeed", (req, res) => {
  try {
    console.log(req.body);
    const editObj = editSchema.parse(req.body);
    const [id, title, content] = [editObj.id, editObj.newTitle, editObj.newContent];
    const addRes = feedStore.insertItem({ title, content });
    if (!addRes) {
      res.status(500).json({ isOK: false });
    } else {
      const delRes = feedStore.deleteItem(id);
      if (!delRes) {
        res.status(500).json({ isOK: false });
      } else {
        res.json({ isOK: true });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
})

export default router;
