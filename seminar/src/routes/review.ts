import express from "express";
import reviewStore from "../modules/reviewstore";
import { z } from "zod";

const router = express.Router();

router.get("/getreview", (req, res) => {
  try {
    const requestRestaurant = req.query.name as string;
    const storeRes = reviewStore.selectReview(requestRestaurant);
    if (storeRes.success) {
      res.json(storeRes.data);
    } else {
      res.status(400).json(storeRes.data);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/addreview", (req, res) => {
  try {
    const addSchema = z.object({
      id: z.number(),
      name: z.string(),
      menu: z.string(),
      star: z.number(),
    });
    const { id,name,menu,star } = addSchema.parse(req.body);
    const storeRes = reviewStore.insertReview(id, {name, menu, star });
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/deletereview", (req, res) => {
  try {
    const delSchema = z.object({
        id: z.number(),
        name: z.string(),
        menu: z.string(),
        star: z.number(),
    });
    const { id,name,menu,star } = delSchema.parse(req.body);
    const storeRes = reviewStore.deleteReview(id);
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/editreview", (req, res) => {
  try {
    const editSchema = z.object({
        id: z.number(),
        name: z.string(),
        menu: z.string(),
        newStar: z.number(),
    });
    const { id, name, menu, newStar } = editSchema.parse(req.body);
    const storeRes = reviewStore.editReview(id, {name, menu, newStar});
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
