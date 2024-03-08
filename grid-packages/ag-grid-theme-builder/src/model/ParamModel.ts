import { useAtom, useAtomValue } from 'jotai';
import { core } from '../ag-grid-community-themes';
import { paramToVariableName } from '../ag-grid-community-themes/theme-utils';
import { PersistentAtom, atomWithJSONStorage } from './JSONStorage';
import { Store } from './store';
import { memoize, titleCase } from './utils';

export class ParamModel {
  readonly label: string;
  readonly valueAtom: PersistentAtom<any>;

  constructor(readonly property: string) {
    this.label = titleCase(property);
    this.valueAtom = atomWithJSONStorage(`param.${property}`, undefined);
  }

  hasValue = (store: Store) => store.get(this.valueAtom) != null;

  get variableName(): string {
    return paramToVariableName(this.property);
  }
}

export const useParamAtom = <T = any>(model: ParamModel) =>
  useAtom(model.valueAtom as PersistentAtom<T>);

export const useParam = (model: ParamModel) => useAtomValue(model.valueAtom);

export const allParamModels = memoize(() =>
  core.params
    .map((param) => new ParamModel(param))
    .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase())),
);
