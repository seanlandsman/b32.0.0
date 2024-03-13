import { isBorderStyleValue } from '../../ag-grid-community-themes';
import { useRenderedTheme } from '../../model/rendered-theme';
import { ValueEditorProps } from './ValueEditorProps';

export const LengthValueEditor = (props: ValueEditorProps) => {
  const theme = useRenderedTheme();
  const value = isBorderStyleValue(props.value)
    ? props.value
    : theme.paramDefaults[props.param.property];
  return (
    <input
      type="range"
      min={0}
      max={20}
      value={parseFloat(value)}
      onChange={(e) => {
        const value = e.target.valueAsNumber;
        if (!isNaN(value)) {
          props.onChange(`${value}px`);
        }
      }}
    />
  );
};
