# @tistory-skin-previewer/core

**Tistory Skin Previewer**의 핵심 HTML 파싱 및 렌더링 엔진입니다.

티스토리 스킨에서 사용되는 고유한 치환자 문법(`[##_..._##]`, `<s_...>` 등)을 분석하여, 로컬 환경에서 미리보기가 가능하도록 적절한 HTML 태그와 가상(Mock) 데이터로 변환해 줍니다.

> **💡 안내:** Astro 프레임워크 기반으로 스킨을 개발하시려나요?
> 이 코어 패키지를 직접 다루실 필요 없이, **[@tistory-skin-previewer/astro](https://www.google.com/search?q=https://www.npmjs.com/package/%40tistory-skin-previewer/astro)** 패키지를 사용하시면 더욱 완벽하고 자동화된 개발 환경을 구축할 수 있습니다.

---

## 주요 기능 (Features)

- 🔄 **실시간 치환자 파싱**: 정규식 및 AST(선택적) 기반으로 티스토리의 값 치환자(`[##_title_##]`)와 그룹 치환자(`<s_list>`)를 정확하게 파싱합니다.
- 📦 **가상 데이터(Mock Data) 제공**: 로컬 렌더링 시 화면이 깨지지 않도록, 각 치환자의 성격에 맞는 가상의 더미 데이터를 자동으로 주입합니다.
- 🛣️ **라우팅 기반 렌더링 분기**: 현재 접속한 URL 경로(`/`, `/category`, `/guestbook` 등)에 따라 티스토리 본문 영역에 노출할 태그(`s_list`, `s_guestbook` 등)를 지능적으로 활성화/비활성화합니다.
- ⚡️ **프레임워크 독립적 (Framework-Agnostic)**: 순수 JavaScript/TypeScript로 작성되어 Astro, Vite, Next.js, Express 등 어떤 Node.js 환경에서든 미들웨어 형태로 가볍게 붙여서 사용할 수 있습니다.

---

## 설치 (Installation)

```bash
npm install @tistory-skin-previewer/core
# 또는
yarn add @tistory-skin-previewer/core
# 또는
pnpm add @tistory-skin-previewer/core
```

---

## 사용법 (Usage)

이 패키지는 주로 서버 측 미들웨어나 빌드 플러그인에서 원시 HTML(Raw HTML) 문자열을 가공할 때 사용됩니다. 핵심 함수인 `processHtml`을 호출하기만 하면 됩니다.

### 기본 예제

```typescript
import { processHtml } from "@tistory-skin-previewer/core";

// 1. 티스토리 치환자가 포함된 원시 HTML 문자열
const rawHtml = `
  <html>
    <head><title>[##_page_title_##]</title></head>
    <body>
      <s_t3>
        <h1>[##_title_##]</h1>
        <s_list>
          <h2>[##_list_title_##]</h2>
        </s_list>
      </s_t3>
    </body>
  </html>
`;

// 2. processHtml(HTML 문자열, 현재 접속한 URL 경로)
// 현재 경로가 '/category' 라고 가정해 봅니다.
const previewHtml = processHtml(rawHtml, "/category");

console.log(previewHtml);
```

### 변환 결과 (예시)

`processHtml`을 거친 HTML은 아래와 같이 로컬 브라우저에서 확인할 수 있는 정상적인 마크업으로 변환됩니다.

```html
<html>
  <head>
    <title>카테고리명 :: BlueNyang Dev-log</title>
  </head>
  <body>
    <div id="tistory-s-t3">
      <h1>BlueNyang Dev-log</h1>
      <div class="s_list_wrapper">
        <h2>카테고리명</h2>
      </div>
    </div>
  </body>
</html>
```

---

## API Reference

### `processHtml(html: string, pathname: string): string`

입력받은 원본 HTML 내의 티스토리 치환자들을 가상 데이터로 대체하여 반환합니다.

- **`html`** (`string`): 변환할 원본 HTML 문자열입니다.
- **`pathname`** (`string`): 현재 요청된 URL의 경로(Path)입니다. (예: `/`, `/guestbook`, `/tag`). 이 경로에 따라 특정 그룹 치환자(`<s_article_rep>`, `<s_guestbook>` 등)의 렌더링 여부가 결정됩니다.

---

## 🤝 기여하기 (Contributing)

티스토리의 치환자(Tag) 종류는 매우 방대합니다. 다음과 같은 문제에 대해서는 언제든 Issue를 남겨주시거나 Pull Request를 보내주시면 감사하겠습니다.

- 파싱되지 않는 치환자
- 누락된 치환자
- 보완이 필요한 치환내용
- 기타 버그

---

## 📝 License

이 프로젝트는 MIT 라이선스를 따릅니다.

> Created & Maintained by **BlueNyang**
