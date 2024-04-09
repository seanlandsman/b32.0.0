import { ChevronRight, TableAlias, WarningAltFilled } from '@carbon/icons-react';
import styled from '@emotion/styled';

import { gridConfigBooleanFields } from '../../model/grid-options';
import { titleCase } from '../../model/utils';
import { Checkbox } from '../general/Checkbox';
import { Tooltip } from '../general/Tooltip';
import { UIDropdownButton } from '../general/UIDropdownButton';
import { useGridConfigAtom } from './grid-config-atom';

export const GridConfigDropdownButton = () => {
    return (
        <UIDropdownButton dropdownContent={<GridConfigDropdown />} endDecorator={<DropdownIcon />}>
            <TableAlias /> Grid options
        </UIDropdownButton>
    );
};

const GridConfigDropdown = () => {
    const [gridConfig, setGridConfig] = useGridConfigAtom();
    const filtersConflict = gridConfig.advancedFilter && gridConfig.filtersToolPanel;

    return (
        <Container>
            {gridConfigBooleanFields.toSorted().map((property) => {
                const showFiltersWarning = filtersConflict && property === 'filtersToolPanel';
                const item = (
                    <Checkbox
                        key={property}
                        checked={!!gridConfig[property]}
                        onChange={() => setGridConfig({ ...gridConfig, [property]: !gridConfig[property] })}
                    >
                        <Label className={showFiltersWarning ? 'has-warning' : undefined}>
                            {titleCase(String(property))}
                        </Label>
                        {showFiltersWarning && <WarningAltFilled color="var(--color-warning-500)" />}
                    </Checkbox>
                );
                return showFiltersWarning ? (
                    <Tooltip
                        key={property}
                        title="Advanced Filter does not work with Filters Tool Panel. Filters Tool Panel has been disabled."
                    >
                        {item}
                    </Tooltip>
                ) : (
                    item
                );
            })}
        </Container>
    );
};

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled('span')`
    &.has-warning {
        opacity: 0.5;
    }
`;

const DropdownIcon = styled(ChevronRight)`
    zoom: 80%;
`;
