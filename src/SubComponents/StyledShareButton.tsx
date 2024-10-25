import styled from 'styled-components';
import { CommonButton } from './CommonButton';

interface StyledShareButtonProps {
    $color?: string;
    $size?: number;
}

export const StyledShareButton = styled(CommonButton).attrs<StyledShareButtonProps>(({ $color, $size }) => ({
    style: {
        backgroundColor: $color || 'black',
        height: $size ? `${$size}px` : '48px',
        width: $size ? `${$size}px` : '48px',
    },
}))<StyledShareButtonProps>`
    flex-grow: 0;
    color: white;
    padding: 1rem;
    border: none;
    cursor: pointer;
    border: 5px solid white;
    border-radius: 50%;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        filter: brightness(85%);
    }
    &:active {
        background-color: brightness(115%);
    }
`;
