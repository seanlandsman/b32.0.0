import { useState } from 'react';
import { ParamType } from '../../ag-grid-community-themes/metadata/docs';
import { Input } from '../../components/Input';
import { ValueEditorProps } from './ValueEditorProps';

export const CssValueEditor = ({ param, value, onChange }: ValueEditorProps) => {
  const [editorValue, setEditorValue] = useState(value == null ? '' : String(value));
  const [valid, setValid] = useState(() => cssStringIsValid(editorValue, param.type));

  return (
    <Input
      className={valid ? undefined : 'is-error'}
      value={editorValue}
      onChange={(newValue) => {
        const isValid = cssStringIsValid(newValue, param.type);
        setEditorValue(newValue);
        setValid(isValid);
        if (isValid) {
          onChange(newValue);
        }
      }}
    />
  );
};

const cssStringIsValid = (value: string, type: ParamType): boolean => {
  value = value.trim();
  if (value === '') return true;
  if (!reinterpretationElement) {
    reinterpretationElement = document.createElement('span');
    document.body.appendChild(reinterpretationElement);
  }
  const cssProperty = cssPropertyForParamType[type];
  try {
    reinterpretationElement.style[cssProperty as any] = value;
    return reinterpretationElement.style[cssProperty] != '';
  } finally {
    reinterpretationElement.style[cssProperty as any] = '';
  }
};

const cssPropertyForParamType: Record<ParamType, keyof CSSStyleDeclaration> = {
  color: 'backgroundColor',
  length: 'paddingLeft',
  border: 'borderLeft',
  borderStyle: 'borderTopStyle',
  shadow: 'boxShadow',
  image: 'backgroundImage',
  fontFamily: 'fontFamily',
  fontWeight: 'fontWeight',
  display: 'display',
  duration: 'transitionDuration',
};

let reinterpretationElement: HTMLElement | null = null;
