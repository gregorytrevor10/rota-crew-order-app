import { MEMBER_TYPE, SCDF_RANKS } from "../utils";

export interface Member {
  member_id: string;
  created_at: string;
  rank: SCDF_RANKS;
  first_name: string;
  last_name: string;
  type: MEMBER_TYPE;
}
