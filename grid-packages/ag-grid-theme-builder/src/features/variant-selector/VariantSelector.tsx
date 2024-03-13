import { Select } from '../../components/Select';
import { Cell } from '../../components/layout';
import { PartModel, useSelectedVariant } from '../../model/PartModel';

export type VariantSelectorProps = {
  feature: PartModel;
};

export const VariantSelector = ({ feature }: VariantSelectorProps) => {
  const [variant, setVariant] = useSelectedVariant(feature);
  return (
    <>
      <Cell>{feature.label}</Cell>
      <Select options={feature.variants} value={variant} onChange={setVariant} />
    </>
  );
};
