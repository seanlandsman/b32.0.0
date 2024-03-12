import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { ParamType } from '../../ag-grid-community-themes/metadata/docs';
import { Tooltip } from '../../components/Tooltip';
import { Cell } from '../../components/layout';
import { ParamModel, useParamAtom } from '../../model/ParamModel';
import { renderedThemeAtom } from '../../model/rendered-theme';
import { BorderStyleValueEditor } from './BorderStyleValueEditor';
import { BorderValueEditor } from './BorderValueEditor';
import { ColorValueEditor } from './ColorValueEditor';
import { CssValueEditor } from './CssValueEditor';
import { ValueEditorProps } from './ValueEditorProps';

export type ParamEditorProps = {
  param: ParamModel;
};

export const ParamEditor = ({ param }: ParamEditorProps) => {
  const [value, setValue] = useParamAtom(param);

  const theme = useAtomValue(renderedThemeAtom);
  const editorValue = value != null ? value : theme.paramDefaults[param.property];

  if (editorValue == null) return null;

  const EditorComponent = paramEditorComponents[param.type] || CssValueEditor;

  return (
    <>
      <LabelCell>
        <Tooltip title={param.docs}>
          <span>{param.label}:</span>
        </Tooltip>
      </LabelCell>
      {<EditorComponent param={param} value={value} onChange={setValue} />}
    </>
  );
};

const paramEditorComponents: Record<ParamType, FC<ValueEditorProps>> = {
  color: ColorValueEditor,
  length: CssValueEditor,
  border: BorderValueEditor,
  borderStyle: BorderStyleValueEditor,
  shadow: CssValueEditor,
  image: CssValueEditor,
  fontFamily: CssValueEditor,
  fontWeight: CssValueEditor,
  display: CssValueEditor,
  duration: CssValueEditor,
};

export const ParamEditorsTable = styled('div')`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 8px;
  align-items: center;
`;

const LabelCell = styled(Cell)`
  font-size: 0.9em;
`;
