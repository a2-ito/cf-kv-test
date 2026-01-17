import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(req: Request) {
  // const kv = process.env.KV_TEST;
  const { env } = getCloudflareContext();

  const { key } = (await req.json()) as { key?: string };

  if (!key) {
    return new Response("key required", { status: 400 });
  }

  await env.KV_TEST.delete(key);

  return Response.json({ ok: true });
}

