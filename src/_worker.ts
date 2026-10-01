interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

function withSecurity(res: Response): Response {
  const headers = new Headers(res.headers);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(k)) headers.set(k, v);
  }
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: { ASSETS: { fetch: (req: Request) => Promise<Response> } }): Promise<Response> {
    const url = new URL(request.url);

    // Canonical: HTTPS + non-www (301)
    let redirect = false;
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      redirect = true;
    }
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      redirect = true;
    }
    if (redirect) {
      return Response.redirect(url.toString(), 301);
    }

    // --- Free serverless API (no paid bindings) ---
    if (url.pathname === '/api/health') {
      return Response.json(
        { ok: true, service: 'vibranttechnomad', time: new Date().toISOString() },
        { headers: SECURITY_HEADERS },
      );
    }

    if (url.pathname === '/api/inquiry' && request.method === 'POST') {
      try {
        const body = (await request.json()) as {
          name?: string;
          email?: string;
          offer?: string;
          message?: string;
          page?: string;
        };
        const emailOk = typeof body.email === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email);
        const msgOk = typeof body.message === 'string' && body.message.trim().length >= 10;
        const nameOk = typeof body.name === 'string' && body.name.trim().length >= 2;
        if (!emailOk || !msgOk || !nameOk) {
          return Response.json({ ok: false, error: 'Invalid inquiry' }, { status: 400, headers: SECURITY_HEADERS });
        }
        // Free plan: stateless acknowledgement (wire to Email Service / Queue when keys exist).
        // Never echo PII back beyond confirmation.
        return Response.json(
          {
            ok: true,
            message: 'Inquiry received. For fastest close email sales@desertrich.com with your offer.',
          },
          { headers: SECURITY_HEADERS },
        );
      } catch {
        return Response.json({ ok: false, error: 'Bad request' }, { status: 400, headers: SECURITY_HEADERS });
      }
    }

    if (url.pathname.startsWith('/api/')) {
      return Response.json({ ok: false, error: 'Not found' }, { status: 404, headers: SECURITY_HEADERS });
    }

    const res = await env.ASSETS.fetch(request);
    return withSecurity(res);
  },
};
