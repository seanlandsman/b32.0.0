import { ChevronRight, TableAlias, WarningAltFilled } from '@carbon/icons-react';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { UIDropdownButton } from '../../components/UIDropdownButton';
import { gridConfigBooleanFields } from '../../model/grid-options';
import { gridConfigAtom } from './grid-config-atom';

export const GridConfigDropdownButton = () => {
  return (
    <UIDropdownButton dropdownContent={<GridConfigDropdown />} endDecorator={<DropdownIcon />}>
      <TableAlias /> Grid options
    </UIDropdownButton>
  );
};

const GridConfigDropdown = () => {
  const [gridConfig, setGridConfig] = useAtom(gridConfigAtom);
  const filtersConflict = gridConfig.advancedFilter && gridConfig.filtersToolPanel;

  return (
    <Container>
      {gridConfigBooleanFields.toSorted().map((property) => {
        const showFiltersWarning = filtersConflict && property === 'filtersToolPanel';
        const item = (
          <Item key={property}>
            <input
              type="checkbox"
              checked={!!gridConfig[property]}
              onChange={() => setGridConfig({ ...gridConfig, [property]: !gridConfig[property] })}
              // TODO component with label and disabled
              // label={titleCase(String(property))}
              // sx={{
              //   opacity: showFiltersWarning ? 0.5 : undefined,
              // }}
            />
            {showFiltersWarning && <WarningAltFilled color="var(--joy-palette-warning-400)" />}
          </Item>
        );
        return item;
        // TODO Tooltip component
        // return showFiltersWarning ? (
        //   <Tooltip
        //     key={property}
        //     title="Advanced Filter does not work with Filters Tool Panel. Filters Tool Panel has been disabled."
        //   >
        //     {item}
        //   </Tooltip>
        // ) : (
        //   item
        // );
      })}
    </Container>
  );
};

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Item = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DropdownIcon = styled(ChevronRight)`
  zoom: 80%;
`;
