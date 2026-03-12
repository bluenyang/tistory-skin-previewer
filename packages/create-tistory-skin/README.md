# create-tistory-skin

**Astro**와 **Tistory Skin Previewer** 기반의 티스토리 스킨 개발 환경을 단 1초 만에 구축해 주는 공식 스캐폴딩(Scaffolding) CLI 도구입니다.

복잡한 빌드 설정이나 티스토리 전용 상대경로 매핑, 레이아웃 보일러플레이트 작성에 시간을 쏟지 마세요. 명령어 한 줄이면 즉시 스킨 디자인과 개발에만 집중할 수 있는 완벽한 프로젝트가 생성됩니다.

## 주요 기능

- **단 한 줄의 명령어로 시작**: `npm create` 명령어를 통해 최적화된 초기 스킨 템플릿을 즉시 생성합니다.
- **Tailwind CSS 선택 지원**: 프로젝트 생성 시 Tailwind CSS 사용 여부를 선택할 수 있습니다. (사용하지 않을 경우 관련 설정과 의존성이 완벽하게 제거된 순수 HTML/CSS 환경을 제공합니다.)
- **제로 컨피그(Zero-Config) 빌드**: Rollup이나 Vite를 직접 설정할 필요가 없습니다. 티스토리 업로드 규격(`skin.html`, `style.css`, `images/`)에 맞춘 완벽한 후처리를 기본 제공합니다.
- **실시간 미리보기 (HMR)**: 코드를 수정할 때마다 브라우저 새로고침 없이 로컬 개발 서버에서 즉시 변경 사항을 확인하세요.
- **구조화된 템플릿**: 티스토리 치환자에 대응하는 기본 레이아웃과 방명록, 페이징 등의 컴포넌트 구조가 미리 잡혀 있습니다.

---

## 빠른 시작 (Quick Start)

터미널을 열고 아래 명령어 중 하나를 실행하세요:

```bash
# npm 사용 시
npm create tistory-skin@latest

# npx 사용 시
npx create-tistory-skin@latest

# yarn 사용 시
yarn create tistory-skin

# pnpm 사용 시
pnpm create tistory-skin

```

명령어를 실행하면 인터랙티브 프롬프트가 실행되며 다음 항목을 설정하게 됩니다.

1. **프로젝트(스킨) 이름 설정**: 생성될 폴더의 이름을 입력합니다.
2. **Tailwind CSS 사용 여부**: `Y/n` 로 최신 Tailwind CSS 환경을 포함할지 순수 환경으로 갈지 결정합니다.

프로젝트 생성이 완료되면 안내에 따라 디렉토리로 이동하여 개발을 시작하세요!

```bash
cd my-tistory-skin
npm install
npm run dev

```

---

## 📂 디렉토리 구조 (Directory Structure)

생성된 프로젝트는 스킨 개발에 최적화된 직관적인 구조를 가집니다.

```text
my-tistory-skin/
 ├── src/
 │    ├── components/    # 헤더, 푸터, 스킨 치환자(s_list 등) 컴포넌트
 │    ├── layouts/       # 스킨 전체 레이아웃 (Layout.astro)
 │    ├── pages/
 │    │    └── index.astro # 스킨의 메인 진입점 (여기서 스킨 구조를 잡습니다)
 │    ├── scripts/       # 클라이언트 단 JavaScript/TypeScript 로직 (common.ts)
 │    └── styles/        # 글로벌 CSS (Tailwind 지시어 등 포함)
 ├── astro.config.mjs    # 프리뷰어 Integration이 포함된 핵심 설정 파일
 ├── package.json
 └── tailwind.config.mjs # (Tailwind 선택 시 포함됨)

```

---

## 💻 사용법 (Commands)

프로젝트 내부에서 다음 스크립트들을 사용할 수 있습니다.

### 개발 서버 실행 (로컬 프리뷰)

```bash
npm run dev

```

`http://localhost:4321`에 접속하여 실시간으로 스킨을 확인하며 개발하세요. `/category`, `/guestbook` 등의 티스토리 경로도 모두 자동으로 대응됩니다.

### 티스토리 스킨 빌드 (배포용)

```bash
npm run build

```

모든 개발이 끝난 후 이 명령어를 실행하면 `dist/` 폴더에 결과물이 생성됩니다.
Astro 컴포넌트와 스크립트가 티스토리 업로드용 규격으로 완벽하게 컴파일 및 상대경로 변환됩니다.

---

## 📦 티스토리에 스킨 적용하기

`npm run build`를 통해 생성된 `dist/` 폴더의 구조는 다음과 같습니다.

```text
dist/
 ├── skin.html    (완성된 마크업)
 ├── style.css    (컴파일된 메인 CSS)
 └── images/      (스크립트 및 기타 에셋)
      └── common-xxxxxx.js

```

1. `dist` 폴더 내부의 **모든 파일과 폴더를 선택하여 하나의 `.zip` 파일로 압축**합니다.
2. 티스토리 관리자 페이지 > [꾸미기] > [스킨 변경] > **[스킨 등록]** 버튼을 클릭합니다.
3. 압축한 `.zip` 파일을 업로드하고 저장하면 스킨 적용이 완료됩니다! 🎉

---

## 📝 License

이 프로젝트는 MIT 라이선스를 따릅니다.

> Powered by **@tistory-skin-previewer/astro** | Created & Maintained by **BlueNyang**
