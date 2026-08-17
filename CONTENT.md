# block_block pixel — Content Rules

이 문서는 랜딩페이지 콘텐츠의 **규칙**을 정의한다.

스키마와 값은 코드에 있다. 이 문서는 그 값이 지켜야 할 것만 담는다.

| | 위치 |
| --- | --- |
| **확정된 행사 정보** | [`content/event.ts`](./content/event.ts) ← 여기에 입력한다 |
| 스키마(필드 목록과 타입) | [`content/types.ts`](./content/types.ts) |
| 레이아웃 확인용 가짜 데이터 | [`content/mock.ts`](./content/mock.ts) |

---

## 1. 단 하나의 규칙

**값을 쓰면 공개되고, 비우면(`''`) 사라진다.**

상태 플래그는 없다. `draft` / `confirmed` / `hidden` 같은 개념은 코드에서 제거됐다. 무언가를 숨기고 싶으면 텍스트를 지우면 되고, 공개하고 싶으면 텍스트를 쓰면 된다.

빈 값은 자동으로 처리된다.

- 공백만 있는 값은 빈 값으로 취급한다 (회의록에서 붙여넣은 공백 포함)
- 필수 필드가 빈 목록 항목은 렌더링 전에 제거된다
- 질문만 있고 답이 없는 FAQ처럼 반쪽짜리 항목도 제거된다

---

## 2. 공개 규칙

- 값이 없으면 요소를 숨긴다.
- 핵심 필드가 모두 비어 있으면 섹션 전체를 숨긴다.
- 숨긴 섹션의 navigation link도 함께 제거한다.
- 빈 button, 빈 card, 빈 heading을 렌더링하지 않는다.
- 미확정 데이터를 `Coming soon`으로 자동 치환하지 않는다.
- CTA URL이 없으면 다른 행동을 임의로 만들지 않는다.
- 파트너와 심사위원은 명시적인 확정 후에만 공개한다.
- 실제 콘텐츠 입력 후 한국어 줄바꿈과 모바일 높이를 다시 검수한다.

---

## 3. 값을 지어내지 않는다

다음을 **공개용 대체값으로 쓰지 않는다.**

```text
미정   TBD   추후 공지   Coming soon   -   0   $0   0원
```

비워두면 해당 요소와 섹션이 사라지도록 설계돼 있다. 그게 의도된 동작이고, 빈 상자나 이상한 여백은 남지 않는다.

특히 주의할 것:

- **상금** — 확정 전까지 `totalPrize`를 비운다. `0`을 넣지 않는다.
- **proof 수치** — 지난 회차의 실제 집계값만. 추정치·반올림한 홍보 숫자를 넣지 않고, `source`(집계 출처)를 반드시 함께 적는다.
- **파트너** — 로고 사용 허가를 받은 곳만. 논의 중인 곳은 넣지 않는다.
- **Event 구조화 데이터** — 실제 날짜와 장소가 확정되기 전에 만들지 않는다.

---

## 4. 섹션이 나타나는 조건

| # | 섹션 | 조건 |
| --- | --- | --- |
| 00 | Hero | 항상 (브랜드명 확정) |
| 01 | Manifesto | `about.statement` / `body` / `principles` 중 하나 |
| 02 | Stack | `stack.intro` / `suiRole` / `walrusRole` / `output` / `modules` 중 하나 |
| 03 | Build path | `program.phases` 1개 이상 |
| 04 | Tracks | `tracks` 1개 이상 |
| 05 | Support | `support.totalPrize` / `items` / `followUpBenefits` 중 하나 |
| 06 | Criteria | `criteria` 1개 이상 |
| 07 | Proof | `proof.metrics` / `achievements` / `gallery` 중 하나 |
| 08 | Partners | 네 그룹 중 하나라도 |
| 09 | FAQ | `faqs` 1개 이상 |
| 10 | Final CTA | `finalCta.message` / `body`, 또는 `label`+`url` 둘 다 |

섹션 번호, 헤더 메뉴, 우측 인덱스 레일은 이 결과를 자동으로 따라간다. 숨겨진 섹션을 가리키는 링크는 남지 않는다.

---

## 5. 형식이 동작에 영향을 주는 값

형식이 달라도 깨지지 않는다. 효과 없이 글자만 나온다.

| 필드 | 형식 | 안 맞으면 |
| --- | --- | --- |
| `criteria[].weight` | `40%` | 가중치 막대가 안 그려짐 |
| `support.totalPrize` | `30,000,000` | 카운트업 안 됨 |
| `proof.metrics[].value` | `180` | 카운트업 안 됨 |
| `about.statement`<br>`finalCta.message`<br>`hero.headline` | `\n`으로 2줄 | 굵기 대비 연출이 안 걸림 |

두 줄 문장은 **첫 줄이 굵게, 둘째 줄이 얇은 회색으로** 나온다. 그걸 전제로 문장을 나눈다.

배열은 **순서가 의미를 갖는다.**

- `support.items` — 배열 순서가 곧 순위. 1등을 맨 위에.
- `faqs` — 첫 항목이 기본으로 펼쳐진다.
- 번호(`01`, `02`…)는 위치에서 자동 생성된다. 직접 적지 않는다.

---

## 6. 화면에서 확인

```bash
NEXT_PUBLIC_CONTENT_SOURCE=real npm run dev
```

| 값 | 무엇이 보이는가 |
| --- | --- |
| `mock` | 레이아웃 확인용 가짜 콘텐츠 (**현재 기본값**) |
| `real` | `content/event.ts`에 채운 것만. **배포는 반드시 이 값** |

> 기본값이 `mock`이라 지금 화면의 날짜·상금·트랙은 전부 가짜다. 배포 전에 `real`로 바꾸고 그 상태에서 훑어봐야 한다.
