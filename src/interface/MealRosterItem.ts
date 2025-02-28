import { MEAL_TIME } from "../utils";
import { Member } from "./Member";

export interface MealRosterItem {
  member_id: string;
  created_at: string;
  food: string;
  drink: string;
  price: number;
  meal_time: MEAL_TIME;
}

export interface MealRosterItemWithMember extends MealRosterItem {
  rota_members: Member;
}
