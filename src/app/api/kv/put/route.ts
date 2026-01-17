import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(
  req: Request,
) {
  // const kv = process.env.KV_TEST;

  const { env } = getCloudflareContext();
	const kv = env.KV_TEST;

	if (!kv) {
    return Response.json({ error: 'KV binding not found' }, { status: 500 });
  }

const { key, value } = (await req.json()) as {
  key?: string;
  value?: string;
};
  if (!key) return new Response("key required", { status: 400 });

  await kv.put(key, value ?? "");
  return Response.json({ ok: true });
}
