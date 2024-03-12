import { ReactNode } from 'react';

export type SelectProps<T extends {}> = {
  value: T | null | undefined;
  onChange?: (newValue: T | null) => void;
  options: T[];
  getLabel?: (option: T) => string;
  getGroupLabel?: (option: T) => string;
};

export function Select<T extends {}>({
  options,
  value,
  onChange,
  getLabel = String,
  getGroupLabel,
}: SelectProps<T>) {
  const currentStringValue = value != null ? getLabel(value) : null;
  let hasValue = false;

  const optionSpecs = options.map((option) => {
    const stringValue = getLabel(option);
    if (stringValue === currentStringValue) hasValue = true;
    return { stringValue, groupLabel: getGroupLabel?.(option) };
  });

  const children: ReactNode[] = [];
  let currentGroupLabel: string | undefined;
  let currentGroup = children;
  for (let i = 0; i < optionSpecs.length; i++) {
    const spec = optionSpecs[i];
    if (currentGroupLabel !== spec.groupLabel) {
      currentGroupLabel = spec.groupLabel;
      if (currentGroupLabel) {
        currentGroup = [];
        children.push(
          <optgroup key={i} label={currentGroupLabel}>
            {currentGroup}
          </optgroup>,
        );
      } else {
        currentGroup = children;
      }
    }
    currentGroup.push(<option key={i}>{spec.stringValue}</option>);
  }

  return (
    <select
      value={currentStringValue || ''}
      onChange={(e) => {
        const selectedT = options.find((t) => getLabel(t) === e.target.value);
        if (selectedT) {
          onChange?.(selectedT);
        }
      }}
    >
      {!hasValue && (
        <option value={currentStringValue || ''} selected={true}>
          {currentStringValue || 'choose...'}
        </option>
      )}
      {children}
    </select>
  );
}
