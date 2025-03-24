import ProcessIcon01 from '@/assets/icons/process_icon_01.svg';
import ProcessIcon02 from '@/assets/icons/process_icon_02.svg';
import ProcessIcon03 from '@/assets/icons/process_icon_03.svg';
import ProcessIcon04 from '@/assets/icons/process_icon_04.svg';

type ProcessStep = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
};

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: '문의 등록',
    description:
      '상담 문의를 등록해 주시면, 담당자가 맞춤형 상담을 제공합니다.',
    icon: ProcessIcon01,
  },
  {
    id: 2,
    title: '관리자 설정',
    description: '관리자 Web 접속 후 결제방식 및 회사정보를 설정합니다.',
    icon: ProcessIcon02,
  },
  {
    id: 3,
    title: '임직원 가입',
    description: '사용자 App에서 회원가입 후 소속 회사 인증을 진행합니다.',
    icon: ProcessIcon03,
  },
  {
    id: 4,
    title: '서비스 이용',
    description: '사용자 App에서 차량 예약을 하고 위블존에서 바로 이용하세요!',
    icon: ProcessIcon04,
  },
];

export default function ServiceGuideSection() {
  return (
    <section>
      <h2>이용 프로세스 안내</h2>
      <ol>
        {processSteps.map((step) => {
          const Icon = step.icon;
          return (
            <li key={step.id}>
              {Icon && <Icon />}
              <div>
                <h3>
                  {step.id}. {step.title}
                </h3>
                <p>{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
