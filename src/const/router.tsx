export const nologRoutes: Array<string> = ['/login', '/register', '/404'];
export const BASEURL =
  process.env.NODE_ENV == 'production'
    ? 'http://47.96.155.159:8083'
    : 'http://47.96.155.159:8083';
