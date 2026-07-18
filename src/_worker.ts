export default {
  async fetch(request: Request, env: { ASSETS: { fetch: (req: Request) => Promise<Response> } }): Promise<Response> {
    const url = new URL(request.url);
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

    return env.ASSETS.fetch(request);
  },
};
