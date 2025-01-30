import { z } from 'zod';

export const RepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.string().url(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
  owner: z.object({
    login: z.string(),
    avatar_url: z.string().url(),
  }),
  updated_at: z.string(),
});

export type Repo = z.infer<typeof RepoSchema>;

export const ReposResponseSchema = z.object({
  items: z.array(RepoSchema),
  total_count: z.number(),
});

export type ReposResponse = z.infer<typeof ReposResponseSchema>;
