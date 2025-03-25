import { http, HttpResponse } from 'msw';
import categoriesData from './categories.json';
import consultFaqsData from './consult_faqs.json';
import usageFaqsData from './usage_faqs.json';
import {
  CategoryType,
  ConsultFaqCategoryType,
  UsageFaqCategoryType,
  Faq,
} from '@/types';
import { createResponse } from '@/utils/pagination';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const { CONSULT, USAGE } = categoriesData;
const consultFaqs = consultFaqsData as Record<ConsultFaqCategoryType, Faq[]>;
const usageFaqs = usageFaqsData as Record<UsageFaqCategoryType, Faq[]>;

export const handlers = [
  http.get(`${baseUrl}/api/faq/category`, async ({ request }) => {
    const url = new URL(request.url);
    const tab = url.searchParams.get('tab') as CategoryType | null;

    if (tab === 'CONSULT') {
      return HttpResponse.json(CONSULT);
    }

    if (tab === 'USAGE') {
      return HttpResponse.json(USAGE);
    }

    return new HttpResponse(null, { status: 400 });
  }),

  http.get(`${baseUrl}/api/faq`, async ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') || '10');
    const offset = Number(url.searchParams.get('offset') || '0');
    const tab = url.searchParams.get('tab') as CategoryType | null;
    const faqCategoryID = url.searchParams.get('faqCategoryID');
    const query = url.searchParams.get('query');

    if (query) {
      const allConsultFaqs = Object.values(consultFaqs).flat();
      const allUsageFaqs = Object.values(usageFaqs).flat();
      const allFaqs = [...allConsultFaqs, ...allUsageFaqs];
      const filteredFaqs = allFaqs.filter((faq) =>
        faq.question.includes(query),
      );
      return HttpResponse.json(createResponse(filteredFaqs, offset, limit));
    }

    if (tab === 'CONSULT') {
      if (!faqCategoryID) {
        const allConsultFaqs = Object.values(consultFaqs).flat();
        return HttpResponse.json(createResponse(allConsultFaqs, offset, limit));
      }

      const categoryId = faqCategoryID as ConsultFaqCategoryType;
      if (categoryId in consultFaqs) {
        const faqs = consultFaqs[categoryId];
        return HttpResponse.json(createResponse(faqs, offset, limit));
      }

      return HttpResponse.json(createResponse([], offset, limit));
    }

    if (tab === 'USAGE') {
      if (!faqCategoryID) {
        const allUsageFaqs = Object.values(usageFaqs).flat();
        return HttpResponse.json(createResponse(allUsageFaqs, offset, limit));
      }

      const categoryId = faqCategoryID as UsageFaqCategoryType;
      if (categoryId in usageFaqs) {
        const faqs = usageFaqs[categoryId];
        return HttpResponse.json(createResponse(faqs, offset, limit));
      }

      return HttpResponse.json(createResponse([], offset, limit));
    }

    return HttpResponse.json(createResponse([], offset, limit));
  }),
];
