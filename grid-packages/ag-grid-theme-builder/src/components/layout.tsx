import styled from '@emotion/styled';

type TwoColumnTableProps = {
  rowGap?: number;
};

export const TwoColumnTable = styled('div')`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 16px;
  grid-row-gap: ${(props: TwoColumnTableProps) => `${(props.rowGap ?? 0) * 8}px`};
`;

export const Cell = styled('div')`
  display: flex;
  align-items: center;
`;

export const Stack = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const WideStack = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SmallNote = styled('div')`
  font-size: 0.85em;
`;

export const Divider = styled('div')`
  border-bottom: 1px solid var(--ag-border-color);
  margin: 8px 0;
`;
