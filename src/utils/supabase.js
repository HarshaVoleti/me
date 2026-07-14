import { createClient } from "@supabase/supabase-js";
import { getVisitorContext, getVisitorContextWithSeq } from "./visitor.js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

export async function trackPageView(section = null) {
  await supabase.from("page_views").insert({
    ...getVisitorContextWithSeq(),
    section,
    referrer: document.referrer || null,
  });
}

export async function submitContact({ name, email, message }) {
  const { error } = await supabase
    .from("contact_submissions")
    .insert({ ...getVisitorContext(), name, email, message });
  if (error) throw error;
}
