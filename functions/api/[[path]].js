export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  // 前端 BASE_URL = '/api/v1', 请求路径如 /api/v1/clans/%23ABC
  // 去掉 /api/ 前缀后, 拼接到 COC API
  const apiPath = url.pathname.replace('/api/', '');
  const apiUrl = `https://api.clashofclans.com/${apiPath}`;

  const response = await fetch(apiUrl, {
    method: request.method,
    headers: {
      'Authorization': `Bearer ${env.COC_API_KEY}`,
      'Accept': 'application/json',
    },
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}
