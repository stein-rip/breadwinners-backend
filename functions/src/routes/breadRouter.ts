import express from "express";
import { getClient } from "../db";
import Shoutout from "../models/Bread";

const shoutoutRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

shoutoutRouter.get("/shoutouts", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Shoutout>("shoutouts").find();
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default shoutoutRouter;
