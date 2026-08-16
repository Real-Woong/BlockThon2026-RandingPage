# block_block pixel — Interaction Specification

이 문서는 Spline, pointer, touch, scroll, loading, motion의 단일 기준이다.

핵심 콘셉트:

```text
Living Protocol Field
pixel → block → connection → protocol → product
```

---

## 1. Hero Scene

히어로는 반복되는 3D pixel/cube로 구성된 프로토콜 필드다.

큐브는 다음을 상징한다.

- data
- model
- agent
- ownership
- storage
- execution
- product component

일부 큐브에만 `SUI`와 `WALRUS` label을 배치한다. 모든 큐브에 로고를 반복하지 않는다.

권장 비율:

```text
65% blockblock blue cube
15% SUI label cube
15% WALRUS label cube
 5% signal/accent cube
```

공식 Sui/Walrus logo asset이 제공되지 않았다면 `SUI`, `WALRUS` 텍스트 label로 구현한다. 비공식 로고를 재제작하거나 임의로 다운로드하지 않는다.

---

## 2. Scene Sequence

### Entry

1. CSS/poster fallback과 HTML Hero가 즉시 보인다.
2. 작은 pixel이 낮은 강도로 깨어난다.
3. Spline이 준비되면 fallback에서 scene으로 crossfade한다.
4. cube 일부에서 `SUI`, `WALRUS` label이 드러난다.
5. 자동 motion은 매우 느리고 절제된 상태로 유지한다.

### Interaction

1. pointer 위치 주변 cube가 거리 기반으로 반응한다.
2. 직접 hover한 cube의 protocol-specific reaction이 실행된다.
3. 인접 cube 3~6개에 signal이 전파된다.
4. 일정량의 상호작용이 쌓이면 blockblock logo silhouette가 잠시 암시된다.

### Scroll exit

1. 자유롭게 떠 있던 cube가 grid로 정렬된다.
2. 연결선이 2D section grid와 이어진다.
3. 하나의 cube가 다음 section index의 pixel dot으로 변한다.
4. native page flow로 자연스럽게 전환한다.

---

## 3. Pixel State Model

```ts
type PixelState =
  | 'idle'
  | 'nearby'
  | 'active'
  | 'connected'
  | 'stored'
  | 'resolved';
```

### State appearance

- `idle`: 낮은 광량과 미세한 breathing
- `nearby`: edge brightness와 depth 증가
- `active`: 짧은 z-axis movement와 label clarity 증가
- `connected`: 인접 cube로 signal line 전파
- `stored`: 빛이 cube 안쪽으로 흡수
- `resolved`: 작은 confirmation pulse

상태 변화가 React render를 매 pointer frame 발생시키지 않도록 한다.

---

## 4. Pointer Interaction

### Distance zones

```text
far    → 거의 반응 없음
near   → 광량, 방향, 깊이 변화
direct → label reveal + primary reaction + neighbor signal
```

### SUI cube

의미:

- ownership
- execution
- transaction

반응:

- 빠른 blue-white pulse
- 주변 block으로 connection signal
- 짧은 resolved state

### WALRUS cube

의미:

- data
- storage
- memory

반응:

- 표면에서 내부로 흐르는 ripple
- light가 cube 중심으로 흡수
- 짧은 stored state

### blockblock cube

- 상호작용 누적 시 로고 구조의 일부로 정렬
- 직접적인 로고 왜곡보다 cube arrangement로 표현

### signal cube

- 주변 3~6개의 cube를 연결
- signal green은 짧게만 사용
- 지속적인 neon 상태로 남지 않음

### Reaction discipline

하나의 hover에서 다음만 허용한다.

- 하나의 primary reaction
- 하나의 secondary reaction

scale, rotation, glow, ripple, line, particle을 모두 동시에 실행하지 않는다.

---

## 5. Cursor

- 기본 OS cursor를 완전히 숨기지 않는다.
- 장식 follower는 작은 square 또는 coordinate marker로 제한한다.
- 링크와 CTA에서는 명확한 pointer 상태를 유지한다.
- follower가 텍스트를 가리거나 contrast를 낮추지 않게 한다.
- 모바일에서는 follower를 제거한다.

---

## 6. Scroll Choreography

native scroll을 유지한다. page 전체를 scroll-jacking하지 않는다.

### Hero → Manifesto

- cube 일부가 뒤로 물러남
- 2D grid가 남음
- section index `01` 등장
- statement mask reveal

### Manifesto → Stack

- SUI와 WALRUS layer가 분리
- 두 layer의 연결이 diagram으로 전환
- 중앙에 product/output 영역 생성

### Stack → Program

- connection line이 timeline spine으로 전환
- cube가 timeline marker가 됨

### Program → Tracks

