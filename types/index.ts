type CategoryType = 'CONSULT' | 'USAGE';

type ConsultFaqCategoryType = 'PRODUCT' | 'COUNSELING' | 'CONTRACT';

type UsageFaqCategoryType =
  | 'COUPON'
  | 'REFUEL'
  | 'SIGN_UP'
  | 'BUSINESS'
  | 'ACCIDENT'
  | 'RESERVATION'
  | 'VEHICLE';

type Category = {
  categoryID: ConsultFaqCategoryType | UsageFaqCategoryType;
  name: string;
};

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
  CategoryType,
  ConsultFaqCategoryType,
  UsageFaqCategoryType,
  Faq,
  Category,
  PageInfo,
  FaqResponse,
};
