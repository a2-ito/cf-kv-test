import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  req: Request,
) {
  // const kv = process.env.KV_TEST;
  const { env } = getCloudflareContext();
	const kv = env.KV_TEST;

  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (!key) return new Response("key required", { status: 400 });

  const value = await kv.get(key);
  return Response.json({ key, value });
}
