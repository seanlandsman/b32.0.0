import { Provider, createStore } from 'jotai';
import { useMemo } from 'react';
import { allParts } from './ag-grid-community-themes/parts/parts';
import { RootContainer } from './components/RootContainer';
import { rerenderTheme } from './model/rendered-theme';

export const ThemeBuilder = () => {
  const store = useMemo(createStore, []);

  (window as any).handlePartsCssChange = (oldCss: string, newCss: string) => {
    allParts.forEach((part) => {
      if (part.css && part.css.includes(oldCss)) {
        part.css = part.css.map((css) => (css === oldCss ? newCss : css));
      }
    });
    rerenderTheme(store);
  };

  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
};
