import styled from '@emotion/styled';

import { useRenderedTheme } from '../../model/rendered-theme';
import { EditorPanel } from '../editors/EditorPanel';
import { GridConfigDropdownButton } from '../grid-config/GridConfigDropdown';
import { DownloadThemeButton } from './Download';
import { GridPreview } from './GridPreview';

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
    padding-right: 20px;
    position: relative;

    &:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 12px;
        margin-top: -12px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
    }
`;

const Main = styled('div')`
    grid-area: main;
    padding-left: 10px;
`;
