import express from "express";
import userStore from "../modules/userStore";
import loggerMiddleware from "../middlewares/logger";
import { z } from "zod";

const router = express.Router();
router.use(loggerMiddleware)

const api002Schema = z.object({
  name: z.string(),
  email: z.string(),
})

const api003Schema = z.object({
  email: z.string(),
})

const api004Schema = z.object({
  newName: z.string(),
  email: z.string(),
})

router.get("/read", (req, res) => {
  try {
    const storeRes = userStore.selectItems();
    if (storeRes.success) {
      res.json(storeRes.data);
    } else {
      res.status(400).json(storeRes.data);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/create", (req, res) => {
  try {
    const { name, email } =  api002Schema.parse(req.body);
    const storeRes = userStore.insertItem({ name, email });
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/delete", (req, res) => {
  try {
    const { email } = api003Schema.parse(req.body);
    const storeRes = userStore.deleteItem(email);
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/update", (req, res) => {
  try {
    const { newName, email } = api004Schema.parse(req.body);
    const storeRes = userStore.editItem( newName, email );
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
