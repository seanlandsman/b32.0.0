import styled from '@emotion/styled';
import { UseFloatingOptions, autoUpdate, shift, useFloating } from '@floating-ui/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { combineClassNames } from './component-utils';

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
  const { refs, floatingStyles, elements } = useFloating(floatingOptions);
  const [show, setShow] = useState(false);

  useClickAwayListener(() => setShow(false), [elements.domReference, elements.floating]);

  return (
    <>
      <StyledButton
        className={combineClassNames(props.className, show && 'is-dropdown-visible')}
        onClick={() => setShow(!show)}
        ref={refs.setReference}
        color="neutral"
      >
        {props.startDecorator}
        {props.children}
        {props.endDecorator}
      </StyledButton>
      {show && (
        <DropdownArea ref={refs.setFloating} style={floatingStyles}>
          {props.dropdownContent}
        </DropdownArea>
      )}
    </>
  );
};

const floatingOptions: Partial<UseFloatingOptions> = {
  whileElementsMounted: autoUpdate,
  placement: 'right-start',
  middleware: [shift({ padding: 8 })],
};

const useClickAwayListener = (
  onHide: () => void,
  ignoreElements: Array<Element | null | undefined>,
) => {
  const ignoreElementsRef = useRef(ignoreElements);
  ignoreElementsRef.current = ignoreElements;

  const ignore = useRef(false);

  useEffect(() => {
    const handleStart = (event: Event) => {
      ignore.current = ignoreElementsRef.current.some((el) => el?.contains(event.target as Node));
    };
    const handleEnd = () => {
      if (!ignore.current) {
        onHide();
      }
    };

    document.addEventListener('mousedown', handleStart);
    document.addEventListener('touchstart', handleStart);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousedown', handleStart);
      document.removeEventListener('touchstart', handleStart);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [onHide]);
};

const StyledButton = styled(Button)`
  &.is-dropdown-visible {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const DropdownArea = styled('div')`
  z-index: 1000;
  position: absolute;
  background-color: var(--color-bg-primary);
  border: solid 2px var(--color-button-primary-bg);
  border-radius: 6px;
  border-top-left-radius: 0;
  pointer-events: all;
  box-shadow: var(--shadow-md);
  overflow-y: auto;
  max-height: calc(100vh - 16px);
  > * {
    margin: 16px;
  }
`;
