// Server Component (default)
import fs from 'fs';
import path from 'path';

import HomeClient from './home-client'; // Import the client component

// Data fetching happens here, on the server
const allPath = path.join(process.cwd(), 'public', 'data', 'index.json');
const allData = JSON.parse(fs.readFileSync(allPath, 'utf8')) as Record<string, any>;
const slugs   = Object.keys(allData);

export default function Page() {
  // Render the Client Component, passing the server-fetched data as props
  return <HomeClient slugs={slugs} meta={allData} />;
}