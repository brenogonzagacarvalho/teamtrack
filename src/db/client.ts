import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import * as schema from './schema';

// Creates an in-browser indexedDB persistent Postgres instance
const client = new PGlite('idb://teamtrack-db');

export const db = drizzle(client, { schema });
