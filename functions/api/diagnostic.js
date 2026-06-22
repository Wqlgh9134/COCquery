export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // 获取请求来源 IP
  const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';

  // 测试 COC API 连接
  let testResult = {};
  const apiKey = env.COC_API_KEY;

  // 获取本机出口 IP（发起请求到第三方 IP 检测服务）
  let egressIP = 'unknown';
  try {
    const ipResp = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResp.json();
    egressIP = ipData.ip;
  } catch (e) {
    egressIP = '无法检测（请手动检查）';
  }

  // 测试 COC API
  let cocApiStatus = '未测试';
  if (apiKey) {
    try {
      const testResp = await fetch('https://api.clashofclans.com/v1/locations', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
        },
      });
      const testBody = await testResp.text();
      cocApiStatus = `状态码: ${testResp.status}，响应: ${testBody.slice(0, 200)}`;
    } catch (e) {
      cocApiStatus = `请求失败: ${e.message}`;
    }
  } else {
    cocApiStatus = '未配置 COC_API_KEY 环境变量';
  }

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="UTF-8"><title>诊断信息</title></head>
<body style="font-family: monospace; padding: 20px;">
  <h2>Cloudflare Pages Functions 诊断</h2>
  <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">
    <tr><td><b>用户请求来源 IP</b></td><td>${clientIP}</td></tr>
    <tr><td><b>Cloudflare Functions 出口 IP</b></td><td style="font-size: 1.2em; color: red; font-weight: bold;">${egressIP}</td></tr>
    <tr><td><b>COC API 测试结果</b></td><td>${cocApiStatus}</td></tr>
    <tr><td><b>环境变量 COC_API_KEY</b></td><td>${apiKey ? '已配置 (' + apiKey.slice(0, 8) + '...)' : '未配置'}</td></tr>
  </table>
  <p style="margin-top: 20px;">把 <b>出口 IP</b> 添加到 COC API Key 的 Allowed IP Addresses 中。</p>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
