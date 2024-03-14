import { Select } from '../../components/Select';
import { Cell } from '../../components/layout';
import { PartModel, useSelectedVariant } from '../../model/PartModel';

export type VariantSelectorProps = {
  part: PartModel;
};

export const VariantSelector = ({ part }: VariantSelectorProps) => {
  const [variant, setVariant] = useSelectedVariant(part);
  return (
    <>
      <Cell>{part.label}</Cell>
      <Select options={part.variants} value={variant} onChange={setVariant} />
    </>
  );
};
