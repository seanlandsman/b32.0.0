import { Select } from '../../components/Select';
import { Tooltip } from '../../components/Tooltip';
import { Cell } from '../../components/layout';
import { PartModel, useSelectedVariant } from '../../model/PartModel';

export type VariantSelectorProps = {
  part: PartModel;
};

export const VariantSelector = ({ part }: VariantSelectorProps) => {
  const [variant, setVariant] = useSelectedVariant(part);
  return (
    <>
      <Cell>
        <Tooltip title={part.docs}>
          <span>{part.label}:</span>
        </Tooltip>
      </Cell>
      <Select
        options={part.variants.filter((v) => v.variantId !== 'base')}
        value={variant}
        onChange={setVariant}
      />
    </>
  );
};
