import styled from 'styled-components';

export const ResetZoomContainer = styled.div<{
    $isHidden: boolean;
}>
`
visibility: ${(props) => (props.$isHidden ? 'hidden' : 'visible' )}
`