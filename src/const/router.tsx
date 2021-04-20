export const nologRoutes: Array<string> = ['/login', '/register', '/404'];
export const BASEURL =
  process.env.NODE_ENV == 'production'
    ? 'http://101.200.49.56:8083'
    : 'http://101.200.49.56:8083';
