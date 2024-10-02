/***************************
 * Assignment #4: Added a new router that includes CRUD.
 * ---------------
 * <To do>
 * - Implement BE for todo router
 *   - Implement schema validation (Done?)
 *   - Implement routers
 * - Implement FE for todo router
 *   - Implement req-res handling
 *   - Implement user interaction
 *   - Design (really??)
 * - Test TodoDB
 * <Done>
 * - Write TodoDB
 ****************************/

import express from "express";
import todoStore from "../modules/todoStore";
import { z } from "zod";

/* add req should be { content: string, due: Date} */
const addSchema = z.object({
    content: z.string(),
    due: z.date()
  });
  
/* del req should be { id: number } */
const deleteSchema = z.object({
    id: z.number()
});

/* edit req should be { id: number } */
const editSchema = z.object({
    id: z.number(),
    newState: z.string()
});

