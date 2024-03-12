import { isBorderStyleValue } from '../../ag-grid-community-themes';
import { Select } from '../../components/Select';
import { useRenderedTheme } from '../../model/rendered-theme';
import { ValueEditorProps } from './ValueEditorProps';

const cssBorderStyles = ['solid', 'dotted', 'dashed', 'none'];

export const BorderStyleValueEditor = (props: ValueEditorProps) => {
  const theme = useRenderedTheme();
  const value = isBorderStyleValue(props.value)
    ? props.value
    : theme.paramDefaults[props.param.property];
  return <Select options={cssBorderStyles} value={value} onChange={props.onChange} />;
};
