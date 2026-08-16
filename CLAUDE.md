# block_block pixel — Claude Project Guide

이 파일은 프로젝트의 최상위 실행 지침이다. 구현을 시작하기 전에 아래 문서를 모두 읽는다.

1. [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) — 브랜드와 시각 시스템
2. [`CONTENT.md`](./CONTENT.md) — 실제 콘텐츠 데이터와 공개 상태
3. [`INTERACTIONS.md`](./INTERACTIONS.md) — Spline, hover, scroll, motion

충돌 시 우선순위:

```text
사용자의 최신 직접 지시
→ CLAUDE.md
→ CONTENT.md의 confirmed 데이터
→ DESIGN_SYSTEM.md
→ INTERACTIONS.md
```

---

## 1. 프로젝트 정의

- 주최 브랜드: `blockblock`
- 크리에이티브 이름: `block_block pixel`
- 페이지 유형: 인터랙티브 해커톤 랜딩페이지
- 핵심 콘셉트: `Living Protocol Field`
- 핵심 내러티브: `pixel → block → connection → protocol → product`
- 브랜드 로고: `assets/blockblock-logo.png`
- Spline 참고 씬: [Boxes Hover](https://community.spline.design/file/a1f156f7-ef01-42d1-bf7b-5be1b7967b0a)

`blockblock`과 `block_block pixel`은 항상 소문자로 표기한다. 언더스코어를 제거하지 않는다.

---

## 2. 현재 제작 단계

현재는 행사 정보가 확정되기 전의 **design-first 단계**다.

지금 구현할 것:

- 디자인 시스템
- 반응형 페이지 구조
- Spline 기반 히어로 프로토타입
- Sui/Walrus pixel interaction
- 콘텐츠가 비어 있을 때의 안전한 레이아웃
- loading/error/static fallback
- accessibility와 reduced motion
- 빈 데이터에 대응하는 컴포넌트

지금 구현하지 않을 것:

- 임의의 행사 날짜와 장소
- 임의의 모집 기간
- 임의의 상금
- 임의의 트랙과 심사 기준
- 논의 중인 파트너와 심사위원
- 임의의 참가 신청 링크
- 추상적인 마케팅 카피
- 스폰서십 문서의 예산과 내부 요청 내용

---

## 3. 구현 원칙

### 3.1 콘텐츠

- 실제 행사 콘텐츠는 [`CONTENT.md`](./CONTENT.md) 한곳에서만 관리한다.
- 페이지 컴포넌트에 행사 내용을 하드코딩하지 않는다.
- `state: confirmed`인 값만 공개 화면에 표시한다.
- 값이 없으면 요소 또는 섹션을 숨긴다.
- `$0`, `TBD`, `미정`, `Coming soon`을 공개용 대체값으로 표시하지 않는다.
- 개발 모드에서만 `[DATE]`, `[TRACK_01]` 같은 구조용 토큰을 사용할 수 있다.

### 3.2 디자인

- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)의 token과 규칙을 사용한다.
- 일반적인 AI/Web3 템플릿을 만들지 않는다.
- 모든 시각적 결정은 blockblock 로고, pixel, Sui 또는 Walrus와 연결되어야 한다.
- 효과보다 타이포그래피, 위계, 여백, 정렬을 먼저 완성한다.

### 3.3 인터랙션

- [`INTERACTIONS.md`](./INTERACTIONS.md)를 기준으로 구현한다.
- Spline은 핵심 분위기를 만들지만 HTML 콘텐츠보다 우선하지 않는다.
- 마우스 효과가 CTA 클릭과 페이지 스크롤을 방해하면 안 된다.
- 모바일, reduced motion, WebGL failure 상태를 반드시 제공한다.

---

## 4. 기본 기술 결정

기존 프로젝트가 있으면 그 기술 스택과 코딩 규칙을 우선한다.

빈 프로젝트일 경우 기본값:

- React 기반 프레임워크
- TypeScript
- 기존 스타일 시스템 또는 컴포넌트 기반 CSS
- Spline Viewer 또는 `@splinetool/react-spline`
- 단순 motion은 CSS
- 복잡한 scroll sequence에만 기존 motion library 사용

금지:

- 사용하지 않는 라이브러리 설치
- Spline과 별개로 무거운 WebGL canvas 추가
- 한 페이지에 여러 Spline scene 사용
- 프로젝트 전체 구조의 불필요한 재작성

---

## 5. 페이지 구조

각 섹션은 필요한 confirmed 콘텐츠가 없으면 렌더링하지 않는다.

```text
00 Hero / Signal
01 Manifesto / About
02 Ecosystem / Stack
03 Program / Build Path
04 Tracks
05 Support / Rewards
06 Criteria
07 Proof / Previous Edition
08 Partners
09 FAQ
10 Final Build / CTA
```

페이지 구조는 일반적인 행사 정보 흐름을 따르지만, 모든 섹션을 동일한 카드 모음으로 표현하지 않는다.

### 섹션 컴포넌트 규칙

