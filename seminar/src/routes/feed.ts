import express from "express";
import feedStore from "../modules/feedStore";
import { z } from "zod";
import logmiddleware from "../middlewares/log";

const router = express.Router();

router.use(logmiddleware);
//zod 스키마
const editFeedSchema=z.object({
  id: z.number(),
  newTitle: z.string().min(1, "New title is required"),
  newContent: z.string().min(1, "New content is required"),
});

const addFeedSchema=z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const deleteFeedSchema=z.object({
  id:z.number(),
});

// 피드 편집 엔드포인트
router.post("/editFeed", (req, res) => {
  try {
    const parsedBody=editFeedSchema.parse(req.body);

    // 피드 업데이트
    const storeRes = feedStore.updateItem({
      id: parsedBody.id,
      title: parsedBody.newTitle,
      content: parsedBody.newContent
    });

    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({error: e.errors});
    }
    res.status(500).json({error: e});
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
    //const { title, content } = req.body;
    const parsedBody=addFeedSchema.parse(req.body);

    const storeRes = feedStore.insertItem({
      title:parsedBody.title, 
      content:parsedBody.content 
    });

    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({error: e.errors});
    }
    res.status(500).json({error: e});
  }
});

router.post("/deleteFeed", (req, res) => {
  try {
    //const { id } = req.body;
    const parsedBody=deleteFeedSchema.parse(req.body);

    const storeRes = feedStore.deleteItem(parsedBody.id);
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({error: e.errors});
    }
    res.status(500).json({error: e});
  }
});

export default router;
