import styled from 'styled-components';

interface ResetZoomContainerProps {
    $isHidden: boolean;
}

export const ResetZoomContainer = styled.div<ResetZoomContainerProps>`
    visibility: ${({ $isHidden }) => ($isHidden ? 'hidden' : 'visible')};
`;
