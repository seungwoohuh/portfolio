@AGENTS.md

# 프로젝트: 포트폴리오 (Puck 기반 자유 캔버스 빌더)

`www.seungwoohuh.com` 루트 도메인을 소유하는 Next.js 앱. 크리에이티브 코딩 아카이브(별도 리포, `08_WEB Design Tool`)는 이 앱의 `/forge` 경로로 프록시됨 — 그 리포는 이 프로젝트와 코드/배포가 완전히 분리되어 있고 이 앱은 그쪽 코드를 전혀 참조하지 않는다.

## 핵심 아키텍처

- **DB는 dev/prod 공유 단일 Neon Postgres 하나**. 별도의 "동기화" 절차 없음 — dev에서 편집하고 `published`를 켜면 그 즉시 prod에도 보임.
- **`/admin`, `/api/items/*`, `/api/upload/*`, `/api/auth/*`는 prod에는 존재하지 않음** — `proxy.ts`가 `process.env.VERCEL_ENV === 'production'`이면 전부 404 처리. 즉 관리/편집 기능은 dev 프리뷰 배포와 로컬에서만 동작하고, prod는 완전히 읽기 전용으로 같은 DB의 `published=true` 행만 보여준다.
- **Next.js 16이라 `middleware.ts`가 아니라 `proxy.ts`** (Next 16에서 Middleware가 Proxy로 이름이 바뀜, 기능은 동일). 새 코드를 짤 때 이 버전이 최근 것이라 학습 데이터와 API가 다를 수 있으니 `node_modules/next/dist/docs/`를 먼저 확인할 것 (예: route handler의 `params`는 `Promise`라 `await` 필요, dynamic route 타입은 전역 `RouteContext<'/path'>` 사용).
- **Puck은 `@measured/puck`가 아니라 `@puckeditor/core`** (Puck이 패키지를 이전함, `@measured/puck`는 deprecated). API(`Puck`, `Render`, `Config`, `Data`, slot 필드 등)는 동일.
- Puck의 배치 모델은 슬롯/드롭존 기반(그리드·멀티컬럼)이며 픽셀 단위 자유 배치(겹침/회전)는 지원하지 않음 — 의도적으로 이 수준까지만 쓰기로 확정함, 커스텀 프리폼 캔버스를 만들지 말 것.
- Puck 에디터 헤더의 "Publish" 버튼은 레이아웃 JSON을 `PATCH /api/items/[id]`로 저장할 뿐, 실제 공개 여부(`published` 컬럼)와 무관함. 이 둘을 UI에서 구분해서 보여줘야 함 (`app/admin/[id]/editor-client.tsx`의 안내 배너 참고).
- 이미지는 `@vercel/blob`에 저장, URL을 `lib/assets.ts`의 `extractAssetUrls()`가 레이아웃 JSON을 순회하며 재계산해 `portfolio_items.asset_urls`에 보관 (별도 조인 테이블 없음). 항목 삭제 시 이 목록으로 blob도 정리.
- `/forge` 프록시는 `next.config.ts`의 `rewrites()`/`redirects()`. `FORGE_ORIGIN`은 기존 갤러리 프로젝트의 **영구 `*.vercel.app` alias**여야 하며 배포마다 바뀌는 해시 URL을 쓰면 안 됨.

## 로컬 개발

```bash
source ~/.nvm/nvm.sh   # 이 머신은 셸 기본 PATH에 node가 없음, nvm으로 활성화 필요
npm run dev
```

`.env.local`에 `.env.example` 항목을 채워야 함 (`DATABASE_URL` 없으면 DB 관련 페이지/라우트가 즉시 에러).

전체 배포/도메인 이전 절차는 `/Users/huhseungwoo/.claude/plans/toasty-seeking-starfish.md` 참고.
