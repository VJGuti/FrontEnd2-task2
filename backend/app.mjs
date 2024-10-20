import express from 'express';
import { config } from "dotenv";
import cors from 'cors';
import { connection } from './src/db/db.mjs';
import { indexRouter } from './src/routers/index.mjs';

config();

const app = express();
app.use(cors(
  {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
));

app.use(express.json());

app.use('/api', indexRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

connection().then(() => {
  console.log("Database connected successfully");
});
