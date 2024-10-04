import express from "express";
import chatStore from "../modules/chatStore";
import loggerMiddleware from "../middlewares/logger";
import { z } from "zod";

const router = express.Router();

router.get("/getChatLength", loggerMiddleware, (req, res) => {
  try {
    const storeRes = chatStore.selectLength();
    if (storeRes.success) {
      res.json(storeRes.data);
    } else {
      res.status(400).json(storeRes.data);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/getChat", loggerMiddleware, (req, res) => {
  try {
    console.log(typeof req.query.count);
    const requestCount = parseInt(req.query.count as string, 10);

    const storeRes = chatStore.selectItems(requestCount);
    if (storeRes.success) {
      res.json(storeRes.data);
    } else {
      res.status(400).json(storeRes.data);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/addChat", loggerMiddleware, (req, res) => {
  try {
    const { title } = req.body;
    const schema = z.object({
      title: z.string(),
    });
    schema.parse({ title });
    const storeRes = chatStore.insertItem({ title });
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/deleteChat", loggerMiddleware, (req, res) => {
  try {
    const { id } = req.body;
    console.log(typeof id);
    const schema = z.object({
      id: z.string(),
    });
    schema.parse({ id });
    const storeRes = chatStore.deleteItem(parseInt(id as string, 10));
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/editChat", loggerMiddleware, (req, res) => {
  try {
    const { id, newTitle } = req.body;
    console.log(typeof id, newTitle);
    const schema = z.object({
      id: z.string(),
      newTitle: z.string(),
    });
    schema.parse({ id, newTitle });
    const storeRes = chatStore.updateItem({
      id: parseInt(id as string, 10),
      title: newTitle,
    });
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
