#!/usr/bin/env node
import { Command } from "commander";
import { generateSprite } from "./generator";

const program = new Command();
program
  .name("svg-sprite-gen")
  .description("Generate an SVG sprite and React hook from a folder of SVGs")
  .requiredOption("-i, --input <dir>", "Source SVG directory")
  .option("-o, --output <file>", "Output sprite filename", "sprite.svg")
  .option("--hook <name>", "Generate React hook name", "useSprite")
  .parse();

const opts = program.opts();
generateSprite(opts.input, opts.output, opts.hook)
  .then(() => console.log("✅ Sprite generated"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
