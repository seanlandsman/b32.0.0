import styled from '@emotion/styled';
import { UseFloatingOptions, autoUpdate, size, useFloating } from '@floating-ui/react';
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
  middleware: [
    size({
      apply({ availableHeight, elements }) {
        elements.floating.style.maxHeight = availableHeight ? `${availableHeight - 8}px` : '';
      },
    }),
  ],
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

    document.body.addEventListener('mousedown', handleStart);
    document.body.addEventListener('touchstart', handleStart);
    document.body.addEventListener('mouseup', handleEnd);
    document.body.addEventListener('touchend', handleEnd);

    return () => {
      document.body.removeEventListener('mousedown', handleStart);
      document.body.removeEventListener('touchstart', handleStart);
      document.body.removeEventListener('mouseup', handleEnd);
      document.body.removeEventListener('touchend', handleEnd);
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
  padding: 16px;
  border: solid 2px var(--color-button-primary-bg);
  border-radius: 6px;
  border-top-left-radius: 0;
  pointer-events: all;
  box-shadow: var(--shadow-md);
  overflow-y: auto;
`;
