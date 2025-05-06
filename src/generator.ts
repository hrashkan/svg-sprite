import fg from "fast-glob";
import fs from "fs-extra";
import { optimize } from "svgo";
import path from "path";

export async function generateSprite(
  inputDir: string,
  spriteFile: string,
  hookName: string
) {
  const files = await fg("**/*.svg", { cwd: inputDir, absolute: true });

  const symbols = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(file, "utf8");
      const { data } = optimize(raw, { path: file });
      const id = path.basename(file, ".svg");
      const inner = data
        .replace(/<\?xml.*?>/, "")
        .replace(/<!DOCTYPE.*?>/, "")
        .replace(/<svg[^>]*>/, "")
        .replace(/<\/svg>/, "");
      return `<symbol id="${id}" xmlns="http://www.w3.org/2000/svg">${inner}</symbol>`;
    })
  );

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">` +
    symbols.join("") +
    `</svg>`;

  await fs.outputFile(spriteFile, svg);

  const hookTs = `
import { useEffect } from "react";

export function ${hookName}() {
  useEffect(() => {
    const div = document.createElement("div");
    div.style.display = "none";
    div.innerHTML = \`${svg.replace(/`/g, "\\`")}\`;
    document.body.insertBefore(div, document.body.firstChild);
  }, []);
}
`;
  const hookFile = spriteFile.replace(/\.svg$/, ".hook.ts");
  await fs.outputFile(hookFile, hookTs.trim());
}
