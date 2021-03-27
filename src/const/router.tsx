export const nologRoutes: Array<string> = ['/login', '/register', '/404'];
export const BASEURL =
  process.env.NODE_ENV == 'production'
    ? 'http://localhost:8083/other'
    : 'http://localhost:8083/other';
