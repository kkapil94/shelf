import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger";
import connectDB from "./db";
import errorMiddleware from "./middlewares/apiHandler";
import userRoutes from "./modules/user/user.routes";
import bookRoutes from "./modules/book/book.routes";

const app: Application = express();
const morganFormat = ":method :url :status :response-time ms";

connectDB();
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));
app.use(cors({ credentials: true, origin: "*" }));
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.get("/api/v1", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Server is running",
  });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/book", bookRoutes);

app.use(errorMiddleware);

export default app;
