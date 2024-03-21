type PartValue<T extends string = never> = {
  id: string;
  feature: string;
  name: string;
  defaults: Record<T, any>;
};

// type PartFunction<T extends string = never> = (() => PartValue<T>) & {
//   feature: string;
// };

type PartFunction<TArgs, TParams extends string> = ((args?: TArgs) => PartValue<TParams>) & {
  feature: string;
};

type Part<T extends string = never> = PartValue<T> | PartFunction<any, T>;

type Parts<T extends string = never> = Part<T>[];

type InferParams<T> = T extends any[]
  ? InferParams<T[number]>
  : T extends PartValue<infer P>
    ? P
    : T extends PartFunction<any, infer P>
      ? P
      : never;

type foo = InferParams<never[]>;
type foo2 = InferParams<Part<'x'>[]>;

type DefinePartArgs<TExt extends Part<string>, TInc extends Parts<string>, TAdd extends string> = {
  id: string;
  extend?: TExt;
  includeByDefault?: TInc;
  addParams?: Record<TAdd, any>;
  //   overrideParams?: {[K in TOver]: K extends InferParams<TExt> | InferParams<TInc> ? any : never};
  overrideParams?: Partial<Record<InferParams<TExt> | InferParams<TInc>, any>>;
};

const definePart = <
  TExt extends Part<string> = Part<never>,
  TInc extends Parts<string> = never[],
  TAdd extends string = never,
  TArgs = void,
>(
  builder: (args?: TArgs) => DefinePartArgs<TExt, TInc, TAdd>,
): PartFunction<TArgs, InferParams<TExt> | InferParams<TInc> | TAdd> => {
  return undefined as any;
};

const aFunc = definePart(() => ({
  id: 'a',
  addParams: { a: 1 },
  overrideParams: {},
}));

const aValue = aFunc();

const bFunc = definePart(() => ({
  id: 'blarty',
  addParams: { b: 2 },
  overrideParams: {},
}));

const bValue = bFunc();

const cFunc = definePart(() => ({
  id: 'blarty',
  addParams: { c: 2 },
  overrideParams: {},
}));

const cValue = cFunc();

const extendsAIncludesBC = definePart(() => ({
  id: 'extendsAIncludesBC',
  extend: aValue,
  includeByDefault: [bFunc, cValue],
}));

// Next up: put feature in definePart and set on function

// Then add transferableAbortSignal, usiung type checking:

type Equal<A, B> = 'notequal' extends
  | (A extends B ? 'equal' : 'notequal')
  | (B extends A ? 'equal' : 'notequal')
  ? false
  : true;

// gives a type error if not equal
const assertTypesEqual = <A, B>(a: Equal<A, B>) => {};

assertTypesEqual<'foo', 'foo' | 'bar'>(true);

const withArgs = definePart((arg?: boolean) => ({
  id: 'extendsAIncludesBCWithArgs',
  extend: aValue,
  includeByDefault: [bFunc, cValue],
}));

withArgs(true);

export const defineTheme = <P extends Part>(
  partOrParts: P | P[],
  parameters: Partial<Record<InferParams<P>, any>>,
) => {};
