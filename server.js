// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const dbConnect = require('./src/lib/dbconnect'); // Import the dbConnect function

// Initialize Next.js
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

// Prepare and start the server
app.prepare().then(async() => {
  await dbConnect();
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    console.log(`Handling request for: ${pathname}`);

    // Handle custom routes
    if (pathname === '/a') {
      app.render(req, res, '/a', query);
      console.log(`Query parameters for /a: ${JSON.stringify(query)}`);
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query);
      console.log(`Query parameters for /b: ${JSON.stringify(query)}`);
    } else if (pathname.startsWith('/api/')) {
      // Handle API routes
      handle(req, res, parsedUrl);
    } else {
      // Handle other requests
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:3000`);
  });
});
