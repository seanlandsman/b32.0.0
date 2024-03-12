import { ParamModel } from '../../model/ParamModel';

export type ValueEditorProps = {
  param: ParamModel;
  value: unknown;
  onChange: (newValue: unknown) => void;
};
