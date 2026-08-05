import type { ProfileRepository } from "../../repository";
import type { Profile } from "../../types";
import { createClient } from "@/lib/supabase/server";

export const supabaseProfileRepository: ProfileRepository = {
  async getById(id) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("id, is_admin, full_name")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) return null;

    return {
      id: data.id as string,
      is_admin: Boolean(data.is_admin),
      full_name: (data.full_name as string | null) ?? null,
    } satisfies Profile;
  },

  async isAdmin(userId) {
    const profile = await this.getById(userId);
    return Boolean(profile?.is_admin);
  },
};
