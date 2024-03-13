import { Select } from '../../components/Select';
import { Cell } from '../../components/layout';
import { FeatureModel, useSelectedVariant } from '../../model/FeatureModel';

export type VariantSelectorProps = {
  feature: FeatureModel;
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
