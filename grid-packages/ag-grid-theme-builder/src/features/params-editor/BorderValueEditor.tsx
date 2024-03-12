import { borderValueToCss } from '../../ag-grid-community-themes/theme-utils';
import { Checkbox } from '../../components/Checkbox';
import { ValueEditorProps } from './ValueEditorProps';

export const BorderValueEditor = ({ value, onChange }: ValueEditorProps) => {
  return (
    <Checkbox
      checked={borderValueToCss(value) === borderValueToCss(true)}
      onChange={(newValue) => onChange(newValue)}
    />
  );
};
