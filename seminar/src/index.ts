import express from "express";
import cors, { CorsOptions } from "cors";
import path from "path";

import statusRouter from "./routes/status";
import feedRouter from "./routes/feed";
import accountRouter from "./routes/account";
import statuslog from "./middlewares/statuslog"
import reviewRouter from "./routes/review"

const app = express();
const port = 8080;

app.use(express.json());

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
app.use(statuslog);
app.use("/status", statusRouter);
app.use("/feed", feedRouter);
app.use("/review", reviewRouter);
app.use("/account", accountRouter);
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
