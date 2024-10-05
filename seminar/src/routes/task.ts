import express from "express";
import taskStore from "../modules/taskStore";
import { z } from 'zod';

const router = express.Router();

//스키마 정의
const addtaskSchema = z.object({
  title: z.string(),
  check: z.string(),
});

const deletetaskSchema = z.object({
  id: z.string(),
});

const edittaskSchema = z.object({
  id: z.number(),
  newTitle: z.string(),
  newcheck: z.string(),
});

//Endpoint
router.get("/gettask", (req, res) => {
  try {
    const requestCount = parseInt(req.query.count as string, 10);
    const storeRes = taskStore.selectItems(requestCount);
    if (storeRes.success) {
      res.json(storeRes.data);
    } else {
      res.status(400).json(storeRes.data);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/addtask", (req, res) => {
  try {
    const validatedBody = addtaskSchema.parse(req.body);
    const { title, check } = validatedBody;
    const storeRes = taskStore.insertItem({ title, check });
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/deletetask", (req, res) => {
  try {
    const validatedBody = deletetaskSchema.parse(req.body);
    const { id } = validatedBody;
    const storeRes = taskStore.deleteItem(parseInt(id as string, 10));
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/edittask", (req, res) => {
  try {
    const validatedBody = edittaskSchema.parse(req.body);
    const { id, newTitle, newcheck } = validatedBody;
    const storeRes = taskStore.editItem(id, newTitle, newcheck);
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

