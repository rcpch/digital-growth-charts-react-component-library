import styled from 'styled-components';
import { AgeRadioButtonGroup } from './AgeRadioButtonGroup';

export const StyledRadioButtonGroup = styled(AgeRadioButtonGroup)<{
    activeColour: string;
    inactiveColour: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    fontStyle: string;
    color: string;
    className: string;
}>`
    align-self: center;
    label {
        display: inline-block;
        padding: 5px 11px;
        font-family: ${({ fontFamily }) => fontFamily};
        font-size: ${({ fontSize }) => fontSize}px;
        font-weight: ${({ fontWeight }) => fontWeight};
        font-style: ${({ fontStyle }) => fontStyle};
        color: ${({ color }) => color};
        cursor: pointer;
        background-color: ${(props) => props.inactiveColour};
        min-height: 30px;
    }
    input[type='radio']:checked + label {
        color: ${({ color }) => color};
        background-color: ${(props) => props.activeColour};
    }
    input[type='radio'] {
        display: none;
    }
`;