import { ColorEditor } from '../color-editor/ColorEditor';
import { ValueEditorProps } from './ValueEditorProps';

const preventTransparency = new Set(['backgroundColor']);
const preventVariables = new Set(['backgroundColor', 'foregroundColor', 'accentColor']);

export const ColorValueEditor = ({ param, value, onChange }: ValueEditorProps) => {
  return (
    <ColorEditor
      value={value || null}
      onChange={onChange}
      preventTransparency={preventTransparency.has(param.property)}
      preventVariables={preventVariables.has(param.property)}
    />
  );
};
