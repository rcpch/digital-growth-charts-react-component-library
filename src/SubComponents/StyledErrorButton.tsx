import styled from 'styled-components';
import { CommonButton } from './CommonButton';

export const StyledErrorButton = styled(CommonButton)<{
    $activeColour: string;
    $inactiveColour: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    fontStyle: string;
    color: string;
    $enabled: boolean;
    $margin?: string;
}>`
    align-self: flex-end;
    background-color: ${({ $inactiveColour, $activeColour, $enabled }) => ($enabled ? $activeColour : $inactiveColour)};
    border: 2px solid ${({ $enabled, $activeColour, $inactiveColour }) => ($enabled ? $activeColour : $inactiveColour)};
    font-family: Arial;
    font-size: 14px;
    min-height: 30px;
    font-family: ${({ fontFamily }) => fontFamily};
    font-size: ${({ fontSize }) => fontSize}px;
    font-weight: ${({ fontWeight }) => fontWeight};
    font-style: ${({ fontStyle }) => fontStyle};
    color: ${({ color }) => color};
    &:hover {
        background-color: ${({ $enabled, $activeColour, $inactiveColour }) =>
            $enabled ? $activeColour : $inactiveColour};
        color: ${({ color }) => color};
        border: 2px solid
            ${({ $enabled, $inactiveColour, $activeColour }) => ($enabled ? $activeColour : $inactiveColour)};
        outline: ${({ $enabled, $activeColour }) => ($enabled ? $activeColour : 'transparent')} solid 2px;
    }
    &:focus {
        outline: ${(props) => (props.$enabled ? props.$activeColour : 'transparent')} solid 2px;
    }
`;
