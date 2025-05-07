import fs from "fs-extra";
import path from "path";
import { generateSprite } from "../src/generator";

describe("svg-sprite-gen", () => {
  const TEST_DIR = path.resolve(__dirname, "fixture-icons");
  const OUT_SPRITE = path.resolve(__dirname, "out-test", "sprite.svg");
  const OUT_HOOK = path.resolve(__dirname, "out-test", "sprite.hook.ts");

  beforeAll(async () => {
    await fs.remove(path.dirname(OUT_SPRITE));
    await fs.mkdirp(TEST_DIR);
    await fs.writeFile(path.join(TEST_DIR, "a.svg"), `<svg><rect/></svg>`);
    await fs.writeFile(path.join(TEST_DIR, "b.svg"), `<svg><circle/></svg>`);
  });

  it("creates sprite.svg and sprite.hook.ts", async () => {
    await generateSprite(TEST_DIR, OUT_SPRITE, "useTestSprite");

    expect(await fs.pathExists(OUT_SPRITE)).toBe(true);
    expect(await fs.pathExists(OUT_HOOK)).toBe(true);

    const sprite = await fs.readFile(OUT_SPRITE, "utf8");
    expect(sprite).toContain('<symbol id="a"');
    expect(sprite).toContain('<symbol id="b"');

    const hook = await fs.readFile(OUT_HOOK, "utf8");
    expect(hook).toMatch(/export function useTestSprite/);
  });
});
