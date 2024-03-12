import { Information } from '@carbon/icons-react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Tooltip } from '../../components/Tooltip';
import { useChangeHandler } from '../../components/component-utils';
import { Cell, HStack, SmallNote, Stack, TwoColumnTable } from '../../components/layout';
import { allParamModels } from '../../model/ParamModel';
import { titleCase } from '../../model/utils';
import { ColorSwatch, LargeColorSwatch } from './ColorSwatch';
import { RGBAColor } from './RGBAColor';
import { VarColor } from './VarColor';
import { UncontrolledColorEditorProps, formatProportionAs3dpPercent } from './color-editor-utils';

export const VarColorEditor = ({ initialValue, onChange }: UncontrolledColorEditorProps) => {
  const [value, setValue] = useState(() => initialValue);
  const [editorState, setEditorState] = useState(() => getInitialEditorState(initialValue));
  const enableChangeEvents = useChangeHandler(value, onChange, true);

  useEffect(() => {
    if (editorState) {
      setValue(new VarColor(editorState.variable.variable, editorState.alpha).toCSSFunction());
    }
  }, [editorState]);

  if (!editorState) {
    return (
      <Stack>
        <SmallNote>
          Specify colours as semi-transparent versions of other colours
          <InfoTooltip />
        </SmallNote>
        <Button
          onClick={() => {
            enableChangeEvents();
            const rgba = RGBAColor.reinterpretCss(value);
            setEditorState({
              alpha: rgba?.a ?? 1,
              variable: allVariableInfos[0],
            });
          }}
        >
          Enable % colours
        </Button>
      </Stack>
    );
  }

  const feedback =
    editorState.alpha === 1
      ? `Same as ${titleCase(formatVariable(editorState.variable.variable))}`
      : titleCase(formatVariable(editorState.variable.variable)) +
        ' with ' +
        formatProportionAs3dpPercent(editorState.alpha) +
        ' alpha';

  return (
    <Stack>
      <LargeColorSwatch color={value} />
      <span>
        {feedback}
        <InfoTooltip />
      </span>
      <TwoColumnTable rowGap={1}>
        <Cell>Color</Cell>
        {/* TODO restore me */}
        {/* <Autocomplete
          options={allVariableInfos}
          value={editorState.variable}
          onChange={(_, variable) => {
            enableChangeEvents();
            if (variable) {
              setEditorState({ ...editorState, variable });
            }
          }}
          placeholder="Choose a color"
          getOptionLabel={({ label }) => label}
          getOptionKey={({ id }) => id}
          groupBy={({ group }) => group}
          renderOption={(props, option) => (
            <AutocompleteOption {...props}>
              <VariableOption variable={option.variable} />
            </AutocompleteOption>
          )}
          slotProps={{ listbox: { sx: { minWidth: '400px' } } }}
        /> */}
        <Cell>Alpha</Cell>
        <input
          type="range"
          value={editorState.alpha}
          min={0}
          max={1}
          step={0.001}
          onChange={(e) => {
            enableChangeEvents();
            setEditorState({ ...editorState, alpha: e.target.valueAsNumber });
          }}
        />
      </TwoColumnTable>
    </Stack>
  );
};

const InformationIcon = styled(Information)`
  color: var(--joy-palette-primary-400);
  vertical-align: middle;
  display: inline-block;
  margin-left: 8px;
`;

type EditorState = {
  variable: VariableInfo;
  alpha: number;
};

const getInitialEditorState = (initialValue: string): EditorState | null => {
  const color = VarColor.parseCss(initialValue);
  if (!color) return null;
  const info = allVariableInfos.find((v) => v.variable === color.variable);
  if (!info) return null;
  return {
    variable: info,
    alpha: color.alpha,
  };
};

const formatVariable = (variable: string) => titleCase(variable.replace(/^--ag-/i, ''));

const VariableOption = ({ variable }: { variable: string }) => {
  return (
    <HStack>
      <VarColorSwatch color={`var(${variable})`} />
      <div>
        {formatVariable(variable)}
        <VariableNameHint>var({variable})</VariableNameHint>
      </div>
    </HStack>
  );
};

const VariableNameHint = styled('span')`
  font-size: 0.8em;
  color: var(--joy-palette-neutral-400);
`;

const VarColorSwatch = styled(ColorSwatch)`
  width: 40px;
  height: 40px;
  border-radius: 6px;
`;

const InfoTooltip = () => (
  <Tooltip
    title={
      <InfoBox>
        Tips:
        <InfoList>
          <InfoListItem>
            Specify related colours as semi-transparent versions of each other where possible
          </InfoListItem>
          <InfoListItem>
            Use a semi-transparent version of the foreground colour for elements that require a
            neutral colour such as borders
          </InfoListItem>
        </InfoList>
        This makes your theme more maintainable and ensures that colors look good against any
        background, even if the background is changed later.
      </InfoBox>
    }
  >
    <InformationIcon />
  </Tooltip>
);

const InfoBox = styled('div')`
  color: inherit;
  font-size: inherit;
  margin: 0;
  line-height: inherit;
  padding: 8px;
`;

const InfoList = styled('ul')`
  color: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0;
  list-style: disc;
`;

const InfoListItem = styled('li')`
  color: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0;
`;

type VariableInfo = {
  variable: string;
  id: string;
  label: string;
  group: string;
};

const variableInfo = (name: string, common?: boolean): VariableInfo => ({
  variable: name,
  id: common ? `common/${name}` : name,
  label: formatVariable(name),
  group: common ? 'Common variables' : 'All variables',
});

// TODO this list should be computed from the variables actually defined by the application
const allVariableInfos: VariableInfo[] = [
  variableInfo('--ag-foreground-color', true),
  variableInfo('--ag-background-color', true),
  variableInfo('--ag-accent-color', true),
  ...allParamModels()
    .filter((param) => param.type === 'color')
    .map((param) => variableInfo(param.variableName)),
];
