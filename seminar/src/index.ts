import express from "express";
import cors, { CorsOptions } from "cors";
import path from "path";

import statusRouter from "./routes/status";
import feedRouter from "./routes/feed";
import accountRouter from "./routes/account";

const app = express();
const port = 8080;

app.use(express.json());

/***************************
 * Assignment #3: Add a middleware that leaves log for every http request.
 * - Method, Path, Current Datetime
 * ---------------
 * <Done>
 * - Implement middleware
 * - Apply middleware
 * - Test
 ****************************/

import logMiddleware from "./middlewares/log";
app.use(logMiddleware);

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
} satisfies CorsOptions;

app.use(cors(corsOptions));

app.use("/status", statusRouter);
app.use("/feed", feedRouter);
app.use("/account", accountRouter);
app.use("/static", express.static(path.join(__dirname, "public")));

/***************************
 * Assignment #4: Added a new router that includes CRUD.
 * ---------------
 * <To do>
 * - Implement BE for todo router
 *   - Implement schema validation (Done)
 *   - Implement routers (Done)
 *   - Test and Debug
 * - Implement FE for todo router
 *   - Implement req-res handling
 *   - Implement user interaction
 *   - Design (really??)
 * - Test TodoDB
 * - Link to homepage
 * <Done>
 * - Write TodoDB
 ****************************/

import todoRouter from "./routes/todo";
app.use("/todo", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
