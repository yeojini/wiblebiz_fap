import { z } from 'zod';

export const searchSchema = z.object({
  search: z.string().trim().min(1, '검색어를 입력해주세요'),
});

export type SearchFormData = z.infer<typeof searchSchema>;
