type PartValue<T extends string = never> = {
  id: string;
  feature: string;
  name: string;
  defaults: Record<T, any>;
};

type PartFunction<T extends string = never> = () => PartValue<T>;

type Part<T extends string = never> = PartValue<T> | PartFunction<T>;

type Parts<T extends string = never> = Part<T>[];

type InferParams<T> = T extends any[]
  ? InferParams<T[number]>
  : T extends PartValue<infer P>
    ? P
    : T extends PartFunction<infer P>
      ? P
      : never;

type foo = InferParams<never[]>;
type foo2 = InferParams<Part<'x'>[]>;

type DefinePartArgs<TExt extends Part<string>, TInc extends Parts<string>, TAdd extends string> = {
  id: string;
  extend?: TExt;
  includeByDefault?: TInc;
  addParams: Record<TAdd, any>;
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
): ((args?: TArgs) => PartValue<InferParams<TExt> | InferParams<TInc> | TAdd>) => {
  return undefined as any;
};

const a = definePart(() => ({
  id: 'a',
  addParams: { amberbois: 4, fuug: 5, quang: 'g' },
  overrideParams: {},
}));

const blarty = definePart(() => ({
  id: 'blarty',
  addParams: { blartyA: 'a', blartyB: 'b' },
  overrideParams: {},
}));

const extie = definePart(() => ({
  id: 'extie',
  addParams: { extieA: 'a', extieB: 'b', nextie: 'c' },
  overrideParams: {},
}));

const b = definePart(() => ({
  id: 'b',
  extend: a,
  addParams: { b: 8, wollo: 5 },
}));

const b2 = definePart(() => ({
  id: 'b2',
  includeByDefault: [a],
  addParams: { b: 8 },
}));

const b3 = definePart(() => ({
  id: 'b3',
  extend: extie,
  includeByDefault: [a, blarty],
  addParams: { __b: 8 },
  overrideParams: {
    // amberbois: 5,
    // wollo: 6,
  },
}));

const switcheroo = definePart((dongle?: boolean) => ({
  id: 'b3',
  extend: extie,
  includeByDefault: [a, blarty],
  addParams: { __b: dongle ? 8 : 18 },
  overrideParams: {
    // amberbois: 5,
    // wollo: 6,
  },
}));

const bValue = b();

const usesbValue = definePart(() => ({
  id: 'b3',
  extend: bValue,
  addParams: { u: 8 },
  overrideParams: {},
}));
