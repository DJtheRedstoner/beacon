export interface Env {
	KV: KVNamespace;
	KEY: string;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.includes(env.KEY)) {
			await env.KV.put("lastbeacon", Date.now().toString());
			return new Response("OK");
		}

		const data = await env.KV.get("lastbeacon", "json");

		return new Response(JSON.stringify({
			lastbeacon: data
		}), {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		});
	},
};
