import styled from 'styled-components';

export const LegendToggleButton = styled.button<{
    $backgroundColor?: string;
    $borderColor?: string;
    $iconColor?: string;
    $hoverBackgroundColor?: string;
    $hoverBorderColor?: string;
    $top?: string;
    $right?: string;
    $left?: string;
    $bottom?: string;
    $size?: number;
}>`
    position: absolute;
    top: ${({ $top }) => $top || '110px'};
    right: ${({ $right }) => $right || '275px'};
    left: ${({ $left }) => $left};
    bottom: ${({ $bottom }) => $bottom};
    width: ${({ $size }) => ($size ? `${$size}px` : '28px')};
    height: ${({ $size }) => ($size ? `${$size}px` : '28px')};
    border-radius: 50%;
    border: 2px solid ${({ $borderColor }) => $borderColor || '#ccc'};
    background-color: ${({ $backgroundColor }) => $backgroundColor || 'white'};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ $hoverBackgroundColor, $backgroundColor }) =>
            $hoverBackgroundColor || ($backgroundColor ? `${$backgroundColor}dd` : '#f5f5f5')};
        border-color: ${({ $hoverBorderColor, $borderColor }) =>
            $hoverBorderColor || ($borderColor ? `${$borderColor}99` : '#999')};
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }

    svg {
        width: ${({ $size }) => ($size ? `${$size * 0.7}px` : '20px')};
        height: ${({ $size }) => ($size ? `${$size * 0.7}px` : '20px')};
        color: ${({ $iconColor }) => $iconColor || '#666'};
    }
`;
