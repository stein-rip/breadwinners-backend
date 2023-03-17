import { ObjectId } from "mongodb";
interface JobHighlights {
  Qualifications: string[];
  Responsibilities: string[];
  Benefits: null | string[];
}

interface Job {
  employer_name: string;
  employer_logo: string;
  employer_company_type: string;
  job_id: string;
  job_title: string;
  job_description: string;
  job_is_remote: boolean;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;
  job_city: null | string;
  job_state: null | string;
  job_country: null | string;
  // job_benefits?: JobBenefits | null;
  job_offer_expiration_datetime_utc: string;
  job_offer_expiration_timestamp: number;
  job_highlights: JobHighlights;
}

export default interface Favorite {
  _id: ObjectId;
  job: Job;
  userId?: string;
}
