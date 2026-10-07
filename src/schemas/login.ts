import { z } from "zod";

// These are credentials, not SQL or search expressions. Supabase Auth handles them.
export const loginSchema = z.object({
  email: z.string().trim().max(254).email(),
  password: z.string().min(1).max(128),
});
