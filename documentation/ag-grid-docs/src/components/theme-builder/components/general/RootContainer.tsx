import styled from '@emotion/styled';

import { useRenderedTheme } from '../../model/rendered-theme';
import { GridConfigDropdownButton } from '../grid-config/GridConfigDropdown';
import { GridPreview } from './GridPreview';
import { DownloadThemeButton } from './Download';
import { EditorPanel } from '../editors/EditorPanel';

export const RootContainer = () => {
    useRenderedTheme();
    return (
        <Container>
            <Grid>
                <Menu>
                    <EditorPanel />
                </Menu>
                <MenuBottom>
                    <DownloadThemeButton />
                    <Spacer />
                    <GridConfigDropdownButton />
                </MenuBottom>
                <Main>
                    <GridPreview />
                </Main>
            </Grid>
        </Container>
    );
};

const Container = styled('div')`
    padding: 8px;
    width: 100%;
    height: calc(100vh - var(--header-nav-height) - 16px);
    margin-top: 16px;
    margin-bottom: 40px;
`;

const Grid = styled('div')`
    height: 100%;
    display: grid;
    grid-template-areas:
        'menu main'
        'menu-bottom main';
    grid-template-columns: 400px auto;
    grid-template-rows: auto min-content;
    gap: 20px;

    font-family: 'IBM Plex Sans', sans-serif;

    .tooltip {
        max-width: 400px;
    }
`;

const Spacer = styled('div')`
    flex-grow: 1;
`;

const Menu = styled('div')`
    grid-area: menu;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
`;

const MenuBottom = styled('div')`
    grid-area: menu-bottom;
    display: flex;
    gap: 20px;
`;

const Main = styled('div')`
    grid-area: main;
`;
