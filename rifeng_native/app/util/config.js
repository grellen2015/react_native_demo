const devBASE_URL = 'http://localhost:8081';
const proBASE_URL = 'http://localhost:8081';
// const devBASE_URL = 'http://httpbin.org/';
// const proBASE_URL = 'http://httpbin.org/';

export const BASE_URL =
  process.env.NODE_ENV === 'development' ? devBASE_URL : proBASE_URL;

export const TIMEOUT = 5000;
