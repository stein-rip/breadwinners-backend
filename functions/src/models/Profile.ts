import { ObjectId } from "mongodb";

export default interface Profile {
  _id: ObjectId;
  google_id: string;
  display_name: string;
  photo_url: string;
  email: string;
  query: string;
  experience_level: string;
  job_is_remote: boolean;
  job_employment_type: string;
}
