import { Eyedropper } from '@carbon/icons-react';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { useChangeHandler } from '../../components/component-utils';
import { SmallNote, Stack } from '../../components/layout';
import { LargeColorSwatch } from './ColorSwatch';
import { UncontrolledColorEditorProps } from './color-editor-utils';

export const EyedropperColorEditor = ({ initialValue, onChange }: UncontrolledColorEditorProps) => {
  const [value, setValue] = useState(initialValue);
  const [open, setOpen] = useState(false);

  useChangeHandler(value, onChange);

  const EyeDropper = window.EyeDropper;

  if (!EyeDropper) {
    return (
      <Stack>
        <SmallNote>
          Your browser does not support the EyeDropper API. In{' '}
          <a href="https://caniuse.com/?search=eyedropper" rel="noreferrer" target="_blank">
            supported browsers
          </a>{' '}
          this allows you to pick colours from your website or design.
        </SmallNote>
      </Stack>
    );
  }

  return (
    <Stack>
      <LargeColorSwatch color={value} />
      <Button
        onClick={() => {
          setOpen(true);
          void new EyeDropper().open().then(({ sRGBHex }) => setValue(sRGBHex));
        }}
      >
        <Eyedropper /> pick color
      </Button>

      <SmallNote>
        {open
          ? 'Click anywhere on your screen to select that colour, or hit ESC to cancel'
          : 'Open your website or design in another window and pick colours from it.'}
      </SmallNote>
    </Stack>
  );
};
