import fs from 'fs';
import { globSync } from 'glob';
import { basename, dirname, join, relative } from 'path';

const DEV_MODE = process.argv.includes('--dev');

const main = async () => {
  globSync(join(__dirname, `../parts/*/GENERATED-*`)).forEach((file) => {
    fs.rmSync(file);
  });
  const files = globSync(join(__dirname, '../parts/*/*-css.ts'));
  for (const file of files) {
    await compilePart(file);
  }
};

const compilePart = async (file: string) => {
  const dir = dirname(file);
  const cssFileOrder: string[] = (await import(file)).default;
  if (!Array.isArray(cssFileOrder) || !cssFileOrder.every((f) => typeof f === 'string')) {
    throw fatalError(`${file} should export an array of string paths as the default export`);
  }
  const allCssFiles = globSync(join(dir, 'css/*.css')).map((f) => basename(f));
  const missingFiles = allCssFiles.filter((file) => !cssFileOrder.includes(file));
  if (missingFiles.length > 0) {
    throw fatalError(`The following CSS files are missing in ${file}: ${missingFiles.join(', ')}`);
  }
  const css: string[] = [`/* PART FILE: ${prettyPath(file)} */\n`];
  for (const cssFile of cssFileOrder) {
    const cssPath = join(dir, 'css', cssFile);
    if (!fs.existsSync(cssPath)) {
      throw fatalError(`File ${cssPath} is missing`);
    }
    css.push(`/* CSS FILE: ${prettyPath(cssFile)} */`);
    css.push(fs.readFileSync(cssPath, 'utf8'));
  }
  if (!DEV_MODE) {
    // TODO: minify
  }
  const outputFile = join(dir, `GENERATED-${basename(file)}`);
  const typescriptContent = 'export default `' + css.join('\n').replaceAll('`', '\\`') + '`;';
  fs.writeFileSync(outputFile, typescriptContent);
};

const fatalError = (message: string) => {
  // eslint-disable-next-line no-console
  console.error(message);
  process.exit(1);
};
const prettyPath = (path: string) => relative(join(__dirname, '..'), path);

void main();
