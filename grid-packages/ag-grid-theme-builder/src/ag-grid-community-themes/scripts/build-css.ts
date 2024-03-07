import cssNano from 'cssnano';
import fs from 'fs';
import { globSync } from 'glob';
import { basename, dirname, join, relative } from 'path';
import postcss from 'postcss';
import cssNesting from 'postcss-nesting';
import cssRtl from 'postcss-rtlcss';
import { Part } from '..';

const DEV_MODE = process.argv.includes('--dev');

const main = async () => {
  await generateAllCSSEmbeds();
  await generateDocsFile();
};

///
/// CSS COMPILATION
///

const generateAllCSSEmbeds = async () => {
  globSync(join(__dirname, `../parts/*/GENERATED-*`)).forEach((file) => {
    fs.rmSync(file);
  });
  const tsEntryPoints = globSync(join(__dirname, '../parts/*/*-css.ts'));
  for (const tsEntryPoint of tsEntryPoints) {
    await compileTSEntryPoint(tsEntryPoint);
  }
  const cssEntryPoints = globSync(join(__dirname, '../parts/*/*.css'));
  for (const cssEntryPoint of cssEntryPoints) {
    await compileCSSEntryPoint(cssEntryPoint);
  }
};

const compileTSEntryPoint = async (file: string) => {
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
  await generateCSSEmbed({ entry: file, files: cssFileOrder.map((f) => join(dir, 'css', f)) });
};

const compileCSSEntryPoint = async (file: string) => {
  await generateCSSEmbed({ entry: file, files: [file] });
};

const generateCSSEmbed = async (args: { entry: string; files: string[] }) => {
  const dir = dirname(args.entry);
  const outputFile = join(dir, `GENERATED-${basename(args.entry)}`).replace(/\.css$/, '.ts');
  const css: string[] = [`/**\n * FILE: ${prettyPath(args.entry)}\n */\n`];
  for (const cssPath of args.files) {
    if (!fs.existsSync(cssPath)) {
      throw fatalError(`Missing file: ${cssPath}`);
    }
    css.push(`/**\n * >>> SUB FILE: ${prettyPath(cssPath)}\n */`);
    css.push(await loadAndProcessCSSFile(cssPath));
  }
  let cssString = css.join('\n');
  cssString = await applyPostcssPlugin(
    cssString,
    outputFile,
    cssNano({
      preset: [
        'default',
        {
          discardComments: !DEV_MODE,
          normalizeWhitespace: !DEV_MODE,
        },
      ],
    }),
  );
  const typescriptContent = 'export default `' + cssString.replaceAll('`', '\\`') + '`;';
  fs.writeFileSync(outputFile, typescriptContent);
};

const loadAndProcessCSSFile = async (cssPath: string) => {
  let css = fs.readFileSync(cssPath, 'utf8');
  css = await applyPostcssPlugin(css, cssPath, cssNesting);
  css = await applyPostcssPlugin(
    css,
    cssPath,
    cssRtl({
      ltrPrefix: '.ag-ltr',
      rtlPrefix: '.ag-rtl',
    }),
  );
  return css;
};

const applyPostcssPlugin = async (css: string, path: string, plugin: postcss.AcceptedPlugin) => {
  const result = await postcss(plugin).process(css, { from: path, to: path });
  return result.css;
};

///
/// DOCUMENTATION GENERATION
///

const generateDocsFile = async () => {
  // Read all paets

  const mainExports = await import(join(__dirname, '..'));
  for (const mainExport of Object.values(mainExports)) {
    const part = mainExport as Part;
    if (typeof part.feature !== 'string' || typeof part.variant !== 'string') continue;
    Next up: build types
  }
};

///
/// UTILS
///

const fatalError = (message: string) => {
  // eslint-disable-next-line no-console
  console.error(message);
  process.exit(1);
};

const prettyPath = (path: string) => relative(join(__dirname, '..'), path);

void main();
