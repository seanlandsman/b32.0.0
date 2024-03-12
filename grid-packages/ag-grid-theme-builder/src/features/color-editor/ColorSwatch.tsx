import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Tooltip } from '../../components/Tooltip';
import { RGBAColor } from './RGBAColor';

export type ColorSwatchProps = {
  color: string;
  className?: string;
  children?: ReactNode;
};

export const ColorSwatch = ({ color, className, children }: ColorSwatchProps) => {
  return (
    <ColorSwatchCard className={className}>
      {children}
      <Color
        style={{
          backgroundColor: color,
        }}
      />
    </ColorSwatchCard>
  );
};

type ColorProps = {
  color: string;
};

const Color = styled('div')`
  width: 100%;
  height: 100%;
`;

const OpaqueBackground = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 60px;
  background-color: ${({ color }: ColorProps) => color};
`;

const ColorOverOpaqueBackground = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  margin-left: -20px;
  margin-top: -20px;
  border-radius: 20px;
  border: solid 5px;
`;

const ColorSwatchCard = styled('div')`
  border-radius: 6px;
  padding: 16px;
  height: 60px;
  padding: 0;
  border-width: 2px;
  overflow: hidden;
  background-color: var(--color-bg-primary);
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>');
  position: relative;
`;

export const LargeColorSwatch = (props: ColorSwatchProps) => {
  const bg = RGBAColor.reinterpretCss('var(--ag-background-color)');
  const color = RGBAColor.reinterpretCss(props.color);
  const colorIsBackground = bg && color && bg.equals(color);
  return (
    <LargeColorSwatchContainer {...props}>
      {!colorIsBackground && (
        <Tooltip title="This shows your color on top of the background">
          <OpaqueBackground color="var(--ag-background-color)">
            <ColorOverOpaqueBackground
              style={{
                borderColor: props.color,
              }}
            />
          </OpaqueBackground>
        </Tooltip>
      )}
    </LargeColorSwatchContainer>
  );
};

const LargeColorSwatchContainer = styled(ColorSwatch)`
  box-shadow: 0 0 7px 2px var(--color-border-primary);
`;
