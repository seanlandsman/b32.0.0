import { ParamModel, useParamAtom } from '../../model/ParamModel';
import { ColorEditor } from '../color-editor/ColorEditor';

export type ParamEditorProps = {
  param: ParamModel;
};

const preventTransparency = new Set(['backgroundColor']);
const preventVariables = new Set(['backgroundColor', 'foregroundColor', 'accentColor']);

export const ColorParamEditor = ({ param }: ParamEditorProps) => {
  const [value, setValue] = useParamAtom(param);
  return (
    <ColorEditor
      value={value || null}
      onChange={setValue}
      preventTransparency={preventTransparency.has(param.property)}
      preventVariables={preventVariables.has(param.property)}
    />
  );
};
