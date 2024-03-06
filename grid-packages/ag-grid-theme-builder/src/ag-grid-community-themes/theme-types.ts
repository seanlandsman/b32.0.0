import { Param, ParamTypes } from './GENERATED-param-types';

export type CssSource = string | ((params: Record<string, any>) => string);

export type Part<T extends string = string> = {
  feature: string;
  variant: string;
  params: T[];
  defaults?: { [K in T]: K extends Param ? ParamTypes[K] : any };
  css?: CssSource[];
  icons?: Record<string, string>;
};

export type CombinedParts<T extends string> = {
  params: T[];
  componentParts: AnyPart[];
};

export type AnyPart = Part<string> | CombinedParts<string>;
