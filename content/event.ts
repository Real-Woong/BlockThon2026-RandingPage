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
 *   01 about     statement / body / principles 중 하나
 *   02 stack     intro / suiRole / walrusRole / output / modules 중 하나
 *   03 program   phases 1개 이상
 *   04 tracks    1개 이상
 *   05 support   totalPrize / items / followUpBenefits 중 하나
 *   06 criteria  1개 이상
 *   07 proof     metrics / achievements / gallery 중 하나
 *   08 partners  네 그룹 중 하나라도
 *   09 faqs      1개 이상
 *   10 finalCta  message / body, 또는 label+url 둘 다
 *
 * 형식이 중요한 값 (틀려도 안 깨지고, 효과만 빠집니다)
 *   criteria[].weight      `40%`         → 가중치 막대가 그려짐
 *   support.totalPrize     `30,000,000`  → 숫자가 세어 올라감
 *   proof.metrics[].value  `180`         → 숫자가 세어 올라감
 *   about.statement / finalCta.message / hero.headline
 *                          `\n` 으로 2줄  → 첫 줄 굵게, 둘째 줄 얇은 회색
 *
 * 화면에서 확인
 *   NEXT_PUBLIC_CONTENT_SOURCE=real npm run dev
 */
export const event: EventContent = {
  // --- 기본 정보 -----------------------------------------------------------
  // 아래 두 개만 확정값입니다. 브랜드 표기이므로 바꾸지 마세요.
  organizer: 'blockblock',
  creativeName: 'block_block pixel',

  officialEventName: '', // 공식 행사명
  descriptor: '', // 한 줄 성격 규정 (예: Sui · Walrus 해커톤)
  valueProposition: '', // 한 줄 가치 제안
  date: '', // 예: 2026.03.13 – 03.15
  applicationPeriod: '', // 예: 2026.01.19 – 02.20
  location: '', // 예: 서울 성수
  format: '', // 예: 오프라인 3일 · 팀당 최대 4인
  applyUrl: '', // 신청 폼 전체 URL. 비우면 모든 신청 버튼이 사라집니다
  contact: '', // 문의 이메일

  // --- 헤더 메뉴 -----------------------------------------------------------
  // href는 섹션 앵커입니다. 숨겨진 섹션을 가리키는 링크는 자동으로 빠집니다.
  // 쓸 수 있는 값: #top #about #stack #program #tracks #support
  //                #criteria #proof #partners #faq #apply
  navigation: [
    // { label: 'ABOUT', href: '#about' },
  ],

  // --- 00 Hero -------------------------------------------------------------
  // 큐브 필드가 이미 크게 block_block 을 쓰고 있으니 문구는 짧을수록 좋습니다.
  hero: {
    presentedBy: '',
    eventName: '',
    descriptor: '',
    headline: '', // 2줄 권장: '첫 줄\n둘째 줄'
    body: '',
    primaryCtaLabel: '', // 예: 참가 신청
    primaryCtaUrl: '', // 비우면 위 applyUrl 사용
    secondaryCtaLabel: '', // 예: 프로그램 보기
    secondaryCtaUrl: '',
    date: '', // 히어로 하단 메타 줄. 채운 것만 이어 붙습니다
    location: '',
    format: '',
  },

  // --- 01 Manifesto --------------------------------------------------------
  about: {
    statement: '', // 이 페이지에서 가장 큰 문장. 2줄 권장
    body: '',
    principles: [],
  },

  // --- 02 Stack ------------------------------------------------------------
  stack: {
    intro: '',
    suiRole: '', // Sui가 담당하는 계층
    walrusRole: '', // Walrus가 담당하는 계층
    modules: [], // 실제로 다루는 기술 항목
    output: '', // 3일 뒤 남는 결과물 한 줄 (강조 박스)
  },

  // --- 03 Build path -------------------------------------------------------
  // 가로 타임라인. 축이 그려지고 마커가 순서대로 찍힙니다.
  program: {
    intro: '',
    phases: [
      // { label: 'PRE', date: '02.28', title: '온라인 사전 세션', description: '' },
    ],
  },

  // --- 04 Tracks -----------------------------------------------------------
  // 트랙명이 화면에서 가장 큰 타이포로 나옵니다. 짧게 쓰세요 (8~12자 권장).
  tracks: [
    // { title: '', summary: '', description: '' },
  ],

  // --- 05 Support ----------------------------------------------------------
  // items 배열 순서가 곧 순위입니다. 1등을 맨 위에 두세요.
  support: {
    totalPrize: '', // 숫자만. 예: 30,000,000
    currency: '', // 예: KRW 총 상금
    items: [
      // { label: '대상 1팀', detail: '15,000,000 KRW · 후속 빌드 지원 연계' },
    ],
    followUpBenefits: [], // 상금 외 지원. 칩으로 표시됩니다
  },

  // --- 06 Criteria ---------------------------------------------------------
  // weight는 가로 막대로 그려집니다. 합이 100%가 되게 쓰세요.
  criteria: [
    // { title: '동작', description: '', weight: '40%' },
  ],

  // --- 07 Proof ------------------------------------------------------------
  // ⚠️ 지난 회차의 실제 집계값만. 추정치나 반올림한 홍보 숫자를 넣지 마세요.
  //    지난 회차가 없으면 이 블록을 전부 비워두면 섹션이 사라집니다.
  proof: {
    intro: '',
    metrics: [
      // { value: '180', label: '참가자', source: '2025 회차 집계' },
    ],
    achievements: [], // 검증 가능한 사실만
    gallery: [], // { src: '/photo.jpg', alt: '대체 텍스트 필수' }
  },

  // --- 08 Partners ---------------------------------------------------------
  // ⚠️ 로고 사용 허가를 받은 곳만. 논의 중인 곳은 넣지 마세요.
  //    logoUrl을 비우면 이름이 텍스트로 표시됩니다.
  partners: {
    hosts: [
      // { name: 'blockblock', logoUrl: '', websiteUrl: '', alt: '' },
    ],
    mainPartners: [],
    techPartners: [],
    communityPartners: [],
  },

  // --- 09 FAQ --------------------------------------------------------------
  // 첫 항목이 기본으로 펼쳐집니다. 가장 많이 물어볼 걸 맨 위에.
  faqs: [
    // { question: '', answer: '' },
  ],

  // --- 10 Final CTA --------------------------------------------------------
  finalCta: {
    message: '', // 2줄 권장
    body: '', // 마감일 등 실무 정보 한 줄
    label: '',
    url: '', // 비우면 위 applyUrl 사용
    contact: '', // 비우면 위 contact 사용
  },

  // --- SEO -----------------------------------------------------------------
  // 날짜와 장소가 확정되기 전까지 Event 구조화 데이터는 만들지 않습니다.
  metadata: {
    title: '', // 브라우저 탭 · 검색 결과 제목
    description: '', // 검색 결과 설명 (150자 내외)
    ogImage: '', // 공유 카드 이미지 전체 URL (1200×630 권장)
    canonicalUrl: '', // 배포 도메인 전체 URL
    locale: 'ko_KR',
  },
};
