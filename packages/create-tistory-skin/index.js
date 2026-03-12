#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prompts from "prompts";
import pc from "picocolors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  console.log(pc.cyan("🚀 Tistory Skin 프로젝트를 생성합니다.\n"));

  // 프로젝트 이름 입력받기
  const response = await prompts(
    {
      type: "text",
      name: "projectName",
      message: "프로젝트(스킨) 이름을 입력하세요:",
      initial: "tistory-skin",
    },
    {
      type: "confirm",
      name: "useTailwind",
      message: "Tailwind CSS를 사용하시겠습니까?",
      initial: true,
    },
  );

  if (!response.projectName) {
    console.log(pc.red("프로젝트 생성이 취소되었습니다."));
    process.exit(1);
  }

  const targetDir = path.join(process.cwd(), response.projectName);

  // 디렉토리 생성
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  } else {
    console.error(pc.red(`이미 ${response.projectName} 폴더가 존재합니다.`));
    process.exit(1);
  }

  // 템플릿 복사
  const templateDir = path.join(__dirname, "template");

  function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
      fs.mkdirSync(dest);
      fs.readdirSync(src).forEach((childItemName) => {
        // npm 발매 시 .gitignore가 누락되는 이슈 방지용 트릭 (gitignore -> .gitignore로 복사)
        const destName = childItemName === "gitignore" ? ".gitignore" : childItemName;
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, destName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  console.log(pc.blue("템플릿 파일들을 복사하는 중..."));
  copyRecursiveSync(templateDir, targetDir);

  // Tailwind CSS 사용하지 않는 경우
  if (!response.useTailwind) {
    console.log(pc.yellow("Tailwind CSS 설정을 제거하는 중..."));

    // package.json 수정 (의존성 제거)
    const pkgPath = path.join(targetDir, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      if (pkg.devDependencies) {
        delete pkg.devDependencies["tailwindcss"];
        delete pkg.devDependencies["@tailwindcss/vite"];
        delete pkg.devDependencies["@tailwindcss/postcss"];
        delete pkg.devDependencies["prettier-plugin-tailwindcss"];
      }
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), "utf-8");
    }

    // astro.config.mjs 수정 (플러그인 제거)
    const astroConfigPath = path.join(targetDir, "astro.config.mjs");
    if (fs.existsSync(astroConfigPath)) {
      let astroConfig = fs.readFileSync(astroConfigPath, "utf-8");
      // import 구문 제거
      astroConfig = astroConfig.replace(/import tailwindcss from '@tailwindcss\/vite';\r?\n/, "");
      // plugins 배열 안의 tailwindcss() 제거 (쉼표 포함 처리)
      astroConfig = astroConfig.replace(/\s*tailwindcss\(\),?/, "");
      fs.writeFileSync(astroConfigPath, astroConfig, "utf-8");
    }

    // src/styles/global.css 수정 (Tailwind 지시어 제거)
    const globalCssPath = path.join(targetDir, "src", "styles", "global.css");
    if (fs.existsSync(globalCssPath)) {
      let globalCss = fs.readFileSync(globalCssPath, "utf-8");
      globalCss = globalCss.replace(/@import "tailwindcss";\r?\n/, "");
      fs.writeFileSync(globalCssPath, globalCss, "utf-8");
    }
  }

  // 완료 메시지
  console.log(pc.green("\n🎉 스킨 프로젝트 생성이 성공적으로 완료되었습니다!\n"));
  console.log("다음 명령어를 실행하여 개발을 시작하세요:\n");
  console.log(pc.cyan(`  cd ${response.projectName}`));
  console.log(pc.cyan("  npm install") + "  (또는 pnpm install / yarn)");
  console.log(pc.cyan("  npm run dev\n"));
}

init().catch((err) => {
  console.error(pc.red("실행 중 오류가 발생했습니다:"), err);
  process.exit(1);
});
