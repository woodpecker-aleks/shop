export function httpReqToJson(req) {
  req.body = JSON.stringify(req.body);

  req.headers['Content-type'] = 'application/json';

  return req;
}