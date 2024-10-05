import express from "express";
import { z } from "zod"; 

const router = express.Router();

let names: { id: number; name: string }[] = [];

const nameSchema = z.object({
  name: z.string(),
});

router.post("/names", (req, res) => {
  try {

    const { name } = nameSchema.parse(req.body);


    const newName = { id: names.length + 1, name };
    names.push(newName);

    res.status(201).json({ message: "Name added successfully", newName });
  } catch (e) {
    if (e instanceof z.ZodError) {
      res.status(400).json({ error: "Invalid request data", details: e.errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});


router.get("/names", (req, res) => {
  res.json(names);
});


router.get("/names/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const name = names.find(n => n.id === id);

  if (name) {
    res.json(name);
  } else {
    res.status(404).json({ error: "Name not found" });
  }
});


router.put("/names/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const nameIndex = names.findIndex(n => n.id === id);

  if (nameIndex !== -1) {
    try {

      const { name } = nameSchema.parse(req.body);


      names[nameIndex].name = name;
      res.json({ message: "Name updated successfully", updatedName: names[nameIndex] });
    } catch (e) {
      if (e instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: e.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  } else {
    res.status(404).json({ error: "Name not found" });
  }
});


router.delete("/names/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const nameIndex = names.findIndex(n => n.id === id);

  if (nameIndex !== -1) {
    names.splice(nameIndex, 1);  
    res.json({ message: "Name deleted successfully" });
  } else {
    res.status(404).json({ error: "Name not found" });
  }
});

export default router;
