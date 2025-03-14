import { z } from 'zod';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string(),
  WEB_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);