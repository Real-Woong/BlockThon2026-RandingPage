# block_block pixel — Content Source

이 문서는 랜딩페이지의 유일한 콘텐츠 원본이다.

현재는 행사 세부 정보가 확정되지 않았으므로, 확정된 브랜드 필드를 제외한 모든 실제 콘텐츠를 비워둔다. 빈 값을 임의로 채우지 않는다.

---

## 1. 상태 정의

```ts
type ContentState = 'draft' | 'confirmed' | 'hidden';

type ContentField<T> = {
  state: ContentState;
  value?: T;
};
```

### 상태 사용법

- `draft`: 내부 작업 중. 개발 환경에서만 placeholder 표시 가능
- `confirmed`: 공개 화면에 표시 가능
- `hidden`: 공개 및 개발 화면에서 기본적으로 숨김

공개 화면에서는 `confirmed`만 렌더링한다.

---

## 2. 기본 정보

```yaml
organizer:
  state: confirmed
  value: blockblock

creativeName:
  state: confirmed
  value: block_block pixel

officialEventName:
  state: draft
  value:

descriptor:
  state: draft
  value:

valueProposition:
  state: draft
  value:

date:
  state: draft
  value:

applicationPeriod:
  state: draft
  value:

location:
  state: draft
  value:

format:
  state: draft
  value:

applyUrl:
  state: draft
  value:

contact:
  state: draft
  value:
```

---

## 3. Navigation

```yaml
navigation:
  state: draft
  value: []
```

예상 가능한 슬롯만 정의하며 실제 label은 확정 후 입력한다.

```text
[ABOUT]
[PROGRAM]
[TIMELINE]
[FAQ]
[APPLY]
```

---

## 4. Hero

```yaml
hero:
  state: draft
  value:
    presentedBy:
    eventName:
    descriptor:
    headline:
    body:
    primaryCtaLabel:
    primaryCtaUrl:
    secondaryCtaLabel:
    secondaryCtaUrl:
    date:
    location:
    format:
```

개발용 구조 토큰:

```text
[PRESENTED_BY]

block_block pixel

[EVENT_DESCRIPTOR]
[ONE_LINE_VALUE_PROPOSITION]

[PRIMARY_CTA] [SECONDARY_CTA]

[DATE] / [LOCATION] / [FORMAT]
```

---

## 5. Manifesto / About

```yaml
about:
  state: draft
  value:
    statement:
    body:
    principles: []
```

개발용 슬롯:

```text
[MANIFESTO_STATEMENT]
[ABOUT_BODY]
[PRINCIPLE_01]
[PRINCIPLE_02]
[PRINCIPLE_03]
```

---

## 6. Ecosystem / Stack

```yaml
stack:
  state: draft
  value:
    intro:
    suiRole:
    walrusRole:
    modules: []
    output:
```

개발용 슬롯:

```text
[STACK_INTRO]
[SUI_ROLE]
[WALRUS_ROLE]
[MODULES]
[OUTPUT]
```

---

## 7. Program / Build Path

```yaml
program:
  state: draft
  value:
    intro:
    phases: []
```

phase shape:

```yaml
- id:
  label:
  date:
  title:
  description:
  state: draft
```

---

## 8. Tracks

```yaml
tracks:
  state: draft
  value: []
```

track shape:

```yaml
- id:
  index:
  title:
  summary:
  description:
  state: draft
```

트랙 수는 1~5개를 기본 범위로 가정하지만 확정 전 생성하지 않는다.

---

## 9. Support / Rewards

```yaml
support:
  state: draft
  value:
    totalPrize:
    currency:
    items: []
    followUpBenefits: []
```

상금이 확정되지 않으면 `0`, `$0`, `0원`을 입력하지 않는다.

---

## 10. Criteria

```yaml
criteria:
  state: draft
  value: []
```

criterion shape:

```yaml
- id:
  index:
  title:
  description:
  weight:
  state: draft
```

---

## 11. Proof / Previous Edition

```yaml
proof:
  state: draft
  value:
    intro:
    metrics: []
    achievements: []
    gallery: []
```

metric shape:

```yaml
- label:
  value:
  source:
  state: draft
```

공개 근거가 확인되지 않은 숫자를 입력하지 않는다.

---

## 12. Partners

```yaml
partners:
  state: draft
  value:
    hosts: []
    mainPartners: []
    techPartners: []
    communityPartners: []
```

partner shape:

```yaml
- name:
  logoUrl:
  websiteUrl:
  alt:
  state: draft
```

논의 중인 단체는 `confirmed`로 변경하기 전까지 공개하지 않는다.

---

## 13. FAQ

```yaml
faqs:
  state: draft
  value: []
```

FAQ shape:

```yaml
- question:
  answer:
  state: draft
```

---

## 14. Final CTA

```yaml
finalCta:
  state: draft
  value:
    message:
    body:
    label:
    url:
    contact:
```

---

## 15. Metadata / SEO

```yaml
metadata:
  state: draft
  value:
    title:
    description:
    ogImage:
    canonicalUrl:
    locale:
    eventStructuredData:
```

실제 날짜와 장소가 확정되기 전에 Event 구조화 데이터를 만들지 않는다.

---

## 16. 공개 규칙

- 값이 없으면 요소를 숨긴다.
- 핵심 필드가 모두 비어 있으면 섹션 전체를 숨긴다.
- 숨긴 섹션의 navigation link도 함께 제거한다.
- 빈 button, 빈 card, 빈 heading을 렌더링하지 않는다.
- 미확정 데이터를 `Coming soon`으로 자동 치환하지 않는다.
- CTA URL이 없으면 다른 행동을 임의로 만들지 않는다.
- 파트너와 심사위원은 명시적인 확정 후에만 공개한다.
- 실제 콘텐츠 입력 후 한국어 줄바꿈과 모바일 높이를 다시 검수한다.

---

## 17. 개발용 Fixture

개발 중 레이아웃 테스트를 위해서만 아래 길이 fixture를 사용할 수 있다. 배포 데이터와 분리한다.

```ts
export const layoutFixtures = {
  short: '[SHORT_CONTENT]',
  medium: '[MEDIUM_LENGTH_CONTENT_FOR_LAYOUT_TEST]',
  long: '[LONG_KOREAN_CONTENT_FOR_RESPONSIVE_AND_LINE_BREAK_TEST_ONLY]',
};
```

fixture는 실제 행사 문구처럼 보이게 작성하지 않는다.

