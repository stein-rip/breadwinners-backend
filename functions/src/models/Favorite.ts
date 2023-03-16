import { ObjectId } from "mongodb";

interface Original {
  url: string;
}

interface Images {
  original: Original;
}

interface Job {
  id: string;
  title: string;
  images: Images;
}

export default interface Favorite {
  _id: ObjectId;
  job: Job;
  userId?: string;
}
