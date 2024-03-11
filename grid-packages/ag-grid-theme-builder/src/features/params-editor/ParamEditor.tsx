import { Close } from '@carbon/icons-react';
import { ReactElement } from 'react';
import { borderValueToCss } from '../../ag-grid-community-themes/theme-utils';
import { Checkbox } from '../../components/Checkbox';
import { Cell } from '../../components/Table';
import { Tooltip } from '../../components/Tooltip';
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
    const { meta } = param;
    switch (meta.type) {
      case 'color':
        return <ColorParamEditor param={param} meta={meta} />;
      case 'border':
        return (
          <Checkbox
            checked={borderValueToCss(value) === borderValueToCss(true)}
            onChange={(e) => setValue(e.target.checked)}
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
      case 'length':
      case 'css':
        return <CssParamEditor param={param} />;
    }
  };

  return (
    <>
      <LabelCell>
        <Tooltip title={param.meta.docs}>
          <span>{param.label}:</span>
        </Tooltip>
      </LabelCell>
      {renderEditor()}
      <IconButton onClick={() => setValue(undefined)}>
        <RemoveIcon />
      </IconButton>
    </>
  );
};

const RemoveIcon = styled(Close)`
  opacity: 0.5;
`;

const LabelCell = styled(Cell)`
  font-size: 0.9em;
`;
