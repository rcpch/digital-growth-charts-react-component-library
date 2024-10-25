import styled from 'styled-components';

export const StyledButtonTooltip = styled.div<{
    $backgroundColor?: string;
    $color?: string;
    $fontSize?: number;
    $fontFamily?: string;
    $fontWeight?: string;
    $fontStyle?: string;
    $borderRadius?: string;
}>`
    position: relative;

    .tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        background-color: ${(props) => props.$backgroundColor};
        color: ${(props) => props.$color};
        padding: 5px;
        border-radius: ${(props) => props.$borderRadius}px;
        font-size: ${(props) => props.$fontSize}px;
        font-weight: ${(props) => props.$fontWeight};
        font-style: ${(props) => props.$fontStyle};
        font-family: ${(props) => props.$fontFamily};
    }

    &:hover .tooltip {
        display: block;
    }
`;
