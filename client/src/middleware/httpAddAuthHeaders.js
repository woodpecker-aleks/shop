export function httpAddAuthHeaders(req) {
  const user = JSON.parse(localStorage.getItem('userData'));

  if (user?.token) {
    if (!req.headers) req.headers = {};

    req.headers['Authorization'] = `Bearer ${user.token}`;
  }

  return req;
}