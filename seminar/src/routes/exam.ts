import express from "express";
import examStore from "../modules/examStore";
import { z } from "zod";

const router = express.Router();

//zod 스키마
const editExamSchema=z.object({
  id: z.number(),
  newCourse: z.string().min(1, "New course is required"),
  newDate: z.string().min(1, "New date is required"),
});

const addExamSchema=z.object({
  course: z.string().min(1, "Course is required"),
  date: z.string().min(1, "Date is required"),
});

const deleteExamSchema=z.object({
  id:z.number(),
});


router.post("/editExam", (req, res) => {
  try {
    //const { id, newCourse, newDate } = req.body;
    const parsedBody=editExamSchema.parse(req.body);

    
    const storeRes = examStore.updateItem({
      id: parsedBody.id,
      course: parsedBody.newCourse,
      date: parsedBody.newDate
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


router.get("/getExam", (req, res) => {
  try {
    const requestCount = parseInt(req.query.count as string, 10);
    const storeRes = examStore.selectItems(requestCount);
    if (storeRes.success) {
      res.json(storeRes.data);
    } else {
      res.status(400).json(storeRes.data);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/addExam", (req, res) => {
  try {
    const parsedBody=addExamSchema.parse(req.body);

    const storeRes = examStore.insertItem({
      course:parsedBody.course, 
      date:parsedBody.date 
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

router.post("/deleteExam", (req, res) => {
  try {
    //const { id } = req.body;
    const parsedBody=deleteExamSchema.parse(req.body);

    const storeRes = examStore.deleteItem(parsedBody.id);
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
