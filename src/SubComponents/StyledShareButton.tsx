import styled from 'styled-components';
import { CommonButton } from './CommonButton';

export const StyledShareButton = styled(CommonButton)<{
    $color?: string,
    size?: number
}>`
flex-grow:0;
background-color: ${(props) => (props.$color ? props.$color : 'black')};
height: 48px;
width: 48px;
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
`