import styled from '@emotion/styled';
import { memo } from 'react';
import { GridConfigDropdownButton } from '../features/grid-config/GridConfigDropdown';
import { ParamEditor } from '../features/params-editor/ParamEditor';
import { VariantSelector } from '../features/variant-selector/VariantSelector';
import { ParamModel } from '../model/ParamModel';
import { PartModel } from '../model/PartModel';
import { useRenderedTheme } from '../model/rendered-theme';
import { CopyButton } from './CopyButton';
import { DiscardChangesButton } from './DiscardChangesButton';
import { GridPreview } from './GridPreview';
import { TwoColumnTable } from './layout';

export const RootContainer = memo(() => {
  const theme = useRenderedTheme();
  return (
    <Container>
      <Grid>
        <Header>
          <GridConfigDropdownButton />
          <Spacer />
          <CopyButton getText={() => theme.css}>Copy CSS</CopyButton>
          <DiscardChangesButton />
        </Header>
        <Menu>
          <TwoColumnTable rowMinHeight="36px" rowGap>
            <VariantSelector part={PartModel.for('colorScheme')} />
            <VariantSelector part={PartModel.for('design')} />
            <ParamEditor param={ParamModel.for('gridSize')} />
            <ParamEditor param={ParamModel.for('accentColor')} />
            <ParamEditor param={ParamModel.for('primaryColor')} />
            <VariantSelector part={PartModel.for('iconSet')} />
            <ParamEditor param={ParamModel.for('iconSize')} />
            <VariantSelector part={PartModel.for('tabStyle')} />
            <ParamEditor param={ParamModel.for('fontSize')} />
          </TwoColumnTable>
        </Menu>
        <Main>
          <GridPreview />
        </Main>
      </Grid>
    </Container>
  );
});

const Container = styled('div')`
  padding: 8px;
  height: 100%;
`;

const Grid = styled('div')`
  height: 100%;
  display: grid;
  grid-template-areas:
    'header header'
    'menu main';
  grid-template-columns: 400px auto;
  grid-template-rows: min-content auto;
  gap: 20px;

  font-family: 'IBM Plex Sans', sans-serif;

  .tooltip {
    max-width: 400px;
  }
`;

const Header = styled('div')`
  grid-area: header;
  display: flex;
  gap: 16px;
`;

const Spacer = styled('div')`
  flex-grow: 1;
`;

const Menu = styled('div')`
  grid-area: menu;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Main = styled('div')`
  grid-area: main;
`;
