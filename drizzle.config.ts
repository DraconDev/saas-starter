import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  driver: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
