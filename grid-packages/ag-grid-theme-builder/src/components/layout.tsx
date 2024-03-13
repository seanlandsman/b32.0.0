import styled from '@emotion/styled';

export const TightTwoColumnTable = styled('div')`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 16px;
`;

export const TwoColumnTable = styled(TightTwoColumnTable)`
  grid-row-gap: 8px;
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

export const HStack = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  border-bottom: 1px solid var(--color-border-primary);
  margin: 8px 0;
`;
