import { isColorValue } from '../../ag-grid-community-themes';
import { useRenderedTheme } from '../../model/rendered-theme';
import { ColorEditor } from '../color-editor/ColorEditor';
import { ValueEditorProps } from './ValueEditorProps';

const preventTransparency = new Set(['backgroundColor']);
const preventVariables = new Set(['backgroundColor', 'foregroundColor']);

export const ColorValueEditor = (props: ValueEditorProps) => {
  const theme = useRenderedTheme();
  const value = isColorValue(props.value) ? props.value : theme.paramDefaults[props.param.property];
  return (
    <ColorEditor
      value={value}
      onChange={props.onChange}
      preventTransparency={preventTransparency.has(props.param.property)}
      preventVariables={preventVariables.has(props.param.property)}
    />
  );
};
