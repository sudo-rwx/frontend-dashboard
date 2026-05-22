import { z } from 'zod';

export const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  OPENAI_API_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  FB_APP_SECRET: z.string().optional(),
  FB_VERIFY_TOKEN: z.string().optional(),
  REDIS_URL: z.string().optional()
});

export const env = envSchema.parse(process.env);
