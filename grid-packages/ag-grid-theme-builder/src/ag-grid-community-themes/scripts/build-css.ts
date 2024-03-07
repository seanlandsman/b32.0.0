import cssNano from 'cssnano';
import fs from 'fs';
import { globSync } from 'glob';
import { basename, dirname, join, relative } from 'path';
import postcss from 'postcss';
import cssImport from 'postcss-import';
import cssNesting from 'postcss-nesting';
import cssRtl from 'postcss-rtlcss';

const DEV_MODE = process.argv.includes('--dev');

export const generateAllCSSEmbeds = async () => {
  globSync(join(__dirname, `../parts/*/GENERATED-*`)).forEach((file) => {
    fs.rmSync(file);
  });
  const cssEntryPoints = globSync(join(__dirname, '../parts/*/*.css'));
  for (const cssEntryPoint of cssEntryPoints) {
    await compileCSSEntryPoint(cssEntryPoint);
  }
};

const compileCSSEntryPoint = async (file: string) => {
  await checkAllCssFilesImported(file);
  await generateCSSEmbed(file);
};

const generateCSSEmbed = async (entry: string) => {
  const dir = dirname(entry);
  const outputFile = join(dir, `GENERATED-${basename(entry)}`).replace(/\.css$/, '.ts');
  let cssString =
    `/**\n * FILE: ${prettyPath(entry)}\n */\n` + (await loadAndProcessCSSFile(entry));
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

const checkAllCssFilesImported = async (entryFile: string) => {
  const dir = dirname(entryFile);
  const cssFiles = globSync(join(dir, 'css/*.css')).map((f) => relative(dir, f));

  let entrySource = fs.readFileSync(entryFile, 'utf8');
  // strip comments
  entrySource = await applyPostcssPlugin(entrySource, entryFile, cssNano());

  for (const cssFile of cssFiles) {
    const expected = `@import ['"]\\./${cssFile}['"];`;
    if (!RegExp(expected).test(entrySource)) {
      throw fatalError(`File ${entryFile} missing ${JSON.stringify(expected)}`);
    }
  }
};

const loadAndProcessCSSFile = async (cssPath: string) => {
  let css = fs.readFileSync(cssPath, 'utf8');
  css = await applyPostcssPlugin(css, cssPath, cssImport(), cssNesting());
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

const applyPostcssPlugin = async (
  css: string,
  path: string,
  ...plugins: postcss.AcceptedPlugin[]
) => {
  const result = await postcss(plugins).process(css, { from: path, to: path });
  return result.css;
};

const fatalError = (message: string) => {
  // eslint-disable-next-line no-console
  console.error(message);
  process.exit(1);
};

const prettyPath = (path: string) => relative(join(__dirname, '..'), path);
