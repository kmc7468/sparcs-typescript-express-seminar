import express from "express";
import diaryStore from "../modules/diaryStore";
import {z} from "zod";

const router = express.Router();

const addFeedSchema = z.object({
  title: z.string(),
  content: z.string(),
  rating: z.number(),
});

const deleteFeedSchema = z.object({
  id: z.number(),
});

const editFeedSchema = z.object({
  id: z.number(),
  newTitle: z.string(),
  newContent: z.string(),
  newRating: z.number(),
});

router.get("/getDiary", (req, res) => {
  try {
    const requestCount = parseInt(req.query.count as string, 10);
    const storeRes = diaryStore.selectItems(requestCount);
    if (storeRes.success) {
      res.json(storeRes.data);
    } else {
      res.status(400).json(storeRes.data);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/addDiary", (req, res) => {
  try {
    const obj = addFeedSchema.parse(req.body);
    const { title, content, rating } = obj;
    const storeRes = diaryStore.insertItem({ title, content, rating });
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/deleteDiary", (req, res) => {
  try {
    const obj = deleteFeedSchema.parse(req.body);
    const { id } = obj;
    const storeRes = diaryStore.deleteItem(id);
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/editDiary", (req, res) => {
  try {
    const obj = editFeedSchema.parse(req.body);
    const { id, newTitle, newContent, newRating } = obj;
    const storeRes = diaryStore.editItem({ id, newTitle, newContent, newRating });
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
