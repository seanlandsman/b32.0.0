import { CoreParam } from '.';
import { ParamDefaults, Part, PartId } from './theme-types';

/**
 * Version of Object.entries typed to allow easy iteration over objects. Callers
 * must promise that objects passed do not have any additional keys over those
 * included in the type
 */
export const typedEntries = <K extends string | number | symbol, V>(
  record: Record<K, V>,
): [K, V][] => Object.entries(record) as [K, V][];

export const colorParamToCss = (value: string | number) => {
  if (typeof value !== 'number') return value;
  const percent = Math.round(value * 1000) / 10;
  return `color-mix(in srgb, transparent, var(--ag-foreground-color) ${percent}%)`;
};

export const kebabCase = (str: string) => str.replace(/[A-Z]/g, (m) => `-${m}`).toLowerCase();

export const paramToVariableName = (paramName: string) => `--ag-${kebabCase(paramName)}`;

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const logErrorMessage = (message: unknown, error?: unknown) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(message, error);
  } else {
    // eslint-disable-next-line no-console
    console.error(message);
  }
};

export const proportionToPercent = (value: number) =>
  Math.round(Math.max(0, Math.min(1, value)) * 1000) / 10;

export type DefinePartArgs<T extends string, O extends string> = {
  partId: PartId;
  variantId: string;
  overrideParams?: Partial<ParamDefaults<O>>;
  additionalParams?: ParamDefaults<T>;
  dependencies?: Part<T>[];
  css?: Array<string | (() => string)>;
  icons?: Record<string, string>;
};

export const definePart = <T extends string = never>(
  args: DefinePartArgs<T, CoreParam>,
): Part<T> => {
  const defaults: any = Object.assign({}, args.additionalParams || {}, args.overrideParams || {});
  return {
    ...args,
    defaults,
    params: Object.keys(defaults || {}) as T[],
    css: args.css || [],
    dependencies: args.dependencies || [],
  };
};

export const extendPart = <E extends string, T extends string>(
  parent: Part<E>,
  ext: DefinePartArgs<T, CoreParam | E>,
): Part<E | T> => {
  const defaults: any = Object.assign(
    {},
    parent.defaults,
    ext.additionalParams || {},
    ext.overrideParams || {},
  );
  return {
    partId: ext.partId,
    variantId: ext.variantId,
    params: parent.params.concat(Object.keys(defaults) as any[]),
    dependencies: parent.dependencies.concat(ext.dependencies || []),
    defaults,
    css: parent.css.concat(ext.css || []),
  };
};

export const camelCase = (str: string) =>
  str.replace(/[\W_]+([a-z])/g, (_, letter) => letter.toUpperCase());

let combinedCount = 0;
export const combineParts = <P extends Part>(parts: P[]): Part<P['params'][number]> => ({
  // TODO replace this with a proper way to combine parts, are we going to define a new part kind e.g. "theme" or introduce a concept of anonymous parts?
  partId: `combined_${combinedCount++}` as any,
  variantId: 'hack',
  params: parts.flatMap((part) => part.params),
  dependencies: parts,
  defaults: {} as any,
  css: [],
});
