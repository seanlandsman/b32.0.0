import { isBorderStyleValue } from '../../ag-grid-community-themes';
import { useRenderedTheme } from '../../model/rendered-theme';
import { ValueEditorProps } from './ValueEditorProps';

const minMaxStep: Record<string, { min?: number; max?: number; step?: number } | undefined> = {
  gridSize: { min: 1, max: 20, step: 0.5 },
};

export const LengthValueEditor = ({ value, onChange, param }: ValueEditorProps) => {
  const theme = useRenderedTheme();
  const displayValue = isBorderStyleValue(value) ? value : theme.paramDefaults[param.property];
  return (
    <input
      type="range"
      min={minMaxStep[param.property]?.min ?? 0}
      max={minMaxStep[param.property]?.max ?? 50}
      step={minMaxStep[param.property]?.step ?? 1}
      value={parseFloat(displayValue)}
      onChange={(e) => {
        const value = e.target.valueAsNumber;
        if (!isNaN(value)) {
          onChange(`${value}px`);
        }
      }}
    />
  );
};
