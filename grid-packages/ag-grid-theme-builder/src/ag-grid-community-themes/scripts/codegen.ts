import { removeAllGeneratedFiled } from './include/utils';

const main = async () => {
  removeAllGeneratedFiled();

  const { generateAllCSSEmbeds } = await import('./include/build-css');
  await generateAllCSSEmbeds();
  console.log('Generated CSS embeds 🚀');

  // use dynamic import because type generation needs to import files that don't
  // exist until the CSS embed generation step completes
  const { generateDocsFile } = await import('./include/build-types');
  await generateDocsFile();
  console.log('Generated docs 💪');
};

void main();
