import { parse } from 'cookie';

async function handleRequest(request) {
  // extract cookies from request
  const cookie = parse(request.headers.get('Cookie') || '');
  const url = new URL(request.url);

  // parse current request to get queries params
  const queryParams = new URLSearchParams(url.search);

  let firstIdCookie = null;
  if (queryParams.has('firstId') && queryParams.has('redirectUri')) {
	  // in this case we just have been redirected from FirstID to the home page
	  // we will set the cookie with the firstID and go to the final page

	  // extract firstID value from query params
	  let firstid = queryParams.get('firstId');

	  // extract the final uri where we will redirect the user
	  const redirectUrl = decodeURIComponent(queryParams.get('redirectUri'));

	  // build the firstid cookie header
	  firstIdCookie = `firstid=${firstid}; path=/; secure; HttpOnly; SameSite=Strict`

	  // build the redirect response
	  const response = Response.redirect(`${url.protocol}//${url.host}${redirectUrl}`, 302)

	  // Clone the response so that it's no longer immutable
	  const newResponse = new Response(response.body, response);

	  newResponse.headers.set("Set-Cookie", firstIdCookie)

	  return newResponse
  }

  if (cookie['firstid'] != null) {
	// in this case, user has already a firstid cookie
	// just continue the request execution
	return await fetch(request);
  } else {
	  // no firstid, go to FirstID gate
	  const response = Response.redirect(`${FIRST_ID_GATE_URL}?redirectHost=${encodeURIComponent(url.protocol+'//'+url.host)}&redirectUri=${encodeURIComponent(url.pathname + (url.search ? '?'+url.search : ''))}`, 302);

	  return response
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});