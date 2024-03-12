import { borderValueToCss, isBorderValue } from '../../ag-grid-community-themes';
import { Checkbox } from '../../components/Checkbox';
import { useRenderedTheme } from '../../model/rendered-theme';
import { ValueEditorProps } from './ValueEditorProps';

export const BorderValueEditor = (props: ValueEditorProps) => {
  const theme = useRenderedTheme();
  const value = isBorderValue(props.value)
    ? props.value
    : theme.paramDefaults[props.param.property];
  return (
    <Checkbox
      checked={borderValueToCss(value) === borderValueToCss(true)}
      onChange={(newValue) => props.onChange(newValue)}
    />
  );
};
