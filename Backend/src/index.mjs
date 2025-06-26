import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User_Router from "./routes/users.mjs";
import Items_Router from "./routes/items.mjs";
import session from "express-session";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(
  session({
    secret: "Items",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to the database");
  })
  .catch((error) => {
    console.log(`Error : ${error}`);
  });

app.use(User_Router);
app.use(Items_Router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running at port : http://localhost:${PORT}`);
});
