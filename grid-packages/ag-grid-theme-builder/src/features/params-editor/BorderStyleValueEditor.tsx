import { ValueEditorProps } from './ValueEditorProps';

export const BorderStyleValueEditor = ({ value, onChange }: ValueEditorProps) => {
  return (
    <select value={value || null} onChange={(e) => onChange(e.target.value)}>
      <option>solid</option>
      <option>dotted</option>
      <option>dashed</option>
      <option>none</option>
    </select>
  );
};
