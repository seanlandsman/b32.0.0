import { Param } from './GENERATED-param-types';

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

// TODO introduce references, and use branded types to filter the keys on
// ParamTypes so that you can only reference values of the correct type export
// type Ref = { ref: Param }; type BrandedType<B extends string, T = any> = {__type?: B } & T;

export type ColorValue = string;

export type LengthValue = string; // TODO allow number and treat as px

export type BorderValue = string | boolean;

export type ShadowValue = string; // TODO object shorthand for common shadows? Or maybe just allow var(accentColor) in value
