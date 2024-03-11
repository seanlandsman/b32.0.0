import { Eyedropper, Percentage, SettingsAdjust } from '@carbon/icons-react';
import styled from '@emotion/styled';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { EyedropperColorEditor } from './EyedropperColorEditor';
import { InputColorEditor } from './InputColorEditor';
import { VarColor } from './VarColor';
import { VarColorEditor } from './VarColorEditor';
import { UncontrolledColorEditorProps } from './color-editor-utils';

export const TabbedColorEditor = (props: UncontrolledColorEditorProps) => {
  const showVarTab = !props.preventTransparency && !props.preventVariables;

  return (
    <Container defaultIndex={showVarTab && VarColor.parseCss(props.initialValue) ? 1 : 0}>
      <TabList>
        <Tab value="input">
          <SettingsAdjust />
        </Tab>
        {showVarTab && (
          <Tab value="var">
            <Percentage />
          </Tab>
        )}
        <Tab value="eyedropper">
          <Eyedropper />
        </Tab>
      </TabList>
      <TabPanel value="input">
        <InputColorEditor {...props} />
      </TabPanel>
      {showVarTab && (
        <TabPanel value="var">
          <VarColorEditor {...props} />
        </TabPanel>
      )}
      <TabPanel value="eyedropper">
        <EyedropperColorEditor {...props} />
      </TabPanel>
    </Container>
  );
};

const Container = styled(Tabs)`
  width: 300px;
  border-radius: 8px;
  overflow: hidden;
`;
