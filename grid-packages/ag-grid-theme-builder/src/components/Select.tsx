export type SelectProps<T extends {}> = {
  value: T | null | undefined;
  onChange: (newValue: T | null) => void;
  options: T[];
  getLabel?: (option: T) => string;
};

export function Select<T extends {}>(props: SelectProps<T>) {
  const getLabel = (t: T) => props.getLabel?.(t) ?? String(t);

  const currentStringValue = props.value != null ? getLabel(props.value) : null;
  let hasValue = false;
  const options = props.options.map((t) => {
    const stringValue = getLabel(t);
    const selected = stringValue === currentStringValue;
    if (selected) {
      hasValue = true;
    }
    return (
      <option key={stringValue} selected={stringValue === currentStringValue}>
        {stringValue}
      </option>
    );
  });
  return (
    <select
      value={currentStringValue || ''}
      onChange={(e) => {
        const selectedT = props.options.find((t) => getLabel(t) === e.target.value);
        if (selectedT) {
          props.onChange(selectedT);
        }
      }}
    >
      {!hasValue && (
        <option key="" selected={true}>
          choose...
        </option>
      )}
      {options}
    </select>
  );
}
