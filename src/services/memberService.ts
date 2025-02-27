import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Member } from "../interface/Member";

const projectURL = process.env.REACT_APP_SUPABASE_PROJECT_URL;
const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
if (!projectURL || !anonKey) {
  throw new Error("Missing environment variables");
}

const supabaseClient: SupabaseClient = createClient(projectURL, anonKey);

export const fetchPagedRotaMembers = async (start: number, end: number) => {
  const { data: rota_members, error } = await supabaseClient.from("rota_members").select("*").range(start, end);

  if (error) {
    throw error;
  }

  const hasNextPage = rota_members.length === end - start + 1;
  return { rota_members, hasNextPage };
};

export const readAllRotaMembers = async () => {
  const { data: rota_members, error } = await supabaseClient.from("rota_members").select("*");

  if (error) {
    throw error;
  }

  return rota_members as Member[];
};

export const deleteMemberById = async (member_id: string) => {
  const { error } = await supabaseClient.from("rota_members").delete().eq("member_id", member_id);

  if (error) {
    throw error;
  }

  return true;
};

export const addMember = async (member: Omit<Member, "member_id" | "created_at">) => {
  const { data, error } = await supabaseClient.from("rota_members").insert([member]).select();

  if (error) {
    throw error;
  }

  return data;
};
