import { NextRequest, NextResponse } from 'next/server';
import consultFaqsData from '@/mocks/consult_faqs.json';
import usageFaqsData from '@/mocks/usage_faqs.json';
import {
  CategoryType,
  ConsultFaqCategoryType,
  UsageFaqCategoryType,
  Faq,
} from '@/types';
import { createResponse } from '@/utils/pagination';

const consultFaqs = consultFaqsData as Record<ConsultFaqCategoryType, Faq[]>;
const usageFaqs = usageFaqsData as Record<UsageFaqCategoryType, Faq[]>;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Number(searchParams.get('limit') || '10');
  const offset = Number(searchParams.get('offset') || '0');
  const tab = searchParams.get('tab') as CategoryType | null;
  const faqCategoryID = searchParams.get('faqCategoryID');

  if (tab === 'CONSULT') {
    if (!faqCategoryID) {
      const allConsultFaqs = Object.values(consultFaqs).flat();
      return NextResponse.json(createResponse(allConsultFaqs, offset, limit));
    }

    const categoryId = faqCategoryID as ConsultFaqCategoryType;
    if (categoryId in consultFaqs) {
      const faqs = consultFaqs[categoryId];
      return NextResponse.json(createResponse(faqs, offset, limit));
    }

    return NextResponse.json(createResponse([], offset, limit));
  }

  if (tab === 'USAGE') {
    if (!faqCategoryID) {
      const allUsageFaqs = Object.values(usageFaqs).flat();
      return NextResponse.json(createResponse(allUsageFaqs, offset, limit));
    }

    const categoryId = faqCategoryID as UsageFaqCategoryType;
    if (categoryId in usageFaqs) {
      const faqs = usageFaqs[categoryId];
      return NextResponse.json(createResponse(faqs, offset, limit));
    }

    return NextResponse.json(createResponse([], offset, limit));
  }

  return NextResponse.json(createResponse([], offset, limit));
}
