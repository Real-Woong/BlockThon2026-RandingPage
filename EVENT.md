# 행사 정보 입력 시트

회의에서 확정된 내용을 여기 채운다. 채워지면 `content/event.ts`로 옮긴다.

- **비어 있는 칸은 그대로 둔다.** `미정`, `TBD`, `추후 공지`, `-`, `0` 을 넣지 않는다. 비면 그 요소·섹션이 화면에서 사라진다.
- 항목 개수는 자유다. 안 쓰는 건 지우고, 더 필요하면 복사해서 늘린다.
- 아래 네 가지만 **형식**이 있다. 틀려도 안 깨지고 효과만 빠진다.
  - `weight` → `40%`  (가중치 막대가 그려짐)
  - `totalPrize` / `metrics.value` → `30,000,000`, `180`  (숫자가 세어 올라감)
  - `statement` / `message` / `headline` → **2줄**  (첫 줄 굵게, 둘째 줄 얇은 회색)

---

## 기본 정보

```
officialEventName:      공식 행사명
descriptor:             한 줄 성격 규정 (예: Sui · Walrus 해커톤)
valueProposition:       한 줄 가치 제안
date:                   예: 2026.03.13 – 03.15
applicationPeriod:      예: 2026.01.19 – 02.20
location:               예: 서울 성수
format:                 예: 오프라인 3일 · 팀당 최대 4인
applyUrl:               신청 폼 URL (비우면 모든 신청 버튼이 사라짐)
contact:                문의 이메일
```

## 헤더 메뉴

쓸 수 있는 링크: `#about` `#stack` `#program` `#tracks` `#support` `#criteria` `#proof` `#partners` `#faq` `#apply`

```
label:                  href:
label:                  href:
label:                  href:
label:                  href:
label:                  href:
```

---

## 00 Hero

```
presentedBy:
eventName:
descriptor:
headline (1줄):
headline (2줄):
body:
primaryCtaLabel:        예: 참가 신청
primaryCtaUrl:          비우면 위 applyUrl 사용
secondaryCtaLabel:      예: 프로그램 보기
secondaryCtaUrl:
date:                   하단 메타 줄 — 채운 것만 이어 붙음
location:
format:
```

## 01 Manifesto

```
statement (1줄):        이 페이지에서 가장 큰 문장
statement (2줄):
body:

principles:
  -
  -
  -
```

## 02 Stack

```
intro:
suiRole:                Sui가 담당하는 계층
walrusRole:             Walrus가 담당하는 계층
output:                 3일 뒤 남는 결과물 한 줄

modules:
  -
  -
  -
  -
```

## 03 Build path

```
intro:

phases:
  - label:              예: PRE
    date:               예: 02.28
    title:
    description:

  - label:              예: DAY 01
    date:
    title:
    description:

  - label:
    date:
    title:
    description:

  - label:
    date:
    title:
    description:
```

## 04 Tracks

트랙명이 화면에서 가장 큰 글자로 나온다. 짧게 (8~12자 권장).

```
tracks:
  - title:
    summary:            한 줄 정의
    description:        2~3줄 설명

  - title:
    summary:
    description:

  - title:
    summary:
    description:
```

## 05 Support

`items` 순서가 곧 순위. 1등을 맨 위에.

```
totalPrize:             숫자만. 예: 30,000,000
currency:               예: KRW 총 상금

items:
  - label:              예: 대상 1팀
    detail:             예: 15,000,000 KRW · 후속 빌드 지원 연계

  - label:
    detail:

  - label:
    detail:

followUpBenefits:       상금 외 지원
  -
  -
  -
```

## 06 Criteria

`weight` 합이 100%가 되게.

```
criteria:
  - title:              예: 동작
    description:
    weight:             예: 40%

  - title:
    description:
    weight:

  - title:
    description:
    weight:

  - title:
    description:
    weight:
```

## 07 Proof — 지난 회차

⚠️ 실제 집계값만. 추정치를 넣지 않는다. 지난 회차가 없으면 이 블록 전체를 비운다.

```
intro:                  예: 지난 회차에서 남은 것들입니다.

metrics:
  - value:              숫자만. 예: 180
    label:              예: 참가자
    source:             예: 2025 회차 집계  ← 출처 필수

  - value:
    label:
    source:

  - value:
    label:
    source:

achievements:           검증 가능한 사실만
  -
  -

gallery:                실제 행사 사진
  - src:
    alt:                대체 텍스트 필수
```

## 08 Partners

⚠️ 로고 사용 허가를 받은 곳만. 논의 중인 곳은 넣지 않는다.

```
hosts (주최):
  - name:
    logoUrl:            비우면 이름이 글자로 표시됨
    websiteUrl:

mainPartners (메인):
  - name:
    logoUrl:
    websiteUrl:

techPartners (기술):
  - name:
    logoUrl:
    websiteUrl:

communityPartners (커뮤니티):
  - name:
    logoUrl:
    websiteUrl:
```

## 09 FAQ

첫 항목이 기본으로 펼쳐진다. 가장 많이 물어볼 걸 맨 위에.

```
faqs:
  - question:
    answer:

  - question:
    answer:

  - question:
    answer:

  - question:
    answer:

  - question:
    answer:
```

## 10 Final CTA

```
message (1줄):
message (2줄):
body:                   마감일 등 실무 정보 한 줄
label:                  예: 참가 신청
url:                    비우면 위 applyUrl 사용
contact:                비우면 위 contact 사용
```

## SEO

```
title:                  브라우저 탭 · 검색 결과 제목
description:            검색 결과 설명 (150자 내외)
ogImage:                공유 카드 이미지 URL (1200×630)
canonicalUrl:           배포 도메인 URL
```
