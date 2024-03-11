import styled from '@emotion/styled';
import { ComponentType } from 'react';
import { combineClassNames } from './component-utils';

type IconButtonProps = {
  label: string;
  onClick: () => void;
  icon: ComponentType;
  className?: string;
};

export const IconButton = ({ label, onClick, icon: IconComponent, className }: IconButtonProps) => {
  return (
    <Button onClick={onClick} className={combineClassNames('button-secondary', className)}>
      <Label>
        <LabelText>{label}</LabelText>
        <IconComponent />
      </Label>
    </Button>
  );
};

const Button = styled('button')`
  display: flex;
  justify-content: center;
`;

const LabelText = styled('span')`
  margin-right: 10px;
`;

const Label = styled('div')`
  display: flex;
  align-items: center;
`;
