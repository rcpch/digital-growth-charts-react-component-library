import styled from 'styled-components';
import { AgeRadioButtonGroup } from './AgeRadioButtonGroup';

export const StyledRadioButtonGroup = styled(AgeRadioButtonGroup)<{
    $activeColour: string;
    $inactiveColour: string;
    $fontFamily: string;
    $fontSize: number;
    $fontWeight: string;
    $fontStyle: string;
    $color: string;
    $className: string;
}>`
    align-self: center;
    label {
        padding: 5px 11px 5px 11px;
        font-family: ${({ $fontFamily }) => $fontFamily};
        font-size: ${({ $fontSize }) => $fontSize}px;
        font-weight: ${({ $fontWeight }) => $fontWeight};
        font-style: ${({ $fontStyle }) => $fontStyle};
        color: ${({ $color }) => $color};
        cursor: pointer;
        background-color: ${({ $inactiveColour }) => $inactiveColour};
        min-height: 30px;
        min-width: max-content;
    }
    input[type='radio']:checked + label {
        color: ${({ $color }) => $color};
        background-color: ${({ $activeColour }) => $activeColour};
    }
    input[type='radio'] {
        display: none;
    }
`;
