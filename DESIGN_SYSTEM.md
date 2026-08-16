# block_block pixel — Design System

이 문서는 시각 디자인의 단일 기준이다. 실제 행사 콘텐츠는 [`CONTENT.md`](./CONTENT.md), 동작은 [`INTERACTIONS.md`](./INTERACTIONS.md)를 따른다.

---

## 1. Art Direction

### Theme

```text
Living Protocol Field
```

작은 pixel이 block이 되고, block이 연결되어 protocol과 product가 되는 과정을 하나의 일관된 시각 언어로 표현한다.

### Keywords

- precise
- intelligent
- kinetic
- technical
- confident
- crafted

### Avoid

- retro pixel game
- generic cyberpunk
- coin promotion website
- AI gradient template
- university festival poster
- excessive glassmorphism

---

## 2. Brand

### Names

```text
blockblock
block_block pixel
```

- 항상 소문자로 표기한다.
- 언더스코어를 유지한다.
- 임의의 대문자화와 띄어쓰기를 하지 않는다.

### Logo

- asset: `assets/blockblock-logo.png`
- 원본 비율 유지
- 최소 안전 여백: 로고 너비의 20%
- blur, bevel, outline, 과도한 glow 금지
- Header에서는 심볼 단독 사용 가능
- Hero에서는 타이틀 옆의 서명 또는 anchor로 사용
- PNG 로고 자체보다 3D block 배열이 로고 실루엣을 암시하게 한다.

---

## 3. Color

```css
:root {
  --canvas: #03050a;
  --surface: #080c16;
  --surface-raised: #0d1322;
  --brand-blue: #2848b8;
  --electric-blue: #4d72ff;
  --signal-green: #b8ff36;
  --text: #f5f7ff;
  --muted: #8e98aa;
  --hairline: rgba(142, 152, 170, 0.22);
  --grid: rgba(77, 114, 255, 0.14);
}
```

`#2848B8`은 제공된 로고에서 정리한 작업용 대표값이다. 공식 색상 값이 제공되면 교체한다.

### Usage

- 화면 대부분은 dark neutral과 brand blue로 구성한다.
- electric blue는 active/connection 상태에 사용한다.
- signal green은 status, index, CTA feedback에만 제한한다.
- 무지개 gradient를 사용하지 않는다.
- gradient text를 기본 제목 표현으로 사용하지 않는다.
- glow는 interaction feedback에만 사용한다.

---

## 4. Typography

### Roles

- Display: 단단하고 현대적인 grotesk
- Korean body: 높은 가독성의 sans-serif
- Meta/System: monospace
- Pixel font: 작은 index나 system label에만 제한적으로 사용

본문 전체에 monospace 또는 pixel font를 사용하지 않는다.

### Scale

```text
Display XL  clamp(4rem, 11vw, 10rem)
Display L   clamp(3rem, 7vw, 7rem)
Heading     clamp(2rem, 4vw, 4rem)
Body L      clamp(1.125rem, 1.8vw, 1.5rem)
Body        1rem
Meta        0.75rem–0.875rem
```

### Typesetting

- Hero와 주요 statement는 breakpoint별 줄바꿈을 직접 설계한다.
- 한글과 영문의 크기, 자간, baseline을 각각 조정한다.
- 모든 section heading을 같은 위치와 크기로 반복하지 않는다.
- 본문 한 줄 길이는 약 55~75자로 제한한다.
- 한국어에 불필요한 uppercase letter spacing을 적용하지 않는다.
- 긴 한국어 콘텐츠로 실제 검수한다.

---

## 5. Grid and Spacing

### Grid

```text
Desktop  12 columns
Tablet    8 columns
Mobile    4 columns
Max width 1440px
```

### Gutters

```text
Desktop 24–32px
Tablet  20–24px
Mobile  16–20px
```

### Section rhythm

동일한 section padding을 반복하지 않는다.

```text
dense field
→ large quiet statement
→ precise technical diagram
→ compact timeline
→ open proof gallery
→ focused final CTA
```

- 비대칭은 12-column grid 안에서 1~2 column offset으로 만든다.
- 비어 있는 공간을 디자인 요소로 사용한다.
- 모바일에서는 비대칭보다 읽기 순서를 우선한다.

---

## 6. Shape Language

- square 또는 작은 corner radius를 기본으로 한다.
- pill은 status, tag, compact CTA에만 사용한다.
- 모든 콘텐츠를 rounded card에 넣지 않는다.
- border, rule, coordinate, section index, crop을 적극 활용한다.
- blockblock 로고의 사선과 내부 여백에서 형태를 파생한다.
- 일반적인 정사각형 grid만 기계적으로 반복하지 않는다.

### Hairlines

- 기본 두께: 1px
- 강조선: 2px 이하
- section divider가 장식보다 정보 위계를 설명하게 한다.
- 밝은 white border를 모든 요소에 반복하지 않는다.

---

## 7. Layout by Section

### Header

- 투명 상태에서 시작
- scroll 후 canvas 80~90%와 약한 blur
- 큰 pill container 금지
- logo, minimal nav, clear CTA
- CTA가 없으면 빈 버튼을 표시하지 않는다.

### Hero

- `100svh`
- 비대칭 타이틀 배치
- Spline은 full-bleed background
- 텍스트 영역에만 국소 readability gradient
- HTML 타이틀과 CTA는 3D와 분리

### Manifesto

- 하나의 oversized statement
- 2~3개의 supporting line
- 일반적인 아이콘 카드 묶음 금지

### Stack

- node/flow diagram
- SUI layer와 WALRUS layer
- 중앙 output 영역
- 기술 요소를 카드보다 연결 관계로 표현

### Timeline

- line과 block marker
- desktop 수평 또는 hybrid
- mobile 세로

### Tracks

- 1~5개 항목 대응
- 동일한 카드 확대보다 diagram state 활성화

### Criteria

- 큰 숫자
- 얇은 divider
- 짧은 제목과 설명

### Proof

- 큰 숫자, 짧은 문장, 큐레이션된 사진
- 긴 연혁 문단 금지

### Partners

- tier별 크기 차이
- 정돈된 editorial grid
- 무한 marquee 금지
- 흰 박스에 모든 로고를 가두지 않는다.

### Final CTA

- 첫 화면과 시각적으로 연결
- 넓은 여백
- 하나의 명확한 행동
- 3D block이 완성된 구조로 정렬

---

## 8. Responsive

### Desktop

- full 3D field
- 비대칭 layout
- 넓은 negative space
- 제한적인 sticky section

### Tablet

- 8-column grid
- 효과와 object density 감소
- 긴 제목 충돌 방지

### Mobile

- 4-column grid
- 정보와 CTA가 3D보다 우선
- 첫 viewport에서 타이틀과 주요 행동에 접근 가능
- oversized type의 줄 수 통제
- partner logo 2~3열 grid
- touch target 최소 44px

---

## 9. Anti-template Checklist

- [ ] gradient heading이 기본 Hero 표현이 아니다.
- [ ] 의미 없는 3D 장식이 없다.
- [ ] 아이콘 카드 3개 패턴을 사용하지 않았다.
- [ ] 모든 섹션이 bento grid가 아니다.
- [ ] glass card가 반복되지 않는다.
- [ ] 모든 section heading의 크기와 위치가 같지 않다.
- [ ] 모든 요소가 같은 radius를 사용하지 않는다.
- [ ] 로고에서 파생된 형태가 보인다.
- [ ] 한글 줄바꿈이 자연스럽다.
- [ ] Spline 없이도 화면이 완성되어 보인다.

