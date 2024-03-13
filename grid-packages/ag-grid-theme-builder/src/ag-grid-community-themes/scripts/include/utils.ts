import fs from 'fs';
import { globSync } from 'glob';
import { join } from 'path';
import * as prettier from 'prettier';
import { logErrorMessage } from '../../theme-utils';

export const fatalError = (message: string) => {
  // eslint-disable-next-line no-console
  console.error(message);
  process.exit(1);
};

export const writeTsFile = async (path: string, content: string) => {
  const fs = await import('fs');
  const prettierConfig = (await prettier.resolveConfig(getProjectDir())) || undefined;
  try {
    content = await prettier.format(content, { parser: 'typescript', ...prettierConfig });
  } catch (e) {
    logErrorMessage(e);
    content += `\n\nSYNTAX ERROR WHILE FORMATTING:\n\n${(e as any).stack || e}`;
  }
  fs.writeFileSync(path, content);
};

export const getProjectDir = () => join(__dirname, '..', '..');

export const removeAllGeneratedFiles = () => {
  globSync(join(getProjectDir(), `**/GENERATED-*`)).forEach((file) => {
    fs.rmSync(file);
  });
};
