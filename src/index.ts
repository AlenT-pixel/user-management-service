import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import cors from "cors";
dotenv.config({ path: ".env" });

import Router from "./routers/route";

export const app: Application = express();
const { PORT } = process.env;

// cors
app.use(cors());
// Node.js body parsing middleware.
app.use(json());
app.use(urlencoded({ extended: true }));
app.get('/', (req: Request, res: Response) => {
  res.send('Server working');
});

const router = Router;
app.use("/api", router);


// app.get('*', (req: Request, res: Response) => {
//   res.status(404).send({ message: 'Unauthorized!', status: false });
// });

app.listen(PORT || 5000, () => {
  console.log("Server is listening on port ", PORT||5000);
});