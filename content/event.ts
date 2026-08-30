import type { EventContent } from './types';

/**
 * ✅ 확정된 행사 정보는 전부 이 파일에 넣습니다. 다른 곳에 없습니다.
 * ===========================================================================
 *
 * 규칙 하나
 *   값을 쓰면 화면에 나오고, 비우면(`''`) 그 요소와 섹션이 사라집니다.
 *   상태 플래그 같은 건 없습니다.
 *
 * 하지 말 것
 *   `미정`, `TBD`, `추후 공지`, `Coming soon`, `-`, `0` 을 넣지 마세요.
 *   비워두면 알아서 숨겨집니다. 빈 상자나 이상한 여백은 남지 않습니다.
 *
 * 섹션이 나타나는 조건
 *   01 about      statement / body / principles 중 하나
 *   02 stack      intro / suiRole / walrusRole / output / modules 중 하나
 *   03 resources  링크가 하나라도 살아 있는 그룹 1개 이상
 *   04 program    phases 1개 이상
 *   05 tracks     1개 이상
 *   06 support    totalPrize / items / followUpBenefits 중 하나
 *   07 criteria   1개 이상
 *   08 proof      metrics / achievements / gallery 중 하나
 *   09 partners   네 그룹 중 하나라도
 *   10 faqs       1개 이상
 *   11 finalCta   message / body, 또는 label+url 둘 다
 *
 * 형식이 중요한 값 (틀려도 안 깨지고, 효과만 빠집니다)
 *   criteria[].weight      `40%`         → 가중치 막대가 그려짐
 *   support.totalPrize     `30,000,000`  → 숫자가 세어 올라감
 *   proof.metrics[].value  `180`         → 숫자가 세어 올라감
 *   about.statement / finalCta.message / hero.headline
 *                          `\n` 으로 2줄  → 첫 줄 굵게, 둘째 줄 얇은 회색
 *
 * 화면에서 확인
 *   npm run dev  (기본값이 real 입니다. mock 레이아웃은
 *                 NEXT_PUBLIC_CONTENT_SOURCE=mock npm run dev)
 *
 * ⚠️ 아직 비어 있는 값 — 확정되면 여기만 채우면 됩니다
 *   applyUrl   신청 폼 URL. 비어 있는 동안 헤더·히어로·최종 CTA의
 *              신청 버튼이 전부 화면에서 빠집니다.
 *   proof      지난 회차 집계값. 없으면 08 섹션 전체가 숨겨집니다.
 */
