import { z } from 'zod';

const envVariables = z.object({
  NEXT_PUBLIC_SUPABASEURL: z.string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY: z.string(),
  NEXT_PUBLIC_BUCKET_NAME: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
