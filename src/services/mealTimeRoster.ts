import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { MealRosterItem, MealRosterItemWithMember } from "../interface/MealRosterItem";

const projectURL = process.env.REACT_APP_SUPABASE_PROJECT_URL;
const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
if (!projectURL || !anonKey) {
  throw new Error("Missing environment variables");
}

const supabaseClient: SupabaseClient = createClient(projectURL, anonKey);

export const readAllMealTimeRosterItems = async () => {
  const { data: meal_time_roster, error } = await supabaseClient.from("meal_time_roster").select("*");
  if (error) {
    throw error;
  }

  return meal_time_roster as MealRosterItem[];
};

export const readAllMealTimeRosterItemsWithMember = async () => {
  const { data: meal_time_roster_w_member, error } = await supabaseClient.from("meal_time_roster").select(`
        *,
        rota_members (
          first_name,
          last_name,
          type,
          rank
        )
      `);

  if (error) {
    throw error;
  }

  return meal_time_roster_w_member as MealRosterItemWithMember[];
};

export const updateFoodOrderDetails = async (meal_time_roster_item: MealRosterItem) => {
  const { data, error } = await supabaseClient
    .from("meal_time_roster")
    .update({
      food: meal_time_roster_item.food,
      drink: meal_time_roster_item.drink,
      price: meal_time_roster_item.price,
      meal_time: meal_time_roster_item.meal_time,
    })
    .eq("member_id", meal_time_roster_item.member_id)
    .select();

  if (error) {
    throw error;
  }

  return data;
};

export const addMealTimeRosterItem = async (meal_time_roster_item: MealRosterItem) => {
  const { data, error } = await supabaseClient.from("meal_time_roster").insert([meal_time_roster_item]).select();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteMealTimeRosterItemsByMemberId = async (member_id: string) => {
  const { error } = await supabaseClient.from("meal_time_roster").delete().eq("member_id", member_id);

  if (error) {
    throw error;
  }

  return true;
};

// New function to truncate the meal_time_roster table
export const truncateMealTimeRoster = async () => {
  const { error } = await supabaseClient.rpc("truncate_table", { table_name: "meal_time_roster" });

  if (error) {
    throw error;
  }

  return true;
};
