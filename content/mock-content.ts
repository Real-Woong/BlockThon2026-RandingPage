import type { LandingContent } from './types';

/**
 * ⚠️ MOCK CONTENT — 실제 행사 정보가 아닙니다.
 * ---------------------------------------------------------------------------
 * 레이아웃을 완성된 상태로 보기 위한 임시 데이터입니다. 모든 값은 지어낸 것이고,
 * 날짜·장소·상금·트랙·심사 기준·파트너·수치는 전부 확정된 사실이 아닙니다.
 *
 * 실제 값으로 바꾸는 방법
 *   1. 이 파일의 값을 그대로 덮어쓰거나,
 *   2. `content/landing-content.ts`(확정 데이터 파일)를 채운 뒤
 *      `.env`에 NEXT_PUBLIC_CONTENT_SOURCE=real 을 넣습니다.
 *
 * 배포 전 반드시 확인
 *   - NEXT_PUBLIC_CONTENT_SOURCE 가 `real` 인지
 *   - 아래 `// TODO(content):` 표시가 남아 있지 않은지
 *
 * 각 필드의 의미와 공개 규칙은 CONTENT.md를 따릅니다.
 */
export const mockContent: LandingContent = {
  // --- 2. 기본 정보 --------------------------------------------------------
  organizer: { state: 'confirmed', value: 'blockblock' },
  creativeName: { state: 'confirmed', value: 'block_block pixel' },
  // TODO(content): 확정된 공식 행사명으로 교체
  officialEventName: { state: 'confirmed', value: 'block_block pixel 2026' },
  // TODO(content): 한 줄 성격 규정 (무엇을 하는 행사인가)
  descriptor: { state: 'confirmed', value: 'Sui · Walrus 온체인 빌드 해커톤' },
  valueProposition: {
    state: 'confirmed',
    value: '3일 동안 아이디어를 온체인에서 도는 제품까지 밀어붙입니다.',
  },
  // TODO(content): 확정 일정
  date: { state: 'confirmed', value: '2026.03.13 FRI – 03.15 SUN' },
  applicationPeriod: { state: 'confirmed', value: '2026.01.19 – 02.20' },
  location: { state: 'confirmed', value: '서울 성수' },
  format: { state: 'confirmed', value: '오프라인 3일 · 팀당 최대 4인' },
  // TODO(content): 실제 신청 폼 URL. 지금은 페이지 하단 CTA 섹션으로만 이동합니다.
  applyUrl: { state: 'confirmed', value: '#apply' },
  // TODO(content): 실제 문의 채널
  contact: { state: 'confirmed', value: 'hello@blockblock.example' },

  // --- 3. Navigation -------------------------------------------------------
  navigation: {
    state: 'confirmed',
    value: [
      { id: 'about', label: 'ABOUT', href: '#about', state: 'confirmed' },
      { id: 'stack', label: 'STACK', href: '#stack', state: 'confirmed' },
      { id: 'program', label: 'PROGRAM', href: '#program', state: 'confirmed' },
      { id: 'tracks', label: 'TRACKS', href: '#tracks', state: 'confirmed' },
      { id: 'faq', label: 'FAQ', href: '#faq', state: 'confirmed' },
    ],
  },

  // --- 4. Hero -------------------------------------------------------------
  hero: {
    state: 'confirmed',
    value: {
      presentedBy: 'blockblock',
      eventName: 'block_block pixel',
      descriptor: 'Sui · Walrus 온체인 빌드 해커톤',
      // 줄바꿈은 브레이크포인트별로 직접 검수한 위치입니다.
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
  },

  // --- 5. Manifesto / About ------------------------------------------------
  about: {
    state: 'confirmed',
    value: {
      statement: '데모가 아니라\n돌아가는 것을 만든다',
      body: '해커톤이 끝나는 순간 대부분의 프로젝트는 멈춥니다. block_block pixel은 그 다음을 전제로 설계했습니다. 심사 기준도, 멘토링도, 상금 이후의 지원도 전부 "3일 뒤에도 살아 있는가"에 맞춰져 있습니다.',
      principles: [
        '온체인에서 실제로 동작하는 것만 심사한다',
        '팀이 직접 쓴 코드와 직접 내린 결정을 본다',
        '행사 종료가 프로젝트의 종료가 되지 않게 한다',
      ],
    },
  },

  // --- 6. Ecosystem / Stack ------------------------------------------------
  stack: {
    state: 'confirmed',
    value: {
      intro: '두 개의 레이어 위에서 만듭니다. 실행은 Sui가, 데이터는 Walrus가 맡고 팀은 그 사이를 잇는 제품을 설계합니다.',
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
  },

  // --- 7. Program / Build Path ---------------------------------------------
  program: {
    state: 'confirmed',
    value: {
      intro: '사전 세션에서 스택을 익히고, 본 행사 3일 동안 만들고, 마지막 날 데모로 마칩니다.',
      phases: [
        {
          id: 'phase-01',
          label: 'PRE',
          date: '02.28',
          title: '온라인 사전 세션',
          description: 'Sui Move와 Walrus 기본기를 다루는 2시간 세션. 참가 확정자 전원 대상.',
          state: 'confirmed',
        },
        {
          id: 'phase-02',
          label: 'DAY 01',
          date: '03.13',
          title: '킥오프 · 팀 빌딩',
          description: '트랙 소개와 팀 구성, 아이디어 확정까지. 저녁부터 개발 시작.',
          state: 'confirmed',
        },
        {
          id: 'phase-03',
          label: 'DAY 02',
          date: '03.14',
          title: '빌드 · 멘토링',
          description: '종일 개발. 오후에 멘토 라운드가 두 번 있고, 저녁에 중간 점검을 합니다.',
          state: 'confirmed',
        },
        {
          id: 'phase-04',
          label: 'DAY 03',
          date: '03.15',
          title: '데모 · 심사',
          description: '오전 제출 마감, 오후 팀별 5분 데모와 심사, 저녁 시상.',
          state: 'confirmed',
        },
      ],
    },
  },

  // --- 8. Tracks -----------------------------------------------------------
  tracks: {
    state: 'confirmed',
    value: [
      {
        id: 'track-01',
        index: '01',
        title: '온체인 AI 에이전트',
        summary: '스스로 트랜잭션을 만드는 에이전트',
        description:
          '지갑을 쥔 에이전트가 온체인에서 판단하고 실행하는 구조를 다룹니다. 실행 권한의 범위, 실패 처리, 사람이 개입하는 지점까지 설계에 포함해야 합니다.',
        state: 'confirmed',
      },
      {
        id: 'track-02',
        index: '02',
        title: '데이터 소유권',
        summary: 'Walrus 위에 얹는 데이터 제품',
        description:
          '누가 무엇을 저장하고 누가 꺼내 쓸 수 있는지를 제품으로 만드는 트랙입니다. 저장 비용과 접근 제어를 함께 설계해야 합니다.',
        state: 'confirmed',
      },
      {
        id: 'track-03',
        index: '03',
        title: '자유 주제',
        summary: '스택만 지키면 무엇이든',
        description:
          'Sui 또는 Walrus를 실제로 사용하기만 하면 주제는 자유입니다. 위 두 트랙에 들어가지 않는 시도를 위한 자리입니다.',
        state: 'confirmed',
      },
    ],
  },

  // --- 9. Support / Rewards ------------------------------------------------
  support: {
    state: 'confirmed',
    value: {
      // TODO(content): 확정 상금. 미확정이면 이 필드를 지우면 섹션에서 사라집니다.
      totalPrize: '30,000,000',
      currency: 'KRW 총 상금',
      items: [
        { id: 'support-01', label: '대상 1팀', detail: '15,000,000 KRW · 후속 빌드 지원 연계', state: 'confirmed' },
        { id: 'support-02', label: '최우수 2팀', detail: '각 5,000,000 KRW', state: 'confirmed' },
        { id: 'support-03', label: '트랙상 3팀', detail: '각 1,500,000 KRW', state: 'confirmed' },
      ],
      followUpBenefits: [
        '생태계 파운데이션 그랜트 추천',
        '데모데이 무대 우선 배정',
        'blockblock 빌더 네트워크 합류',
      ],
    },
  },

  // --- 10. Criteria --------------------------------------------------------
  criteria: {
    state: 'confirmed',
    value: [
      {
        id: 'criteria-01',
        index: '01',
        title: '동작',
        description: '데모 시점에 실제로 돌아가는가. 슬라이드가 아니라 실행되는 것을 봅니다.',
        weight: '40%',
        state: 'confirmed',
      },
      {
        id: 'criteria-02',
        index: '02',
        title: '스택 활용',
        description: 'Sui와 Walrus를 형식적으로 얹었는지, 구조적으로 필요해서 썼는지 봅니다.',
        weight: '25%',
        state: 'confirmed',
      },
      {
        id: 'criteria-03',
        index: '03',
        title: '문제 정의',
        description: '누구의 어떤 문제를 푸는지 분명한가. 사용자가 특정되지 않으면 감점합니다.',
        weight: '20%',
        state: 'confirmed',
      },
      {
        id: 'criteria-04',
        index: '04',
        title: '지속 가능성',
        description: '행사 종료 이후에도 이어갈 계획과 근거가 있는가.',
        weight: '15%',
        state: 'confirmed',
      },
    ],
  },

  // --- 11. Proof / Previous Edition ----------------------------------------
  // TODO(content): 근거 없는 숫자는 절대 두지 마세요. 실제 집계값으로 교체하거나
  // 이 블록 전체를 지우면 섹션이 사라집니다.
  proof: {
    state: 'confirmed',
    value: {
      intro: '지난 회차에서 남은 것들입니다.',
      metrics: [
        { id: 'metric-01', label: '참가자', value: '180', source: '2025 회차 집계', state: 'confirmed' },
        { id: 'metric-02', label: '제출 프로젝트', value: '42', source: '2025 회차 집계', state: 'confirmed' },
        { id: 'metric-03', label: '행사 후 개발 지속', value: '11', source: '3개월 후 추적', state: 'confirmed' },
      ],
      achievements: [
        '상위 3팀 중 2팀이 생태계 그랜트를 받았습니다',
        '제출작 전량이 공개 저장소로 남아 있습니다',
      ],
      gallery: [],
    },
  },

  // --- 12. Partners --------------------------------------------------------
  // TODO(content): 아래 이름은 전부 가상입니다. 실제 파트너가 확정되기 전까지
  // 공개하면 안 됩니다. logoUrl을 넣으면 이름 대신 로고가 렌더링됩니다.
  partners: {
    state: 'confirmed',
    value: {
      hosts: [{ id: 'host-01', name: 'blockblock', state: 'confirmed' }],
      mainPartners: [
        { id: 'main-01', name: 'Partner Alpha', state: 'confirmed' },
        { id: 'main-02', name: 'Partner Beta', state: 'confirmed' },
      ],
      techPartners: [
        { id: 'tech-01', name: 'Tech Partner One', state: 'confirmed' },
        { id: 'tech-02', name: 'Tech Partner Two', state: 'confirmed' },
        { id: 'tech-03', name: 'Tech Partner Three', state: 'confirmed' },
      ],
      communityPartners: [
        { id: 'comm-01', name: 'Community A', state: 'confirmed' },
        { id: 'comm-02', name: 'Community B', state: 'confirmed' },
        { id: 'comm-03', name: 'Community C', state: 'confirmed' },
        { id: 'comm-04', name: 'Community D', state: 'confirmed' },
      ],
    },
  },

  // --- 13. FAQ -------------------------------------------------------------
  faqs: {
    state: 'confirmed',
    value: [
      {
        id: 'faq-01',
        question: '블록체인 개발 경험이 없어도 참가할 수 있나요?',
        answer:
          '가능합니다. 사전 온라인 세션에서 Sui Move와 Walrus 기본기를 다루고, 행사 기간에도 멘토가 상주합니다. 다만 웹 또는 앱 개발 경험은 있는 편이 좋습니다.',
        state: 'confirmed',
      },
      {
        id: 'faq-02',
        question: '팀 없이 혼자 신청해도 되나요?',
        answer:
          '됩니다. 첫날 팀 빌딩 세션에서 팀을 구성할 수 있고, 개인 신청자끼리 매칭도 지원합니다. 팀은 최대 4인입니다.',
        state: 'confirmed',
      },
      {
        id: 'faq-03',
        question: '기존에 만들던 프로젝트를 이어서 제출할 수 있나요?',
        answer:
          '기존 코드베이스를 가져오는 것은 가능하지만, 심사는 행사 기간에 새로 만든 부분만 대상으로 합니다. 시작 시점의 저장소 상태를 제출해 주세요.',
        state: 'confirmed',
      },
      {
        id: 'faq-04',
        question: '참가비가 있나요?',
        answer: '없습니다. 3일간의 식사와 작업 공간, 네트워크는 모두 제공됩니다.',
        state: 'confirmed',
      },
      {
        id: 'faq-05',
        question: '제출물의 지식재산권은 누구에게 있나요?',
        answer:
          '전적으로 팀에게 있습니다. 다만 제출작은 공개 저장소로 남기는 것을 참가 조건으로 합니다.',
        state: 'confirmed',
      },
    ],
  },

  // --- 14. Final CTA -------------------------------------------------------
  finalCta: {
    state: 'confirmed',
    value: {
      message: '만들 것이 있다면\n자리는 준비되어 있습니다',
      body: '신청은 2026년 2월 20일에 마감합니다. 팀이 없어도, 아이디어만 있어도 괜찮습니다.',
      label: '참가 신청',
      // TODO(content): 실제 신청 폼 URL
      url: '#apply',
      contact: 'hello@blockblock.example',
    },
  },

  // --- 15. Metadata / SEO --------------------------------------------------
  // 주의: 실제 날짜와 장소가 확정되기 전에는 Event 구조화 데이터를 만들지 않습니다.
  metadata: {
    state: 'confirmed',
    value: {
      title: 'block_block pixel 2026 — blockblock',
      description: 'Sui와 Walrus 위에서 3일 동안 온체인 제품을 만드는 해커톤. 2026년 3월 13일부터 15일까지 서울에서 열립니다.',
      locale: 'ko_KR',
    },
  },
};
