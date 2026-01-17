import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  _: Request,
) {
  const { env } = getCloudflareContext();

  const list = await env.KV_TEST.list();

	console.log(list);

  return Response.json(list.keys);
}
