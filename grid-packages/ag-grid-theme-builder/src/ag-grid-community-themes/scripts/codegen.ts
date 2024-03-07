const main = async () => {
  const { generateAllCSSEmbeds } = await import('./build-css');
  await generateAllCSSEmbeds();

  // use dynamic import because type generation needs to import files that don't
  // exist until the CSS embed generation step completes
  const { generateDocsFile } = await import('./build-types');
  await generateDocsFile();
};

void main();
