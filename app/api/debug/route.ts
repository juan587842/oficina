import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const envOk = {
    url_defined: !!url,
    url_value: url ? url.slice(0, 30) + "..." : "UNDEFINED",
    key_defined: !!key,
    key_type: key?.startsWith("eyJ") ? "JWT (correto)" : key?.startsWith("sb_") ? "publishable (talvez incompatível)" : "UNDEFINED",
    key_preview: key ? key.slice(0, 20) + "..." : "UNDEFINED",
  };

  let sessionResult: any = null;
  let clientesResult: any = null;

  try {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    sessionResult = {
      user_id: user?.id ?? null,
      user_email: user?.email ?? null,
      error: userError?.message ?? null,
    };

    const { data, error, count } = await supabase
      .from("clientes")
      .select("id, nome", { count: "exact" })
      .limit(3);

    clientesResult = {
      count,
      sample: data,
      error: error?.message ?? null,
      error_code: (error as any)?.code ?? null,
    };
  } catch (e: any) {
    sessionResult = { exception: e?.message };
  }

  return NextResponse.json({ env: envOk, session: sessionResult, clientes: clientesResult }, { status: 200 });
}
