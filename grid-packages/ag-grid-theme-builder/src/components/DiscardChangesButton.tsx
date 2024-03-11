import { TrashCan } from '@carbon/icons-react';
import { STORAGE_KEY_PREFIX } from '../model/JSONStorage';
import { Button } from './Button';

export const DiscardChangesButton = () => (
  <Button
    onClick={() => {
      if (confirm('Discard all of your theme customisations?')) {
        const keys = Array(localStorage.length)
          .fill(null)
          .map((_, i) => localStorage.key(i));
        for (const key of keys) {
          if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
            localStorage.removeItem(key);
          }
        }
        location.reload();
      }
    }}
  >
    <TrashCan /> Discard changes
  </Button>
);
