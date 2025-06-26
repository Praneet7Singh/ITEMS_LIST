import { Router } from "express";
import { Item } from "../models/item.mjs";
import { Id_Middleware } from "../utils/middlewares.mjs";
const router = Router();

router.get("/api/items", async (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const items = await Item.find({ user: req.session.user._id });
  if (items.length == 0) {
    return res.status(404).send("No Items Found");
  }
  res.status(200).send(items);
});

router.get("/api/items/:_id", Id_Middleware, async (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { Id } = req;
  const item = await Item.findById(Id);
  if (!item) {
    return res.status(404).send("Item not found");
  }
  if (item.user.toString() !== req.session.user._id.toString()) {
    return res.status(403).send("Forbidden : not your item");
  }
  return res.status(200).send(item);
});

router.post("/api/add_item", async (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const {
    body: { type, item, price, quantity },
  } = req;
  const new_item = new Item({
    type,
    item,
    price,
    quantity,
    user: req.session.user._id,
  });
  const saved_item = await new_item.save();
  return res.status(201).send(saved_item);
});

router.put("/api/edit_item/:_id", Id_Middleware, async (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { body, Id } = req;
  const item = await Item.findById(Id);
  if (!item) {
    return res.status(404).send("Item not found");
  }
  if (item.user.toString() !== req.session.user._id.toString()) {
    return res.status(403).send("Forbidden : not your item");
  }
  const updated_item = await Item.findByIdAndUpdate(Id, body, { new: true });
  return res.status(200).send(updated_item);
});

router.delete("/api/delete_item/:_id", Id_Middleware, async (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { Id } = req;
  const item = await Item.findById(Id);
  if (!item) {
    return res.status(404).send("Item not found");
  }
  if (item.user.toString() !== req.session.user._id.toString()) {
    return res.status(403).send("Forbidden : not your item");
  }
  await Item.findByIdAndDelete(Id);
  return res.status(200).send("Item Deleted");
});

export default router;
