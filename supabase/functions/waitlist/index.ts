import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type WaitlistPayload = {
  email?: string;
  name?: string | null;
  role?: string | null;
  source?: string | null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const tableName = Deno.env.get("WAITLIST_TABLE") ?? "waitlist_signups";

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(
      JSON.stringify({ error: "Missing Supabase function secrets" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  let payload: WaitlistPayload;

  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const email = payload.email?.trim().toLowerCase();
  const name = payload.name?.trim() || null;
  const role = payload.role?.trim() || null;
  const source = payload.source?.trim() || null;

  if (!email || !source) {
    return new Response(JSON.stringify({ error: "Email and source are required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { error } = await supabase.from(tableName).insert({
    email,
    name,
    role,
    source,
  });

  if (error) {
    const isDuplicate = error.code === "23505" || error.message.toLowerCase().includes("duplicate");

    return new Response(
      JSON.stringify({
        error: isDuplicate ? "This email is already on the waitlist." : error.message,
      }),
      {
        status: isDuplicate ? 409 : 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
