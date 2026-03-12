# Tistory Skin Previewer

**Tistory Skin Previewer**는 로컬 환경에서 티스토리(Tistory) 스킨을 실시간으로 미리보고 개발할 수 있도록 돕는 모던 프론트엔드 툴체인입니다.

기존 티스토리 스킨 개발의 가장 큰 고통이었던 **"수정 -> .zip 압축 -> 티스토리 업로드 -> 확인"** 이라는 끔찍한 사이클을 끊어내고, **Astro**와 **Tailwind CSS** 등 최신 웹 기술을 활용하여 쾌적한 개발자 경험(DX)을 제공하는 것을 목표로 합니다.

## Packages (모노레포 패키지 구성)

이 저장소는 **Turborepo**를 기반으로 한 모노레포(Monorepo) 구조로 이루어져 있으며, 다음과 같은 핵심 패키지들을 포함하고 있습니다.

| 패키지명                                                                                | 설명                                                                                                       | npm                                                                                               |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`create-tistory-skin`](https://www.google.com/search?q=./packages/create-tistory-skin) | 🚀 명령어 한 줄로 최적화된 스킨 개발 뼈대를 생성해 주는 공식 CLI 도구입니다. (Tailwind 지원)               | [](https://www.google.com/search?q=https://www.npmjs.com/package/create-tistory-skin)             |
| [`@tistory-skin-previewer/astro`](https://www.google.com/search?q=./packages/astro)     | 🪐 Astro 프레임워크용 통합(Integration) 플러그인. 실시간 치환자 렌더링 및 빌드 경로 최적화를 담당합니다.   | [](https://www.google.com/search?q=https://www.npmjs.com/package/%40tistory-skin-previewer/astro) |
| [`@tistory-skin-previewer/core`](https://www.google.com/search?q=./packages/core)       | 🧩 티스토리 전용 치환자(`[##_..._##]`, `<s_...>`)를 파싱하고 가상(Mock) 데이터를 매핑하는 코어 엔진입니다. | [](https://www.google.com/search?q=https://www.npmjs.com/package/%40tistory-skin-previewer/core)  |

## Astro로 시작하기 (Getting Started)

Tistory Skin Previewer는 컴포넌트 기반 아키텍처와 뛰어난 빌드 최적화를 제공하는 **Astro** 프레임워크와 완벽하게 통합되어 있습니다.

직접 복잡한 설정을 할 필요 없이, 공식 스캐폴딩 도구인 `create-tistory-skin`을 사용하여 단 1초 만에 완벽한 스킨 개발 환경을 구축하세요.

### 1. 프로젝트 생성

터미널을 열고 아래 명령어를 실행합니다.

```bash
# npm 사용 시
npm create @bluenyang/tistory-skin@latest

# npx 사용 시
npx @bluenyang/create-tistory-skin@latest

# pnpm 사용 시
pnpm create @bluenyang/tistory-skin@latest

# yarn 사용 시
yarn create @bluenyang/tistory-skin
```

명령어를 실행하면 인터랙티브 프롬프트가 나타납니다.

- **프로젝트(스킨) 이름**을 입력합니다.
- **Tailwind CSS 사용 여부**를 선택합니다. (강력한 유틸리티 클래스를 원한다면 `Yes`, 순수 HTML/CSS로만 만들고 싶다면 `No`를 선택하세요.)

### 2. 개발 서버 실행 (실시간 프리뷰)

생성된 폴더로 이동하여 패키지를 설치하고 개발 서버를 구동합니다.

```bash
cd my-tistory-skin
npm install
npm run dev
```

이제 `http://localhost:4321`에 접속하면, 티스토리 치환자들이 가상 데이터로 변환되어 실시간으로 렌더링되는 마법을 볼 수 있습니다. 코드를 수정하면 브라우저 새로고침 없이 즉시 반영(HMR)됩니다!

### 3. 티스토리 업로드용 빌드

스킨 개발이 완료되었다면 아래 명령어를 실행하세요.

```bash
npm run build
```

Astro가 코드를 분석하여 **티스토리 스킨 등록 규격에 완벽히 맞는 구조**로 `dist/` 폴더에 결과물을 내뱉습니다.

- 절대 경로가 모두 티스토리 전용 상대 경로(`./`)로 자동 변환됩니다.
- 메인 CSS는 루트의 `style.css`로, JS 스크립트 등은 `images/` 폴더로 자동 병합 및 이동됩니다.

**🎉 이제 `dist` 폴더 내부의 파일들을 `.zip`으로 압축하여 티스토리에 업로드하기만 하면 끝입니다!**

## 🤝 직접 기여하기 (Contributing)

이 프로젝트는 오픈 소스이며, 누구나 기여할 수 있습니다. Issue를 남기거나 Pull Request를 보내주시면 감사하겠습니다.

### 설치 및 구동

본 저장소는 패키지 매니저로 `npm` (또는 호환되는 툴)과 빌드 시스템으로 `Turbo`를 사용합니다.

```bash
# 1. 저장소 클론
git clone https://github.com/bluenyang/tistory-skin-previewer.git
cd tistory-skin-previewer

# 2. 의존성 설치
npm install

# 3. 전체 패키지 빌드
npm run build

# 4. 코드 린트 및 포매팅 확인
npm run lint
```

## 📝 License

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](https://www.google.com/search?q=./LICENSE) 파일을 참조하세요.

> Created & Maintained by **BlueNyang**
