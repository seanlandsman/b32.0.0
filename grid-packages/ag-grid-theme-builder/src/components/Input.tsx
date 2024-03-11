import styled from '@emotion/styled';
import { combineClassNames } from './component-utils';

export type InputProps = {
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isError?: boolean;
  className?: string;
};

export const Input = (props: InputProps) => (
  <StyledInput
    placeholder={props.placeholder}
    value={props.value}
    onChange={(e) => props.onChange?.(e.target.value)}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    className={combineClassNames(props.className, props.isError && 'is-error')}
  />
);

export const StyledInput = styled('input')`
  &.is-error {
    border-color: var(--color-input-error);
  }
`;
