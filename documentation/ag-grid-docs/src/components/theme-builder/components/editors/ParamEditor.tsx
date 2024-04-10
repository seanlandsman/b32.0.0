import { ParamModel, useParamAtom } from '@components/theme-builder/model/ParamModel';
import { useRenderedTheme } from '@components/theme-builder/model/rendered-theme';
import styled from '@emotion/styled';

export type ParamEditorProps = {
    param: string;
    label?: string;
};

export const ParamEditor = (props: ParamEditorProps) => {
    const param = ParamModel.for(props.param);
    const [value, setValue] = useParamAtom(param);

    const theme = useRenderedTheme();
    const editorValue = value != null ? value : theme.paramDefaults[param.property];

    if (editorValue == null) return null;

    return (
        <Wrapper>
            <Label>{props.label || param.label}</Label>
            <Input type="text" value={editorValue} onChange={(e) => setValue(e.target.value)} />
        </Wrapper>
    );
};

const Wrapper = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Label = styled('span')`
    color: var(--color-fg-quinary);
    font-size: 14px;
    font-weight: 500;
`;


const Input = styled('input')`
    width: 100%;
`;
