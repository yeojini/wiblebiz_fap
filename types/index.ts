type Category = 'CONSULT' | 'USAGE';

type ConsultFaqCategory = 'PRODUCT' | 'COUNSELING' | 'CONTRACT';

type UsageFaqCategory =
  | 'COUPON'
  | 'REFUEL'
  | 'SIGN_UP'
  | 'BUSINESS'
  | 'ACCIDENT'
  | 'RESERVATION'
  | 'VEHICLE';

type Faq = {
  id: number;
  categoryName: string;
  subCategoryName: string;
  question: string;
  answer: string;
};

type PageInfo = {
  totalRecord: number;
  offset: number;
  limit: number;
  prevOffset: number;
  nextOffset: number;
};

type FaqResponse = {
  pageInfo: PageInfo;
  items: Faq[];
};

export type {
  Category,
  ConsultFaqCategory,
  UsageFaqCategory,
  Faq,
  PageInfo,
  FaqResponse,
};
