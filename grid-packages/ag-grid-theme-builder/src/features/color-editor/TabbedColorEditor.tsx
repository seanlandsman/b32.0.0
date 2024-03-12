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
    <TabbedColorEditorContainer
      defaultIndex={showVarTab && VarColor.parseCss(props.initialValue) ? 1 : 0}
    >
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
    </TabbedColorEditorContainer>
  );
};

const TabbedColorEditorContainer = styled(Tabs)`
  border-radius: 8px;
  overflow: hidden;
  margin: 0;

  .react-tabs {
    -webkit-tap-highlight-color: transparent;
  }

  .react-tabs__tab-list {
    border-bottom: 1px solid var(--color-border-primary);
    margin: 0;
    padding: 16px 16px 0 16px;
  }

  .react-tabs__tab {
    display: inline-block;
    border: 1px solid transparent;
    border-bottom: none;
    bottom: -1px;
    position: relative;
    list-style: none;
    padding: 6px 12px;
    margin: 0;
    cursor: pointer;
  }

  .react-tabs__tab--selected {
    background: #fff;
    border-color: var(--color-border-primary);
    color: black;
    border-radius: 5px 5px 0 0;
  }

  .react-tabs__tab--disabled {
    opacity: 0.5;
  }

  .react-tabs__tab:focus {
    outline: none;
  }

  .react-tabs__tab:focus:after {
    content: '';
    position: absolute;
    height: 5px;
    left: -4px;
    right: -4px;
    bottom: -5px;
    background: #fff;
  }

  .react-tabs__tab-panel {
    display: none;
    padding: 16px;
  }

  .react-tabs__tab-panel--selected {
    display: block;
  }
`;
