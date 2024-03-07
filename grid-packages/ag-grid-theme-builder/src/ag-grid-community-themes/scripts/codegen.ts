import path from 'path';
import * as prettier from 'prettier';
import * as mainExports from '..';
import { ParamType } from '../metadata/docs';
import { camelCase, logErrorMessage } from '../theme-utils';

const projectDir = path.join(__dirname, '../');

const main = async () => {
  await writeTsFile('GENERATED-param-types.ts', makePublicFile());
};

const generatedWarning = `
//
// NOTE: THIS FILE IS GENERATED DO NOT EDIT IT DIRECTLY!
// It can be regenerated by running \`npm run codegen\` or
// \`npm run codegen:watch\` to regenerate on changes.
//

`;

const makePublicFile = (): string => {
  let result = generatedWarning;

  result += '';

  for (const mainExport of Object.values(mainExports)) {
    console.log(mainExport);
  }

  // result += "import { definePart } from './theme-utils';\n";
  // result += "import * as helpers from './css-helpers';\n\n";
  // result += "export type BorderStyle = 'solid' | 'dotted' | 'dashed' | 'none';\n\n";

  // for (const part of allPartsMeta) {
  //   if (part.params) {
  //     const paramsUnion = part.params.map((p) => JSON.stringify(p.property)).join(' | ');
  //     result += `export type ${paramsUnionName(part.partId)} = ${paramsUnion};\n\n`;
  //   }
  // }

  // for (const part of allPartsMeta) {
  //   const args: DefinePartArgs = {
  //     partId: part.partId,
  //   };
  //   if (part.params) {
  //     args.defaults = {};
  //     for (const { property, defaultValue } of part.params) {
  //       if (defaultValue && typeof defaultValue === 'object' && defaultValue.helper) {
  //         args.defaults[property] = codeLiteral(`helpers.${renderHelper(defaultValue)}`);
  //       } else {
  //         args.defaults[property] = defaultValue;
  //       }
  //     }
  //   }

  //   const cssFilesDir = projectDir + `css/${part.partId}/`;

  //   const partEntryFiles = globSync(cssFilesDir + `${part.partId}.css`);
  //   const partImplementationFiles = globSync(cssFilesDir + `**/*.css`).filter(
  //     (file) => !partEntryFiles.includes(file),
  //   );
  //   const partEntrySource = partEntryFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
  //   for (const file of partImplementationFiles) {
  //     const pathWithinFolder = file.replace(cssFilesDir, '');
  //     if (!partEntrySource.includes(`@import './${pathWithinFolder}';`)) {
  //       throw fatalError(
  //         `Part ${part.partId} has an implementation file ${pathWithinFolder} that is not imported in the entry file`,
  //       );
  //     }
  //   }

  //   const files = [...globSync(cssFilesDir + `**/*.ts`), ...partEntryFiles]
  //     .map((f) => f.replace(cssFilesDir, ''))
  //     .sort();
  //   if (files.length > 0) {
  //     args.css = [];
  //     for (const fileName of files) {
  //       const importName = fileToImportName(fileName);
  //       result += `import ${importName} from './css/${part.partId}/${fileToImportPath(fileName)}';\n`;
  //       args.css.push(codeLiteral(importName));
  //     }
  //   }
  //   if (part.iconsFile) {
  //     const importName = fileToImportName(part.iconsFile);
  //     result += `import ${importName} from './css/${part.partId}/${part.iconsFile}';\n`;
  //     args.icons = codeLiteral(importName);
  //   }
  //   const argsCode = restoreLiterals(JSON.stringify(args, null, '    '));
  //   result += '\n';
  //   result += `export const ${camelCase(part.partId)} = definePart<${paramsUnionName(part.partId)}>(${argsCode});\n\n`;
  // }

  // result += 'export type ParamTypes = {\n';
  // for (const part of allPartsMeta) {
  //   if (part.params) {
  //     for (const param of part.params) {
  //       result += paramDocComment(param);
  //       result += `${param.property}: ${paramTsType(param)},\n\n`;
  //     }
  //   }
  // }
  // result += '}\n\n';

  // result += `export type Param = keyof ParamTypes;\n\n`;

  // result += `export const allParts = [${allPartsMeta.map((p) => camelCase(p.partId)).join(', ')}]\n\n`;

  // if (process.argv.includes('--hot-reload')) {
  //   result += `
  //   if (import.meta.hot) {
  //     import.meta.hot.accept((newModule) => {
  //       if (newModule) {
  //         const oldParts = newModule.allParts.map((p: any) => p.partId).join(', ');
  //         const newParts = allParts.map((p) => p.partId).join(', ');
  //         if (oldParts !== newParts) {
  //           import.meta.hot?.invalidate();
  //         } else {
  //           for (let i = 0; i < allParts.length; i++) {
  //             // update the existing part object with data from the new module
  //             Object.assign(allParts[i], newModule.allParts[i]);
  //             // replace the new object in the module with the updated existing object
  //             newModule.allParts[i] = allParts[i];
  //           }
  //           (window as any).handlePartsCssChange?.();
  //         }
  //       }
  //     });
  //   }
  // `;
  // }

  return result;
};

