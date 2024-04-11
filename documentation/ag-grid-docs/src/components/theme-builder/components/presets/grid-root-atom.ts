import { atom, useAtomValue, useSetAtom } from 'jotai';

export const gridRootAtom = atom<HTMLElement | null>(null);

export const useGridRoot = () => useAtomValue(gridRootAtom);

export const useSetGridRoot = () => useSetAtom(gridRootAtom);
