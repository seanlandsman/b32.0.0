import styled from '@emotion/styled';

import { GridPreview } from './GridPreview';
import { useRenderedTheme } from '../../model/rendered-theme';

export const RootContainer = () => {
    useRenderedTheme();
    return (
        <Container>
            <Grid>
                <Header>Header</Header>
                <Menu>Menu</Menu>
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
    height: calc(100vh - var(--header-nav-height));
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
