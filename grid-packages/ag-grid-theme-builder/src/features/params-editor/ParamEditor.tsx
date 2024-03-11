import { Close } from '@carbon/icons-react';
import styled from '@emotion/styled';
import { ReactElement } from 'react';
import { borderValueToCss } from '../../ag-grid-community-themes/theme-utils';
import { Checkbox } from '../../components/Checkbox';
import { Tooltip } from '../../components/Tooltip';
import { Cell } from '../../components/layout';
import { ParamModel, useParamAtom } from '../../model/ParamModel';
import { ColorParamEditor } from './ColorParamEditor';
import { CssParamEditor } from './CssParamEditor';

export type ParamEditorProps = {
  param: ParamModel;
};

export const ParamEditor = ({ param }: ParamEditorProps) => {
  const [value, setValue] = useParamAtom(param);

  if (value == null) return null;

  const renderEditor = (): ReactElement => {
    switch (param.type) {
      case 'color':
        return <ColorParamEditor param={param} />;
      case 'border':
        return (
          <Checkbox
            checked={borderValueToCss(value) === borderValueToCss(true)}
            onChange={(newValue) => setValue(newValue)}
          />
        );
      case 'borderStyle':
        return (
          <select value={value || null} onChange={(e) => setValue(e.target.value)}>
            <option>solid</option>
            <option>dotted</option>
            <option>dashed</option>
            <option>none</option>
          </select>
        );
      default:
        return <CssParamEditor param={param} />;
    }
  };

  return (
    <>
      <LabelCell>
        <Tooltip title={param.docs}>
          <span>{param.label}:</span>
        </Tooltip>
      </LabelCell>
      {renderEditor()}
      {/* TODO use a button with hover effect */}
      <RemoveIcon onClick={() => setValue(undefined)} />
    </>
  );
};

const RemoveIcon = styled(Close)`
  opacity: 0.5;
`;

const LabelCell = styled(Cell)`
  font-size: 0.9em;
`;
