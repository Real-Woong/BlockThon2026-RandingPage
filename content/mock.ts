import type { EventContent } from './types';

/**
 * ⚠️ MOCK — 실제 행사 정보가 아닙니다.
 * ===========================================================================
 * 레이아웃을 완성된 상태로 보기 위한 임시 데이터입니다. 날짜·장소·상금·트랙·
 * 심사 기준·파트너·수치는 전부 지어낸 값이고 확정된 사실이 아닙니다.
 *
 * 이 파일은 고치지 마세요. 실제 값은 `content/event.ts`에 넣고
 * `NEXT_PUBLIC_CONTENT_SOURCE=real` 로 전환합니다. 실데이터가 다 들어가면
 * 이 파일은 삭제해도 됩니다.
 */
export const mock: EventContent = {
  organizer: 'blockblock',
  creativeName: 'block_block pixel',
  officialEventName: 'block_block pixel 2026',
  descriptor: 'Sui · Walrus 온체인 빌드 해커톤',
  valueProposition: '3일 동안 아이디어를 온체인에서 도는 제품까지 밀어붙입니다.',
  date: '2026.03.13 FRI – 03.15 SUN',
  applicationPeriod: '2026.01.19 – 02.20',
  location: '서울 성수',
  format: '오프라인 3일 · 팀당 최대 4인',
  applyUrl: '#apply',
  contact: 'hello@blockblock.example',

  navigation: [
    { label: 'ABOUT', href: '#about' },
    { label: 'STACK', href: '#stack' },
    { label: 'PROGRAM', href: '#program' },
    { label: 'TRACKS', href: '#tracks' },
    { label: 'FAQ', href: '#faq' },
  ],

  hero: {
    presentedBy: 'blockblock',
    eventName: 'block_block pixel',
    descriptor: 'Sui · Walrus 온체인 빌드 해커톤',
    headline: '작은 픽셀 하나가\n돌아가는 프로토콜이 될 때까지',
    body: '설계부터 배포까지 3일. Sui의 실행과 Walrus의 저장 위에서 팀이 직접 만든 것만 남습니다.',
    primaryCtaLabel: '참가 신청',
    primaryCtaUrl: '#apply',
    secondaryCtaLabel: '프로그램 보기',
    secondaryCtaUrl: '#program',
    date: '2026.03.13 – 03.15',
    location: '서울 성수',
    format: '오프라인 3일',
  },

  about: {
    statement: '데모가 아니라\n돌아가는 것을 만든다',
    body: '해커톤이 끝나는 순간 대부분의 프로젝트는 멈춥니다. block_block pixel은 그 다음을 전제로 설계했습니다. 심사 기준도, 멘토링도, 상금 이후의 지원도 전부 "3일 뒤에도 살아 있는가"에 맞춰져 있습니다.',
    principles: [
      '온체인에서 실제로 동작하는 것만 심사한다',
      '팀이 직접 쓴 코드와 직접 내린 결정을 본다',
      '행사 종료가 프로젝트의 종료가 되지 않게 한다',
    ],
  },

  stack: {
    intro:
      '두 개의 레이어 위에서 만듭니다. 실행은 Sui가, 데이터는 Walrus가 맡고 팀은 그 사이를 잇는 제품을 설계합니다.',
    suiRole: 'Move 기반 실행 계층. 소유권과 트랜잭션, 상태 전이를 담당합니다.',
    walrusRole: '분산 저장 계층. 모델·미디어·로그처럼 체인에 올리기 무거운 데이터를 보관합니다.',
    modules: [
      'Move 스마트 컨트랙트 설계',
      'Walrus blob 저장과 검증',
      '지갑 연동과 트랜잭션 서명',
      '온체인 데이터 인덱싱',
    ],
    output: '3일 뒤 배포된 데모와 공개 저장소',
  },

  program: {
    intro: '사전 세션에서 스택을 익히고, 본 행사 3일 동안 만들고, 마지막 날 데모로 마칩니다.',
    phases: [
      {
        label: 'PRE',
        date: '02.28',
        title: '온라인 사전 세션',
        description: 'Sui Move와 Walrus 기본기를 다루는 2시간 세션. 참가 확정자 전원 대상.',
      },
      {
        label: 'DAY 01',
        date: '03.13',
        title: '킥오프 · 팀 빌딩',
        description: '트랙 소개와 팀 구성, 아이디어 확정까지. 저녁부터 개발 시작.',
      },
      {
        label: 'DAY 02',
        date: '03.14',
        title: '빌드 · 멘토링',
        description: '종일 개발. 오후에 멘토 라운드가 두 번 있고, 저녁에 중간 점검을 합니다.',
      },
      {
        label: 'DAY 03',
        date: '03.15',
        title: '데모 · 심사',
        description: '오전 제출 마감, 오후 팀별 5분 데모와 심사, 저녁 시상.',
      },
    ],
  },

  tracks: [
    {
      title: '온체인 AI 에이전트',
      summary: '스스로 트랜잭션을 만드는 에이전트',
      description:
        '지갑을 쥔 에이전트가 온체인에서 판단하고 실행하는 구조를 다룹니다. 실행 권한의 범위, 실패 처리, 사람이 개입하는 지점까지 설계에 포함해야 합니다.',
    },
    {
      title: '데이터 소유권',
      summary: 'Walrus 위에 얹는 데이터 제품',
      description:
        '누가 무엇을 저장하고 누가 꺼내 쓸 수 있는지를 제품으로 만드는 트랙입니다. 저장 비용과 접근 제어를 함께 설계해야 합니다.',
    },
    {
      title: '자유 주제',
      summary: '스택만 지키면 무엇이든',
      description:
        'Sui 또는 Walrus를 실제로 사용하기만 하면 주제는 자유입니다. 위 두 트랙에 들어가지 않는 시도를 위한 자리입니다.',
    },
  ],

  support: {
    totalPrize: '30,000,000',
    currency: 'KRW 총 상금',
    items: [
      { label: '대상 1팀', detail: '15,000,000 KRW · 후속 빌드 지원 연계' },
      { label: '최우수 2팀', detail: '각 5,000,000 KRW' },
      { label: '트랙상 3팀', detail: '각 1,500,000 KRW' },
    ],
    followUpBenefits: [
      '생태계 파운데이션 그랜트 추천',
      '데모데이 무대 우선 배정',
      'blockblock 빌더 네트워크 합류',
    ],
  },

  criteria: [
    {
      title: '동작',
      description: '데모 시점에 실제로 돌아가는가. 슬라이드가 아니라 실행되는 것을 봅니다.',
      weight: '40%',
    },
    {
      title: '스택 활용',
      description: 'Sui와 Walrus를 형식적으로 얹었는지, 구조적으로 필요해서 썼는지 봅니다.',
      weight: '25%',
    },
    {
      title: '문제 정의',
      description: '누구의 어떤 문제를 푸는지 분명한가. 사용자가 특정되지 않으면 감점합니다.',
      weight: '20%',
    },
    {
      title: '지속 가능성',
      description: '행사 종료 이후에도 이어갈 계획과 근거가 있는가.',
      weight: '15%',
    },
  ],

  proof: {
    intro: '지난 회차에서 남은 것들입니다.',
    metrics: [
      { value: '180', label: '참가자', source: '2025 회차 집계' },
      { value: '42', label: '제출 프로젝트', source: '2025 회차 집계' },
      { value: '11', label: '행사 후 개발 지속', source: '3개월 후 추적' },
    ],
    achievements: [
      '상위 3팀 중 2팀이 생태계 그랜트를 받았습니다',
      '제출작 전량이 공개 저장소로 남아 있습니다',
    ],
    gallery: [],
  },

  partners: {
    hosts: [{ name: 'blockblock', logoUrl: '', websiteUrl: '', alt: '' }],
    mainPartners: [
      { name: 'Partner Alpha', logoUrl: '', websiteUrl: '', alt: '' },
      { name: 'Partner Beta', logoUrl: '', websiteUrl: '', alt: '' },
    ],
    techPartners: [
      { name: 'Tech Partner One', logoUrl: '', websiteUrl: '', alt: '' },
      { name: 'Tech Partner Two', logoUrl: '', websiteUrl: '', alt: '' },
      { name: 'Tech Partner Three', logoUrl: '', websiteUrl: '', alt: '' },
    ],
    communityPartners: [
      { name: 'Community A', logoUrl: '', websiteUrl: '', alt: '' },
      { name: 'Community B', logoUrl: '', websiteUrl: '', alt: '' },
      { name: 'Community C', logoUrl: '', websiteUrl: '', alt: '' },
      { name: 'Community D', logoUrl: '', websiteUrl: '', alt: '' },
    ],
  },

  faqs: [
    {
      question: '블록체인 개발 경험이 없어도 참가할 수 있나요?',
      answer:
        '가능합니다. 사전 온라인 세션에서 Sui Move와 Walrus 기본기를 다루고, 행사 기간에도 멘토가 상주합니다. 다만 웹 또는 앱 개발 경험은 있는 편이 좋습니다.',
    },
    {
      question: '팀 없이 혼자 신청해도 되나요?',
      answer:
        '됩니다. 첫날 팀 빌딩 세션에서 팀을 구성할 수 있고, 개인 신청자끼리 매칭도 지원합니다. 팀은 최대 4인입니다.',
    },
    {
      question: '기존에 만들던 프로젝트를 이어서 제출할 수 있나요?',
      answer:
        '기존 코드베이스를 가져오는 것은 가능하지만, 심사는 행사 기간에 새로 만든 부분만 대상으로 합니다. 시작 시점의 저장소 상태를 제출해 주세요.',
    },
    {
      question: '참가비가 있나요?',
      answer: '없습니다. 3일간의 식사와 작업 공간, 네트워크는 모두 제공됩니다.',
    },
    {
      question: '제출물의 지식재산권은 누구에게 있나요?',
      answer:
        '전적으로 팀에게 있습니다. 다만 제출작은 공개 저장소로 남기는 것을 참가 조건으로 합니다.',
    },
  ],

  finalCta: {
    message: '만들 것이 있다면\n자리는 준비되어 있습니다',
    body: '신청은 2026년 2월 20일에 마감합니다. 팀이 없어도, 아이디어만 있어도 괜찮습니다.',
    label: '참가 신청',
    url: '#apply',
    contact: 'hello@blockblock.example',
  },

  metadata: {
    title: 'block_block pixel 2026 — blockblock',
    description:
      'Sui와 Walrus 위에서 3일 동안 온체인 제품을 만드는 해커톤. 2026년 3월 13일부터 15일까지 서울에서 열립니다.',
    ogImage: '',
    canonicalUrl: '',
    locale: 'ko_KR',
  },
};
