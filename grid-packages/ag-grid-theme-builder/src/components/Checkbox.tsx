import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { combineClassNames } from './component-utils';

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

export const Checkbox = ({ checked, onChange, children, disabled, className }: CheckboxProps) => (
  <Container className={combineClassNames(className, disabled && 'is-disabled')}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
    />
    {children}
  </Container>
);

const Container = styled('label')`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  &.is-disabled {
    opacity: 0.5;
  }
`;
