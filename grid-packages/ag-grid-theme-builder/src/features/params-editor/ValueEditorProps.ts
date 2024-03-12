import { ParamModel } from '../../model/ParamModel';

export type ValueEditorProps = {
  param: ParamModel;
  value: any;
  onChange: (newValue: any) => void;
};
