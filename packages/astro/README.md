# @tistory-skin-previewer/astro

**Astro** 기반의 티스토리 스킨 개발을 위한 공식 통합(Integration) 플러그인 및 컴포넌트 라이브러리입니다.

이 패키지는 로컬 개발 서버(`dev`)에서는 실시간 티스토리 치환자 미리보기를 제공하고, 프로덕션 빌드(`build`) 시에는 티스토리 스킨 등록 규격에 완벽히 맞는 형태로 파일명과 경로를 자동 최적화해 줍니다.

> **💡 권장 사항:** 새로운 스킨을 개발하시려나요? 직접 패키지를 설치하고 설정하는 것보다 **[`create-tistory-skin`](<https://www.google.com/search?q=%5Bhttps://www.npmjs.com/package/create-tistory-skin%5D(https://www.npmjs.com/package/create-tistory-skin)>)** CLI 도구를 사용하여 1초 만에 완벽한 보일러플레이트를 생성하는 것을 강력히 권장합니다.

---

## 주요 기능 (Features)

- 🛠️ **제로 컨피그(Zero-Config) 티스토리 빌드**: 복잡한 Vite나 Rollup 설정을 알 필요가 없습니다. `npm run build` 시 메인 CSS는 `style.css`로, JS 및 에셋은 `images/` 폴더로 자동 번들링됩니다.
- 🔗 **상대 경로 자동 매핑**: Astro는 기본적으로 절대 경로(`/style.css`)로 빌드하지만, 이 플러그인이 빌드 직후 HTML을 가로채어 티스토리 필수 규격인 상대 경로(`./style.css`)로 완벽하게 변환(`astro:build:done` 훅 사용)해 줍니다.
- 📄 **`skin.html` 자동 생성**: Astro의 기본 결과물인 `index.html`을 티스토리 규격인 `skin.html`로 자동 변경합니다.
- 👀 **실시간 미리보기 미들웨어 내장**: 개발 서버(`npm run dev`) 구동 시, 내장된 미들웨어가 `@tistory-skin-previewer/core`를 활용해 티스토리 치환자(`[##_title_##]`, `<s_list>` 등)를 가상 데이터로 즉시 파싱하여 화면에 보여줍니다.
- 🧩 **전용 Layout 컴포넌트 제공**: 티스토리 개발에 필수적인 보일러플레이트 태그들을 숨겨주는 `<TistorySkinHead>`와 `<TistorySkinBody>` 컴포넌트를 제공합니다.

---

## 설치 (Installation)

```bash
npm install @tistory-skin-previewer/astro
# 또는
yarn add @tistory-skin-previewer/astro
# 또는
pnpm add @tistory-skin-previewer/astro

```

---

## 설정 (Configuration)

`astro.config.mjs` 파일에 플러그인을 추가합니다. 다른 Vite 빌드 설정을 건드릴 필요가 없습니다.

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite"; // (선택 사항)
import tistoryPreviewer from "@tistory-skin-previewer/astro";

export default defineConfig({
  // Tistory Previewer 통합 플러그인 주입
  integrations: [tistoryPreviewer()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: "file",
  },
});
```

---

## 사용법 (Usage)

`src/pages/index.astro` 파일에 스킨의 전체 뼈대를 작성합니다. 라이브러리에서 제공하는 래퍼(Wrapper) 컴포넌트를 사용하면 설정이 극도로 단순해집니다.

### 기본 스킨 레이아웃 작성 (`index.astro`)

```astro
---
import { TistorySkinHead, TistorySkinBody } from '@tistory-skin-previewer/astro/components';
import Header from '@/components/Header.astro';
import '@/styles/global.css'; // 글로벌 CSS
---

<!doctype html>
<html lang="ko">
  <TistorySkinHead title="[##_page_title_##] :: [##_title_##]">
    <link href="https://fonts.googleapis.com/css2?family=Jua&display=swap" rel="stylesheet" />
  </TistorySkinHead>

  <TistorySkinBody class="bg-white text-black dark:bg-gray-800 dark:text-white">
    <Header />
    <main>
      <s_article_rep>
        <h2>[##_article_rep_title_##]</h2>
        <div class="content">[##_article_rep_desc_##]</div>
      </s_article_rep>
    </main>
  </TistorySkinBody>
</html>

```

### 스크립트 작성 방식

`<TistorySkinBody>` 컴포넌트는 내부적으로 `/src/scripts/common.ts` 경로의 스크립트를 찾아 자동으로 로드하고 빌드합니다.
따라서 별도의 스크립트 태그를 넣지 말고, 해당 경로에 TypeScript/JavaScript 파일을 생성하여 로직을 작성하세요.

```typescript
// src/scripts/common.ts
console.log("티스토리 스킨 스크립트 로드 완료!");

document.addEventListener("DOMContentLoaded", () => {
  // 스킨 동작 로직 작성
});
```

---

## 빌드 및 배포 (Build & Deploy)

개발이 완료되면 아래 명령어로 스킨을 빌드합니다.

```bash
npm run build

```

**빌드 결과물 (`dist/`):**
라이브러리가 빌드 후처리를 진행하여 티스토리에 바로 업로드할 수 있는 상태로 만들어 줍니다.

```text
dist/
 ├── skin.html    (상대경로로 완벽히 치환된 최종 마크업)
 ├── style.css    (루트 경로에 위치해야 하는 메인 CSS)
 └── images/      (기타 에셋 폴더)
      └── common-xxxxxx.js (컴파일된 메인 스크립트)

```

이 `dist` 폴더의 내용물을 그대로 `.zip` 으로 압축하여 티스토리에 스킨으로 등록하시면 됩니다.

---

## 🤝 기여하기 (Contributing)

이 패키지는 티스토리 스킨 개발자들의 DX(개발자 경험)를 극대화하기 위해 만들어졌습니다. 버그 리포트나 기능 제안은 언제든 환영합니다!

---

## 📝 License

이 프로젝트는 MIT 라이선스를 따릅니다.

> Powered by **Astro** | Created & Maintained by **BlueNyang**
