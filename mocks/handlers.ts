import { http, HttpResponse } from 'msw';
import categoriesData from './categories.json';
import consultFaqsData from './consult_faqs.json';
import usageFaqsData from './usage_faqs.json';
import {
  CategoryType,
  ConsultFaqCategoryType,
  UsageFaqCategoryType,
  Faq,
  SubCategoryType,
} from '@/types';
import { createResponse } from '@/utils/pagination';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const { CONSULT, USAGE } = categoriesData;
const consultFaqs = consultFaqsData as Record<ConsultFaqCategoryType, Faq[]>;
const usageFaqs = usageFaqsData as Record<UsageFaqCategoryType, Faq[]>;

export const handlers = [
  http.get(`${baseUrl}/api/faq/category`, async ({ request }) => {
    console.log('get /api/faq/category');
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
    const faqCategoryID = url.searchParams.get(
      'faqCategoryID',
    ) as SubCategoryType | null;
    const query = url.searchParams.get('query');

    if (query) {
      if (!tab) {
        return HttpResponse.json(createResponse([], offset, limit));
      }

      if (!faqCategoryID) {
        const allFaqs = tab === 'CONSULT' ? consultFaqs : usageFaqs;
        const allFaqsArray = Object.values(allFaqs).flat();
        const filteredFaqs = allFaqsArray.filter(
          (faq) => faq.question.includes(query) || faq.answer.includes(query),
        );
        return HttpResponse.json(createResponse(filteredFaqs, offset, limit));
      }

      const faqsToSearch =
        tab === 'CONSULT'
          ? consultFaqs[faqCategoryID as ConsultFaqCategoryType]
          : usageFaqs[faqCategoryID as UsageFaqCategoryType];
      const filteredFaqs = faqsToSearch.filter(
        (faq) => faq.question.includes(query) || faq.answer.includes(query),
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