export const event: EventContent = {
  // --- 기본 정보 -----------------------------------------------------------
  organizer: 'blockblock',
  creativeName: 'Blockthon 2026',

  officialEventName: 'Blockthon 2026',
  descriptor: 'AI × Blockchain 해커톤',
  valueProposition: 'Where AI Gains Memory, Agency, and Ownership.',
  date: '2026.08.29 – 09.19',
  applicationPeriod: '', // 마감(09.14)만 확정. 시작일이 정해지면 채웁니다
  location: 'ONLINE + SEOUL',
  format: 'ONLINE PRELIMINARY + DEMO DAY',
  applyUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLScFTQl0yyR3Bl86DInSi5CDFrCgyGdbA0zPulhV1am2ZqV-gQ/viewform?usp=header', // 신청 폼 전체 URL. 비우면 모든 신청 버튼이 사라집니다
  contact: 'blockblock.yonsei@gmail.com',

  // --- 헤더 메뉴 -----------------------------------------------------------
  // href는 섹션 앵커입니다. 숨겨진 섹션을 가리키는 링크는 자동으로 빠집니다.
  // 쓸 수 있는 값: #top #about #stack #resources #program #tracks #support
  //                #criteria #proof #partners #faq #apply
  navigation: [
    { label: 'ABOUT', href: '#about' },
    { label: 'STACK', href: '#stack' },
    { label: 'RESOURCES', href: '#resources' },
    { label: 'PROGRAM', href: '#program' },
    { label: 'JOIN', href: '#tracks' },
    { label: 'FAQ', href: '#faq' },
  ],

  // --- 00 Hero -------------------------------------------------------------
  hero: {
    presentedBy: 'blockblock',
    eventName: 'Blockthon 2026',
    descriptor: '',
    headline: 'Where AI Gains Memory,\nAgency, and Ownership.',
    body: '',
    primaryCtaLabel: '참가 신청',
    primaryCtaUrl: '', // 비우면 위 applyUrl 사용
    secondaryCtaLabel: '프로그램 보기',
    secondaryCtaUrl: '#program',
    date: '2026.08.29 – 09.19',
    location: 'ONLINE + SEOUL',
    format: 'ONLINE PRELIMINARY + DEMO DAY',
  },

  // --- 01 Manifesto --------------------------------------------------------
  about: {
    statement: '해커톤을 넘어\n생태계의 빌더로',
    body: 'Blockthon 2026은 일회성 개발 행사에 머무르지 않습니다. AI 개발자와 예비 창업가가 Sui와 Walrus를 배우고 활용하며, 행사 이후에도 프로젝트를 발전시키고 Sui 생태계에서 지속적으로 빌딩할 수 있도록 지원합니다.',
    principles: [
      'AI와 블록체인의 접점에서 새로운 가능성을 발견한다',
      '기술 교육과 멘토링을 통해 생태계의 빌더로 성장한다',
      '우수 팀의 후속 개발과 글로벌 생태계 진출을 연결한다',
    ],
  },

  // --- 02 Stack ------------------------------------------------------------
  stack: {
    intro:
      '익숙한 AI 기술에 Sui의 온체인 기능과 Walrus의 분산형 데이터 저장을 결합해보세요. 블록체인 경험이 많지 않아도 사전 세션과 기술 멘토링을 통해 필요한 스택을 배우며 개발할 수 있습니다.',
    suiRole:
      '빠른 트랜잭션과 디지털 자산의 소유권을 활용해 AI 서비스에 결제, 권한, 보상과 온체인 기능을 더할 수 있습니다.',
    walrusRole:
      'AI 모델, 미디어, 학습 데이터처럼 용량이 큰 데이터를 분산형 환경에 저장하고 서비스에서 활용할 수 있습니다.',
    modules: [
      '스스로 판단하고 거래하는 AI 에이전트',
      '데이터의 소유권과 활용 범위를 직접 관리하는 AI 서비스',
      '크리에이터와 사용자를 위한 온체인 결제·보상 시스템',
      'Sui와 Walrus를 활용한 자유로운 AI × Blockchain 프로젝트',
    ],
    output: 'AI와 블록체인의 결합을 자유롭게 실험하고, 실제로 작동하는 프로젝트를 완성해보세요.',
  },

  // --- 03 Developer resources ----------------------------------------------
  // 공식 문서와 도구 링크입니다. 행사 정보가 아니라 참가자용 참고 자료이므로
  // 확정을 기다릴 필요 없이 채우면 됩니다.
  //
  // ⚠️ 열리는 것을 확인한 URL만 넣으세요. url이 비면 그 줄이 사라지고,
  //    링크가 하나도 남지 않은 그룹은 그룹째 사라집니다.
  resources: {
    intro:
      'Sui와 Walrus로 개발할 때 필요한 공식 문서와 도구입니다. 블록체인이 처음이라면 Walrus의 Getting started부터 순서대로 따라가면 됩니다.',
    groups: [
      {
        title: 'Walrus',
        summary: 'blob을 저장하고 읽는 기본 레이어. 가장 먼저 볼 문서입니다.',
        links: [
          {
            label: 'Getting started',
            url: 'https://docs.wal.app/docs/getting-started',
            note: '설치부터 첫 blob 저장까지',
          },
          {
            label: 'CLI',
            url: 'https://docs.wal.app/docs/walrus-client/walrus-cli',
            note: 'walrus 클라이언트 명령어',
          },
          {
            label: 'HTTP API',
            url: 'https://docs.wal.app/docs/http-api/storing-blobs',
            note: 'aggregator·publisher HTTP 인터페이스',
          },
          {
            label: 'TypeScript SDK',
            url: 'https://docs.wal.app/docs/typescript-sdk/sdks',
            note: '앱에서 직접 저장하고 조회하기',
          },
          {
            label: 'Public aggregators & publishers',
            url: 'https://docs.wal.app/docs/system-overview/public-aggregators-and-publishers',
            note: '직접 운영하지 않고 쓰는 공개 엔드포인트',
          },
        ],
      },
      {
        title: 'Walrus Sites',
        summary: '만든 결과물을 탈중앙 웹사이트로 배포합니다.',
        links: [
          {
            label: 'Site builder 설치',
            url: 'https://docs.wal.app/docs/sites/getting-started/installing-the-site-builder',
            note: 'CLI 설치와 설정 파일',
          },
          {
            label: '사이트 배포하기',
            url: 'https://docs.wal.app/docs/sites/getting-started/publishing-your-first-site',
            note: 'deploy 명령으로 첫 배포',
          },
        ],
      },
      {
        title: 'Walrus Memory (MemWal)',
        summary: 'AI 에이전트가 기억을 소유하고 이어서 쓰게 하는 메모리 레이어입니다.',
        links: [
          {
            label: '문서',
            url: 'https://docs.wal.app/walrus-memory',
            note: '메모리 스페이스와 권한 모델',
          },
          {
            label: 'Playground',
            url: 'https://memory.walrus.xyz/',
            note: '계정과 에이전트용 delegate key 발급',
          },
          {
            label: 'GitHub',
            url: 'https://github.com/MystenLabs/MemWal',
            note: '샘플 앱과 skills',
          },
        ],
      },
      {
        title: 'Seal',
        summary: 'Walrus와 MemWal에 올린 데이터의 접근 권한을 온체인 정책으로 제어합니다.',
        links: [
          { label: '문서', url: 'https://seal-docs.wal.app/', note: '암호화와 접근 제어 정책' },
          { label: 'GitHub', url: 'https://github.com/MystenLabs/seal', note: '' },
        ],
      },
      {
        title: 'Sui Stack Messaging',
        summary: '저장과 복구는 Walrus, 프라이버시는 Seal을 쓰는 종단간 암호화 메시징 도구입니다.',
        links: [
          {
            label: 'GitHub',
            url: 'https://github.com/MystenLabs/sui-stack-messaging',
            note: '메시징 도구와 예제',
          },
        ],
      },
      {
        title: 'Sui Dev Korea',
        summary: '한국 Sui 개발자 커뮤니티.',
        links: [
          {
            label: 'GitHub',
            url: 'https://github.com/Sui-Dev-Korea',
            note: 'Sui·Walrus·Seal 저장소 모음',
          },
        ],
      },
    ],
  },

  // --- 04 Program timeline -------------------------------------------------
  program: {
    intro:
      '약 2주간의 온라인 예선을 시작으로 기술 세션과 팀 빌딩, 오프라인 해커톤과 Demo Day까지 이어집니다.',
    phases: [
      {
        label: 'ONLINE PRELIMINARY',
        date: '08.29 – 09.14',
        title: '온라인 예선 해커톤',
        description:
          '약 2주간 팀별 프로젝트를 개발합니다. 개인 또는 최대 4인으로 참가할 수 있으며, 제출 프로젝트를 바탕으로 오프라인 본선 진출팀을 선정합니다.',
      },
      {
        label: 'HACKER HOUSE',
        date: '9월 초 · 일정 추후 공개',
        title: '기술 온보딩 · 팀 빌딩',
        description:
          'Sui와 Walrus 기술을 실습 중심으로 배우고, 참가자 및 현업 빌더들과 교류하며 프로젝트와 팀을 구체화합니다.',
      },
      {
        label: 'FINALIST ANNOUNCEMENT',
        date: '09.16',
        title: '본선 진출팀 발표',
        description:
          '온라인 예선 프로젝트 심사를 거쳐 오프라인 해커톤과 Demo Day에 참여할 본선 진출팀을 발표합니다.',
      },
      {
        label: 'HACKATHON & DEMO DAY',
        date: '09.19',
        title: '오프라인 해커톤 · Demo Day',
        description:
          '프로젝트 개발과 기술 멘토링을 진행한 뒤, 최종 결과물을 발표하고 심사와 시상, 네트워킹을 함께합니다.',
      },
    ],
  },

  // --- 05 Who should join --------------------------------------------------
  tracks: [
    {
      title: 'AI RESEARCHERS & ENGINEERS',
      summary: '연구와 기술을 실제 프로젝트로 발전시키고 싶은 분',
      description:
        'AI 모델과 에이전트, 데이터 기술을 연구하거나 개발하고 있으며, 블록체인과 결합한 새로운 활용 가능성을 직접 실험해보고 싶은 분에게 적합합니다.',
    },
    {
      title: 'FOUNDERS & PRODUCT BUILDERS',
      summary: '아이디어를 팀과 함께 구체화하고 검증하고 싶은 분',
      description:
        'AI 서비스를 개발하고 있는 예비 창업팀이나 기획자, 디자이너, 개발자라면 프로젝트를 고도화하고 현업 멘토의 피드백을 받을 수 있습니다.',
    },
    {
      title: 'NEW TO WEB3',
      summary: '개발 경험은 있지만 블록체인이 처음인 분',
      description:
        '블록체인 경험이 많지 않아도 참가할 수 있습니다. 사전 기술 세션과 멘토링을 통해 Sui와 Walrus를 배우며 프로젝트에 적용할 수 있습니다.',
    },
  ],

  // --- 06 Prize & benefits -------------------------------------------------
  // items 배열 순서가 곧 순위입니다. 1등을 맨 위에 두세요.
  support: {
    totalPrize: '1,800,000',
    currency: 'KRW 총 상금',
    items: [
      { label: '1위 · 1팀', detail: '1,000,000 KRW' },
      { label: '2위 · 1팀', detail: '500,000 KRW' },
      { label: '3위 · 1팀', detail: '300,000 KRW' },
    ],
    followUpBenefits: [
      'Sui와 Walrus 기술 온보딩 및 개발 세션',
      '프로젝트별 현업 전문가 기술 멘토링',
      '수상팀 대상 후속 이벤트 참여 지원',
    ],
  },

  // --- 07 Judging criteria -------------------------------------------------
  // weight는 가로 막대로 그려집니다. 합이 100%가 되게 쓰세요.
  criteria: [
    {
      title: '기술 구현 및 완성도',
      description:
        '핵심 기능이 안정적으로 작동하고, 프로젝트의 아이디어와 기술 구조를 데모를 통해 명확하게 보여주는지 평가합니다.',
      weight: '30%',
    },
    {
      title: 'Sui · Walrus 활용도',
      description:
        'Sui 또는 Walrus의 기술적 특성을 프로젝트에 적절히 활용하고, 해당 기술을 선택한 이유가 명확한지 평가합니다.',
      weight: '25%',
    },
    {
      title: 'AI × Blockchain 결합',
      description:
        'AI와 블록체인의 장점을 자연스럽게 결합해 기존 방식과 다른 경험이나 가치를 제시하는지 평가합니다.',
      weight: '25%',
    },
    {
      title: '문제 정의 및 발전 가능성',
      description:
        '해결하려는 문제와 대상 사용자가 명확하고, 해커톤 이후에도 프로젝트를 발전시킬 가능성이 있는지 평가합니다.',
      weight: '20%',
    },
  ],

  // --- 08 Proof ------------------------------------------------------------
  // ⚠️ 지난 회차의 실제 집계값만. 추정치나 반올림한 홍보 숫자를 넣지 마세요.
  //    지금은 비어 있으므로 08 섹션이 렌더링되지 않습니다.
  proof: {
    intro: '',
    metrics: [],
    achievements: [],
    gallery: [],
  },

  // --- 09 Partners ---------------------------------------------------------
  // ⚠️ 로고 사용 허가를 받은 곳만. 논의 중인 곳은 넣지 마세요.
  //    logoUrl을 비우면 이름이 텍스트로 표시됩니다.
  partners: {
    hosts: [
      { name: 'blockblock', logoUrl: '/blockblock-logo.png', websiteUrl: '', alt: 'blockblock' },
    ],
    // 공식 로고입니다. Sui는 sui.io의 화이트 SVG를 그대로 썼고, Walrus는 공식
    // 워드마크(walrus.xyz)를 색만 반전한 화이트 버전입니다 — 어두운 배경용
    // 단색 반전 사용으로, 형태는 원본 그대로입니다.
    mainPartners: [
      { name: 'Sui', logoUrl: '/partners/sui.svg', websiteUrl: '', alt: 'Sui' },
      { name: 'Walrus', logoUrl: '/partners/walrus.png', websiteUrl: '', alt: 'Walrus' },
    ],
    // Academy Partner는 아직 확정되지 않아 비워 둡니다.
    techPartners: [],
    // Media Partner 그룹입니다 (PartnersSection에서 `media`로 표기).
    communityPartners: [{ name: '4 Pillars', logoUrl: '', websiteUrl: '', alt: '' }],
  },

  // --- 10 FAQ --------------------------------------------------------------
  // 첫 항목이 기본으로 펼쳐집니다. 가장 많이 물어볼 걸 맨 위에.
  faqs: [
    {
      question: '블록체인 개발 경험이 없어도 참가할 수 있나요?',
      answer:
        '네. AI와 프로덕트 개발에 관심이 있다면 블록체인 경험이 많지 않아도 참가할 수 있습니다. Hacker House의 기술 세션과 프로젝트별 멘토링을 통해 Sui와 Walrus를 배우며 개발할 수 있습니다.',
    },
    {
      question: '개인으로도 참가할 수 있나요?',
      answer:
        '네. 개인 또는 최대 4인으로 구성된 팀으로 참가할 수 있습니다. 팀 빌딩을 원하는 참가자는 Hacker House에서 다른 참가자들과 교류할 수 있습니다.',
    },
    {
      question: '대회는 어떤 방식으로 진행되나요?',
      answer:
        '8월 29일부터 9월 14일까지 온라인 예선이 진행됩니다. 예선 프로젝트 심사를 통해 선정된 팀은 9월 19일 서울에서 열리는 오프라인 해커톤과 Demo Day에 참여합니다.',
    },
    {
      question: '오프라인 본선에는 누구나 참여할 수 있나요?',
      answer:
        '프로젝트 발표에 참여하는 본선팀은 온라인 예선 심사를 통해 선정됩니다. 본선 진출팀은 9월 16일 발표할 예정입니다.',
    },
    {
      question: '어떤 기술을 사용해야 하나요?',
      answer:
        'Sui 또는 Walrus의 기술을 활용한 AI × Blockchain 프로젝트를 제출해야 합니다. 구체적인 개발 가이드와 참고 자료는 참가자에게 별도로 안내할 예정입니다.',
    },
  ],

  // --- 11 Final CTA --------------------------------------------------------
  finalCta: {
    message: 'AI와 블록체인의\n새로운 가능성에 도전하세요',
    body: '개인 또는 최대 4인 팀으로 참가할 수 있습니다. 블록체인 경험이 많지 않아도 괜찮습니다. 참가 신청은 9월 14일에 마감됩니다.',
    label: 'Blockthon 2026 참가 신청',
    url: '', // 비우면 위 applyUrl 사용
    contact: '', // 비우면 위 contact 사용
  },

  // --- SEO -----------------------------------------------------------------
  metadata: {
    title: 'Blockthon 2026 — blockblock',
    description:
      'Sui와 Walrus를 활용해 AI × Blockchain 프로젝트를 만드는 해커톤. 2026년 8월 29일 온라인 예선을 시작해 9월 19일 서울에서 오프라인 해커톤과 Demo Day로 마무리합니다.',
    // public/og.png — 1200×630. 공유 카드에 쓰입니다.
    // ⚠️ canonicalUrl이 비어 있는 동안에는 og:image 태그가 나가지 않습니다.
    //    크롤러는 절대 URL만 읽을 수 있는데, 도메인을 모르면 만들 수 없어서입니다.
    //    아래 canonicalUrl에 배포 주소를 넣는 순간 둘 다 켜집니다.
    ogImage: '/og.png',
    canonicalUrl: '', // 예: https://blockthon2026.example.com
    locale: 'ko_KR',
  },
};
