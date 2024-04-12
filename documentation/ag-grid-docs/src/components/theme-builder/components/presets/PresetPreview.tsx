import styled from '@emotion/styled';

import { useGridPreviewHTML } from './grid-dom';

export const PresetPreview = () => {
    const previewHTML = useGridPreviewHTML();
    return (
        <Wrapper>
            <GridContainer dangerouslySetInnerHTML={{ __html: previewHTML }} />
        </Wrapper>
    );
};

const Wrapper = styled('div')`
    width: 350px;
    height: 140px;
    position: relative;
    overflow: hidden;
    border-radius: 12px;

    background-color: color-mix(in srgb, transparent, var(--color-fg-primary) 3%);
    border: solid 1px color-mix(in srgb, transparent, var(--color-fg-primary) 7%);
`;

const GridContainer = styled('div')`
    position: absolute;
    top: 25px;
    left: 25px;
    width: 600px;
    height: 500px;
    /* pointer-events: none; */
`;