- timeline marker가 track entry point가 됨
- hover 시 panel 확대보다 관련 node 활성화

### Proof → Final CTA

- 분산된 숫자와 block이 정렬
- 완성된 cube 또는 blockblock silhouette 형성
- 첫 Hero와 연결되는 마지막 장면

### Sticky

- Hero 다음 한 구간에서만 제한적으로 사용 가능
- 긴 pin section 금지
- 모바일에서는 일반 문서 흐름으로 전환

---

## 7. Section Motion

모든 섹션에 같은 fade-up을 적용하지 않는다.

### Enter patterns

- pixel mask reveal
- line draw
- index activation
- depth-to-flat transition
- crop reveal

한 섹션에는 주 enter pattern 하나만 선택한다.

### Timing

```text
micro interaction  120–180ms
component reveal   280–480ms
section transition 600–900ms
ambient loop       8–16s
```

### Text

- line 또는 word group 단위 mask reveal
- 글자 하나씩 무작위 등장하는 효과 남용 금지
- 한국어 자소 분해 animation 금지
- 핵심 텍스트는 motion 없이도 즉시 읽을 수 있어야 함

---

## 8. Touch Interaction

모바일에는 hover가 없으므로 다른 경험을 제공한다.

- touch point 주변에 하나의 low-intensity ripple
- 선택한 cube에 짧은 label reveal
- 인접 cube 2~3개만 반응
- 자동 ambient sequence는 저강도로 유지
- drag로 scene을 과도하게 회전시키지 않음
- page scroll gesture를 방해하지 않음

CTA와 navigation touch target은 최소 44px로 유지한다.

---

## 9. Reduced Motion

`prefers-reduced-motion: reduce`에서:

- cursor follow 비활성화
- 자동 회전 비활성화
- scroll-linked transform 제거
- sticky sequence 제거
- 정적 poster 또는 low-motion scene 사용
- 짧은 opacity 전환만 유지

3D를 비활성화해도 모든 행사 정보와 CTA를 사용할 수 있어야 한다.

---

## 10. Loading and Fallback

### Environment

```bash
NEXT_PUBLIC_SPLINE_SCENE_URL=""
```

### Rendering priority

```text
1. canvas background color
2. static poster 또는 CSS grid fallback
3. HTML Hero content
4. Spline scene
```

### Required states

- URL 없음 → static fallback
- loading → fallback 유지
- success → 짧은 crossfade
- error → fallback 유지, page 기능 정상
- reduced motion → static/low-motion fallback
- low-power mobile → reduced scene 또는 poster

빈 검정 화면과 무한 spinner를 표시하지 않는다.

### Layering

```text
z-index 0  canvas / poster
z-index 1  local readability gradient
z-index 2  semantic HTML content
z-index 3  header / CTA / navigation
```

CTA 주변에는 cube density를 낮춘다.

---

## 11. Performance

- Spline scene은 페이지당 1개
- geometry compression 사용
- object, material, texture 수 최소화
- 모바일에서 shadow와 post-processing 감소
- pointer event에서 매 frame React state update 금지
- animation frame 또는 runtime 내부 transform 활용
- passive scroll listener 사용
- resize 계산 throttle/debounce
- below-the-fold media lazy load
- fallback poster는 WebP 또는 AVIF

목표:

```text
Lighthouse Performance 80+
Accessibility          90+
Best Practices         90+
SEO                    90+
```

---

## 12. Accessibility

- Spline scene은 장식 요소로 `aria-hidden` 처리
- 중요한 정보는 canvas 안에만 두지 않음
- 반복 SUI/WALRUS cube에 반복적인 screen reader label을 붙이지 않음
- keyboard focus를 제거하지 않음
- hover로만 필수 정보 제공 금지
- CTA와 accordion을 키보드로 사용 가능
- HTML source order가 읽기 순서와 일치
- motion 때문에 읽기나 focus가 방해받지 않음

---

## 13. Acceptance Checklist

- [ ] SUI와 WALRUS cube의 의미와 반응이 다르다.
- [ ] hover가 단순 scale 효과로 끝나지 않는다.
- [ ] 하나의 hover에 효과가 과도하게 겹치지 않는다.
- [ ] pointer effect가 CTA를 방해하지 않는다.
- [ ] scroll이 native하게 유지된다.
- [ ] Hero에서 정보 섹션으로 시각적 연결이 있다.
- [ ] mobile touch가 page scroll을 방해하지 않는다.
- [ ] reduced motion에서 모든 기능을 사용할 수 있다.
- [ ] Spline URL이 없어도 페이지가 완성되어 보인다.
- [ ] Spline failure가 전체 페이지 오류를 만들지 않는다.
- [ ] 한 페이지에 WebGL scene이 하나만 있다.

