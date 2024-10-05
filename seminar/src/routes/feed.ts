import express from "express";
import feedStore from "../modules/feedStore";
import z from "zod";

const router = express.Router();

const objadd = z.object({
  title: z.string(),
  content: z.string()
});
const objdel = z.object({
  id: z.string()
});
const objedit = z.object({
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
    } else {
      res.status(400).json(storeRes.data);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/addFeed", (req, res) => {
  try {
    // const { title, content } = req.body;
    const zodobj = objadd.parse(req.body);
    const { title, content } = zodobj;
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
    // const { id } = req.body;
    const zodobj = objdel.parse(req.body);
    const { id } = zodobj;
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

router.post("/editFeed", (req, res) => {
  // body type: { id: string; newTitle: string; newContent: string; }
  try {
    // const { id, newTitle, newContent } = req.body;
    const zodobj = objedit.parse(req.body);
    const { id, newTitle, newContent } = zodobj;
    let editresult = feedStore.editItem({id, newTitle, newContent});
    if (editresult) {
      res.json({ isOk: true });
    }
    else {
      res.status(500).json({ isOk: false });
    }
  }
  catch (e) {
    res.status(500).json({error: e});
  }
})

export default router;
