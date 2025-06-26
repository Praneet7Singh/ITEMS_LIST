import { Router } from "express";
import { Compare_password, hash_password } from "../utils/encrypt.mjs";
import { User } from "../models/user.mjs";

const router = Router();

router.post("/api/signup", async (req, res) => {
  const { body } = req;
  body.password = hash_password(body.password);
  const new_user = new User(body);
  const saved_user = await new_user.save();
  res.status(201).send(saved_user);
});

router.post("/api/login", async (req, res) => {
  const {
    body: { email, password },
  } = req;
  let find_user = await User.findOne({ email });
  if (!find_user || !Compare_password(password, find_user.password)) {
    return res.status(404).send("INVALID CREDENTIALS");
  }
  req.session.user = find_user;
  res.status(200).send(find_user);
});

router.get("/api/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send("logout failed");
    }
    res.clearCookie("connect.sid");
    res.status(200).send("logout successful");
  });
});

export default router;
