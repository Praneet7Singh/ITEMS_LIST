import mongoose from "mongoose";

export function Id_Middleware(req, res, next) {
  const {
    params: { _id },
  } = req;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Invalid Id");
  }
  req.Id = _id;
  next();
}
