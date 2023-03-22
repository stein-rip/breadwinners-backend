// require the express module
import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import Favorite from "../models/Favorite";

const favoriteRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

favoriteRouter.get("/users/:profile_id/favorites", async (req, res) => {
  try {
    const profile_id = new ObjectId(req.params.profile_id);
    const client = await getClient();
    const results = await client
      .db()
      .collection<Favorite>("favorites")
      .find({ profile_id })
      .toArray();
    res.status(200).json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

favoriteRouter.post("/users/:profile_id/favorites", async (req, res) => {
  try {
    const newFavorite: Favorite = req.body as Favorite;
    const profile_id = new ObjectId(req.params.profile_id);
    newFavorite.profile_id = profile_id;
    const client = await getClient();
    await client.db().collection<Favorite>("favorites").insertOne(newFavorite);
    res.status(201).json(newFavorite);
  } catch (err) {
    errorResponse(err, res);
  }
});

favoriteRouter.delete("/users/:profile_id/favorites/:id", async (req, res) => {
  try {
    const profile_id = new ObjectId(req.params.profile_id);
    const id = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Favorite>("favorites")
      .deleteOne({ profile_id: profile_id, "job.id": id });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch {}
});

export default favoriteRouter;
