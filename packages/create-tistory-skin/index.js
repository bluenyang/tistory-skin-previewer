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
  const response = await prompts({
    type: "text",
    name: "projectName",
    message: "프로젝트(스킨) 이름을 입력하세요:",
    initial: "tistory-skin",
  });

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

  // 4. 완료 메시지
  console.log(pc.green("\n🎉 스킨 프로젝트 생성이 완료되었습니다!\n"));
  console.log(`  cd ${response.projectName}`);
  console.log("  npm install");
  console.log("  npm run dev");
}

init().catch(console.error);
