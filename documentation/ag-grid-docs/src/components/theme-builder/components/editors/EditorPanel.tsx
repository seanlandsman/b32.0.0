import styled from '@emotion/styled';
import * as Accordion from '@radix-ui/react-accordion';
import type { ReactNode } from 'react';

import { ParamEditor } from './ParamEditor';

export const EditorPanel = () => {
    return (
        <Root type="multiple" defaultValue={['General']}>
            <Item heading="General">
                <LeftBiasRow>
                    <ParamEditor param="fontFamily" />
                    <ParamEditor param="fontSize" />
                </LeftBiasRow>
                <ParamEditor param="backgroundColor" />
                <ParamEditor param="foregroundColor" />
                <ParamEditor param="accentColor" />
                <ParamEditor param="gridSize" />
                <EvenSplitRow>
                    <ParamEditor param="wrapperBorderRadius" label="Wrapper radius" />
                    <ParamEditor param="borderRadius" label="Widget radius" />
                </EvenSplitRow>
            </Item>
            <Item heading="Header">
                <ParamEditor param="headerVerticalPadding" label='Vertical padding' />
                <ParamEditor param="headerBackgroundColor" label='Background color' />
                <ParamEditor param="headerForegroundColor" label='Foreground color' />
                <LeftBiasRow>
                    <ParamEditor param="headerFontFamily" label='Font family' />
                    <ParamEditor param="headerFontSize"  label='Font size'/>
                </LeftBiasRow>
            </Item>
        </Root>
    );
};

const Root = styled(Accordion.Root)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const Item = (props: { heading: string; children: ReactNode }) => (
    <Accordion.Item value={props.heading}>
        <Accordion.Header>
            <Trigger>{props.heading}</Trigger>
        </Accordion.Header>
        <Content>{props.children}</Content>
    </Accordion.Item>
);

const Content = styled(Accordion.Content)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;

    overflow: hidden;
    transition: height 300ms ease-in-out;

    &[data-state='open'] {
        animation: slideDown 300ms ease-out;
    }
    &[data-state='closed'] {
        animation: slideUp 300ms ease-out;
    }

    @keyframes slideDown {
        from {
            height: 0;
        }
        to {
            height: var(--radix-accordion-content-height);
        }
    }

    @keyframes slideUp {
        from {
            height: var(--radix-accordion-content-height);
        }
        to {
            height: 0;
        }
    }
`;

const Trigger = styled(Accordion.Trigger)`
    all: unset;
    font-size: 16px;
    font-weight: 600;

    &:hover {
        all: unset;
        font-size: 16px;
        font-weight: 600;
    }
`;

const EvenSplitRow = styled('div')`
    display: flex;
    gap: 12px;
    > * {
        flex: 1;
    }
`;

const LeftBiasRow = styled('div')`
    display: flex;
    gap: 12px;
    > :nth-child(1) {
        flex: 2;
    }
    > :nth-child(2) {
        flex: 1;
    }
`;
