import express from "express";
import feedStore from "../modules/feedStore";
import {z} from "zod";
import print_log from "../middlewares/print_log";

const router = express.Router();
router.use(print_log);

const addFeedSchema = z.object({
  title: z.string(),
  content: z.string(),
})
const deleteFeedSchema = z.object({
  id: z.string(),
});
const editFeedSchema = z.object({
  id: z.string(),
  newTitle: z.string(),
  newContent: z.string(),
});

import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

router.post("/editFeed", (req, res) => {
  try {
    const { id, newTitle, newContent } = editFeedSchema.parse(req.body);

    const storeRes = feedStore.updateItem(parseInt(id as string), { title: newTitle, content: newContent });
    if (storeRes) {
      res.json({ isOK: true, updatedFeed: { id, title: newTitle, content: newContent } });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      res.status(400).json({
        error: "잘못된 요청 데이터입니다.",
        details: e.errors,
      });
    } else {
        res.status(500).json({ error: e });
    }
  }
});




router.get("/getFeed", (req, res) => {
  try {
    const requestCount = parseInt(req.query.count as string, 10);
    const storeRes = feedStore.selectItems(requestCount);
    if (storeRes.success) {
      res.json(storeRes.data);
    } else {
      res.status(400).json(storeRes.data);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/addFeed", (req, res) => {
  try {
    const { title, content } = addFeedSchema.parse(req.body);
    const storeRes = feedStore.insertItem({ title, content });
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      res.status(400).json({
        error: "잘못된 요청 데이터입니다.",
        details: e.errors,
      });
    } else{
    res.status(500).json({ error: e });
    }
  }
});

router.post("/deleteFeed", (req, res) => {
  try {
    const { id } =deleteFeedSchema.parse(req.body);
    const storeRes = feedStore.deleteItem(parseInt(id as string, 10));
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      res.status(400).json({
        error: "잘못된 요청 데이터입니다.",
        details: e.errors,
      });
    } else {
        res.status(500).json({ error: e });
    }
  }
});

export default router;
