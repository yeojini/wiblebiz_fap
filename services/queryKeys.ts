import { CategoryType, SubCategoryType } from '@/types';

export const QUERY_KEYS = {
  FAQ: {
    CATEGORIES: (category: CategoryType) =>
      ['faq', 'categories', category] as const,
    LIST: (
      category: CategoryType,
      subCategory: SubCategoryType,
      query?: string,
    ) => ['faq', 'list', category, subCategory, query] as const,
  },
} as const;