const writeTsFile = async (filename: string, content: string) => {
  const fs = await import('fs');
  const path = await import('path');
  const prettierConfig = (await prettier.resolveConfig(__dirname)) || undefined;
  try {
    content = await prettier.format(content, { parser: 'typescript', ...prettierConfig });
  } catch (e) {
    logErrorMessage(e);
    content += `\n\nSYNTAX ERROR WHILE FORMATTING:\n\n${(e as any).stack || e}`;
  }
  fs.writeFileSync(path.join(projectDir, filename), content);
};

const paramExtraDocs = (type: ParamType): string[] => {
  switch (type) {
    case 'color':
      return [
        'A CSS color value e.g. "red" or "#ff0088". The following shorthands are accepted:',
        '- `true` -> `"solid 1px var(--ag-border-color)"`',
        '- `false` -> `"none"`.',
        // TODO add {ref: 'paramName'} when implemented as well as color extensions
      ];
    case 'border':
      return [
        'A CSS border value e.g. "solid 1px red". The following shorthands are accepted:',
        '- `true` -> `"solid 1px var(--ag-border-color)"`',
        '- `false` -> `"none"`.',
      ];
    case 'length':
      return [
        'A CSS dimension value with length units, e.g. "1px" or "2em". A JavaScript number will be interpreted as a length in pixel units, e.g.',
        '- `4` -> `"4px"`',
        // TODO add {ref: 'paramName'} when implemented as well as length extensions
      ];
    case 'shadow':
      return [
        'A CSS box shadow value e.g. "10px 5px 5px red;". See https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow',
      ];
  }
  fatalError(`Unknown param type: ${type as string}`);
};

const docComment = (arg: {
  mainComment: string;
  extraComment?: string | null;
  defaultValue?: any;
  defaultValueComment?: string;
}) => {
  let result = '/**\n';
  result += ` * ${arg.mainComment}\n`;
  if (arg.extraComment) {
    result += ` *\n`;
    result += ` * ${arg.extraComment}\n`;
  }
  if (arg.defaultValue !== undefined) {
    let defaultValueString: string;
    if (arg.defaultValue && typeof arg.defaultValue === 'object' && arg.defaultValue.helper) {
      defaultValueString = renderHelper(arg.defaultValue);
    } else {
      defaultValueString = JSON.stringify(arg.defaultValue);
    }
    result += ' *\n';
    if (arg.defaultValueComment) {
      defaultValueString += ` (${arg.defaultValueComment})`;
    }
    result += ` * @default ${defaultValueString}\n`;
  }
  result += ' */\n';
  return result;
};

const fatalError = (message: string) => {
  // eslint-disable-next-line no-console
  console.error(message);
  process.exit(1);
};

const upperCamelCase = (str: string) => camelCase(str[0].toUpperCase() + str.slice(1));

void main();
