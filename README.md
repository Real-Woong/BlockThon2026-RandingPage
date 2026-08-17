# block_block pixel

`blockblock`의 인터랙티브 해커톤 랜딩페이지. 제작 기준은 [`CLAUDE.md`](./CLAUDE.md),
[`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md), [`CONTENT.md`](./CONTENT.md),
[`INTERACTIONS.md`](./INTERACTIONS.md)이며 이 README는 실행과 교체 방법만 다룬다.

## 실행

```bash
npm install
npm run dev            # 공개 화면 그대로 (확정 콘텐츠만)
npm run dev:preview    # 구조 프리뷰 — 모든 섹션을 [TOKEN]으로 채워 레이아웃 검수
npm run build
npm run lint
npm run typecheck
```

`npm run dev`로 보이는 화면이 현재의 실제 공개 상태다. 행사 정보가 아직 확정되지
않았으므로 Hero와 Footer만 렌더링되며, 나머지 섹션은 빈 wrapper 없이 사라진다.

## 콘텐츠

- 확정된 행사 정보는 [`content/event.ts`](./content/event.ts) **한 파일**에 있다.
- 규칙은 하나다. **값을 쓰면 공개되고, 비우면(`''`) 사라진다.** 상태 플래그는 없다.
  값을 채우는 순간 관련 섹션, navigation link, section index가 함께 나타난다.
- 확정 전에는 비워둔다. `TBD`, `미정`, `Coming soon`, `$0`을 대신 넣지 않는다.
- [`content/mock.ts`](./content/mock.ts)는 레이아웃 확인용 가짜 데이터다. 실제 정보가
  아니므로 고치지 말고, 실데이터가 다 들어가면 삭제한다.
- `NEXT_PUBLIC_CONTENT_SOURCE`는 배포 환경에서 반드시 `real`이어야 한다. 비어 있으면
  `mock`으로 동작해서 지어낸 날짜와 상금이 그대로 공개된다.

자세한 규칙은 [`CONTENT.md`](./CONTENT.md).

## 교체 가능한 자산

### blockblock 로고

현재 제공된 로고는 임시 참고 자산이므로 코드에 반영하지 않았다.

- `content/brand.ts`의 `brandMarkAsset.src`가 `null`이면 텍스트 워드마크 `blockblock`을 사용한다.
- 확정 로고가 나오면 파일을 `public/`에 넣고 `src`, `width`, `height`만 채운다.
- 로고를 사용하는 곳은 [`components/brand/BrandMark.tsx`](./components/brand/BrandMark.tsx) 하나뿐이다.
- 레이아웃, grid, hero field geometry, interaction 어디에도 로고 형태가 들어 있지 않다.
  로고를 지워도 화면과 인터랙션은 그대로 성립한다.

### Sui / Walrus 마크

공식 자산이 없어 텍스트 label로 구현했다. 공식 파일을 받으면
`content/brand.ts`의 `protocolLabels.sui.assetSrc` / `walrus.assetSrc`에 경로를 넣는다.
[`ProtocolLabel`](./components/hero/ProtocolLabel.tsx)이 자동으로 이미지로 전환한다.
비공식 로고를 재제작하거나 임의로 내려받지 않는다.

### Spline scene

```bash
NEXT_PUBLIC_SPLINE_SCENE_URL=""      # 비어 있으면 CSS protocol field가 그대로 히어로
NEXT_PUBLIC_SPLINE_VIEWER_SRC=""     # viewer 번들 경로 override (선택)
```

URL이 없으면 Spline 관련 코드는 아무것도 로드하지 않는다. URL이 있으면 HTML Hero가
먼저 그려진 뒤 scene을 지연 로드해 crossfade하고, 로딩·타임아웃·실패·reduced motion·
저사양 모바일은 모두 같은 결과(기존 field 유지)로 수렴한다. WebGL scene은 페이지당
하나뿐이며, 교체가 필요하면 [`components/hero/SplineScene.tsx`](./components/hero/SplineScene.tsx)
한 파일만 수정하면 된다(`@splinetool/react-spline`로 바꾸는 것도 이 파일 안에서 끝난다).

## 구조

```text
app/            layout, page
content/        콘텐츠 원본, 상태 해석, 섹션 노출 규칙, 브랜드 상수
components/
  brand/        BrandMark
  hero/         ProtocolField, SceneFallback, SplineScene, HeroContent, PixelCursor
  layout/       Header, SectionFrame, Footer
  sections/     01–10 섹션
  ui/           StatusLabel, SignalLine, ActionLink, SectionIndex, Accordion, LogoGrid
lib/            field 생성기, field engine, 환경 감지
styles/         tokens, globals
```

Hero field는 WebGL이 아니라 CSS 축측 블록으로 만들었다. pointer/scroll 반응은
[`lib/fieldEngine.ts`](./lib/fieldEngine.ts)가 DOM에 직접 CSS 변수를 써서 처리하며
React state는 프레임마다 갱신되지 않는다.

## 접근성과 모션

- field는 전부 `aria-hidden`이고 `pointer-events: none`이다. SUI/WALRUS의 의미는
  Hero 안 텍스트 legend로도 제공된다.
- `prefers-reduced-motion: reduce`에서는 pointer engine과 scroll 연동이 아예 시작되지
  않고 정적 배치로 남는다.
- 섹션 enter 효과는 `html[data-motion="on"]`이 있을 때만 숨김 상태를 갖는다.
  JavaScript가 없거나 실패하면 모든 섹션이 처음부터 보인다.
- CTA와 navigation touch target은 최소 44px이다.
