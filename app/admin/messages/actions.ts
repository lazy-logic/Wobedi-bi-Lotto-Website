/**
 * Server actions for the /admin/messages inbox.
 *
 * Mark a message read/unread, or delete it. All writes go through the
 * route-style Supabase client (writable cookies) so the in-flight admin
 * session authorises them under the "authenticated can update/delete contact
 * messages" RLS policy (migration 0004). The inbox path is revalidated after
 * each write so the list reflects the change immediately.
 *
 * Auth: middleware.ts gates /admin/* behind a session, so these trust the
 * caller is the admin — and the DB's RLS rejects the write anyway if the
 * session has expired.
 */
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createRouteClient, isSupabaseConfigured } from "@/lib/supabase-server";

async function getClient() {
  const cookieStore = await cookies();
  return createRouteClient({
    getAll: () => cookieStore.getAll(),
    set: (name, value, options) => cookieStore.set(name, value, options),
  });
}

export async function setMessageRead(id: string, read: boolean): Promise<void> {
  if (!isSupabaseConfigured() || !id) return;
  const supabase = await getClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ read } as never)
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(id: string): Promise<void> {
  if (!isSupabaseConfigured() || !id) return;
  const supabase = await getClient();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
