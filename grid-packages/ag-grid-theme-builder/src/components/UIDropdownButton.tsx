import styled from '@emotion/styled';
import { ReactNode, useRef, useState } from 'react';
import { Button } from './Button';

export type WidgetDropdownProps = {
  dropdownContent: ReactNode;
  children: ReactNode;
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
  className?: string;
};

/**
 * A version of MUI's menu component that can contain interactive UI in the dropdown. It doesn't close until you click outside the dropdown.
 */
export const UIDropdownButton = (props: WidgetDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  return (
    // TODO
    // <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
    <>
      <Button
        className={props.className}
        ref={buttonRef}
        color="neutral"
        onClick={() => {
          setAnchorEl(open ? null : buttonRef.current);
        }}
      >
        {props.startDecorator}
        {props.children}
        {props.endDecorator}
      </Button>
      <DropdownArea>{props.dropdownContent}</DropdownArea>
      {/* <StyledPopper id={popperId} open={open} anchorEl={anchorEl} placement="auto-end">
          {open && (
            <DropdownArea ref={dropdownRef}>
              {props.dropdownContent}
            </DropdownArea>
          )}
        </StyledPopper> */}
    </>
    // </ClickAwayListener>
  );
};

const DropdownArea = styled('div')`
  position: absolute;
  background-color: var(--color-bg-primary);
  padding: 16px;
  border: solid 2px var(--color-border-primary);
  border-radius: 6px;
  pointer-events: all;
  box-shadow: var(--shadow-md);
`;
