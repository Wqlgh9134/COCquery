export async function onRequest(context) {
  const { request, env } = context;

  // 处理 CORS 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const url = new URL(request.url);
  const apiPath = url.pathname.replace('/api/', '');

  // 重新编码路径中的特殊字符（如 # 会被编码为 %23）
  const encodedPath = apiPath.split('/').map(seg => encodeURIComponent(decodeURIComponent(seg))).join('/');
  const apiUrl = `https://api.clashofclans.com/${encodedPath}`;

  const apiKey = env.COC_API_KEY;

  // 检查 API Key 是否配置
  if (!apiKey) {
    return new Response(JSON.stringify({
      error: '服务器未配置 COC_API_KEY，请在 Cloudflare Pages 环境变量中设置',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  const response = await fetch(apiUrl, {
    method: request.method,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
    },
  });

  const contentType = response.headers.get('Content-Type') || 'application/json';
  const body = await response.text();

  // 如果是 403，附加诊断信息
  const responseHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': contentType,
  };

  if (response.status === 403) {
    console.error('COC API 返回 403:', {
      requestUrl: apiUrl,
      status: response.status,
      body: body,
    });
  }

  return new Response(body, {
    status: response.status,
    headers: responseHeaders,
  });
}
