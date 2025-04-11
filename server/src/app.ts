import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));
app.use(cors({ credentials: true, origin: "*" }));

app.get("/api/v1", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Server is running",
  });
});

export default app;