- 데이터가 없으면 `null`을 반환할 수 있어야 한다.
- 빈 wrapper와 불필요한 vertical gap을 남기지 않는다.
- visual component와 content component를 분리한다.
- 항목 수 1개부터 5개 이상까지 대응한다.
- 긴 한국어와 짧은 영어 모두 검수한다.

---

## 6. Anti-AI Template Rules

다음 표현을 기본값으로 사용하지 않는다.

- 중앙 badge + gradient heading + 설명 + 버튼 두 개
- 보라색·청록색 무지개 AI gradient
- 의미 없는 구체, 토러스, 유리 오브젝트
- 아이콘 카드 3개 또는 4개
- 모든 섹션의 bento grid
- 반복되는 glass card
- 모든 요소의 큰 border radius
- 모든 섹션의 동일한 fade-up
- 의미 없는 marquee
- fake terminal, fake dashboard, fake code
- 근거 없는 통계
- `혁신적인`, `차세대`, `미래를 재정의` 같은 추상 카피

Human-directed 결과를 위한 원칙:

- 대표 아이디어는 `Living Protocol Field` 하나만 사용한다.
- blockblock 로고의 각도와 빈 공간에서 형태를 파생한다.
- Hero와 주요 statement 줄바꿈을 breakpoint별로 직접 조정한다.
- 섹션마다 밀도와 여백의 리듬을 다르게 한다.
- 비대칭은 grid 안에서 의도적으로 사용한다.
- baseline, hairline, optical spacing, 한글 줄바꿈을 세밀하게 다듬는다.
- 다른 행사 이름으로 바꿔도 그대로 성립하면 generic한 것으로 판단한다.

---

## 7. 권장 컴포넌트 구조

기존 구조가 있으면 그 규칙을 따른다.

```text
components/
  layout/
    Header
    SectionFrame
    Footer
  hero/
    ProtocolField
    HeroContent
    PixelCursor
    SceneFallback
  sections/
    ManifestoSection
    StackSection
    BuildPathSection
    TracksSection
    SupportSection
    CriteriaSection
    ProofSection
    PartnersSection
    FAQSection
    FinalCTASection
  ui/
    SectionIndex
    SignalLine
    StatusLabel
    ActionLink
    LogoGrid
    Accordion
content/
  landing-content
styles/
  tokens
  globals
```

---

## 8. 필수 상태

### Hero

- Spline URL 없음
- Spline 로딩 중
- Spline 로딩 성공
- Spline 로딩 실패
- reduced motion
- mobile low-power fallback

### Content

- 전체 데이터 confirmed
- 일부 데이터 hidden
- 전체 섹션 hidden
- 긴 한국어 제목
- 짧은 영어 제목
- 항목 1개
- 항목 5개 이상

### CTA

- URL confirmed
- URL 없음
- disabled development preview
- keyboard focus

---

## 9. 완료 조건

### Brand

- [ ] 첫 화면만 봐도 blockblock의 페이지로 느껴진다.
- [ ] `blockblock`, `block_block pixel` 표기가 정확하다.
- [ ] 로고 비율과 안전 여백이 유지된다.
- [ ] 다른 행사 이름으로 바꿔 사용할 수 있는 generic template가 아니다.

### Interaction

- [ ] SUI와 WALRUS pixel이 시각적으로 구분된다.
- [ ] hover가 단순 확대가 아닌 의미 있는 상태 변화를 만든다.
- [ ] SUI와 WALRUS에 서로 다른 반응이 적용된다.
- [ ] scroll 시 3D field가 정보 구조로 이어진다.
- [ ] CTA와 scroll이 3D interaction 때문에 방해받지 않는다.

### Content

- [ ] 미확정 정보가 임의로 작성되지 않았다.
- [ ] 데이터가 없는 섹션이 빈 공간 없이 숨겨진다.
- [ ] 콘텐츠가 한곳에서 관리된다.

### Quality

- [ ] Spline을 제거해도 타이포그래피와 레이아웃이 완성되어 보인다.
- [ ] desktop, tablet, mobile을 각각 검수했다.
- [ ] 키보드 접근과 reduced motion이 동작한다.
- [ ] Spline 실패 시 fallback이 즉시 보인다.
- [ ] 동일한 카드와 reveal 패턴이 페이지 전체에 반복되지 않는다.

---

## 10. 작업 완료 전 검수 질문

1. 로고를 가려도 고유한 시각 언어가 남는가?
2. 다른 행사명으로 바꿔도 똑같이 사용할 수 있지 않은가?
3. Spline을 꺼도 첫 화면이 완성되어 보이는가?
4. 카드, gradient, glow를 절반 줄이면 더 좋아지지 않는가?
5. 한글 줄바꿈이 실제 디자이너가 조정한 것처럼 자연스러운가?
6. 모바일에서도 정보와 CTA가 3D보다 먼저 보이는가?
7. 빈 콘텐츠 때문에 빈 상자나 이상한 여백이 남지 않는가?

검수에서 실패하면 효과를 추가하지 말고 위계, 여백, 정렬, 줄바꿈부터 수정한다.
