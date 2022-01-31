import styled from 'styled-components';
import { keyframes, css } from 'styled-components';

export const CopiedLabel = styled.h6<{
    active: boolean;
}>
`
text-align: center;
opacity: 0;
visibility: ${props => props.active ? `visible` : `hidden`};
animation: ${
    props => (props.active ?
        css`
        ${fadeInAnimation}
        fadeIn 5s;
        -webkit-animation: fadeIn 3s;
        -moz-animation: fadeIn 3s;
        -o-animation: fadeIn 3s;
        -ms-animation: fadeIn 3s;
        ${fadeOutAnimation}
        fadeOut 5s;
        -webkit-animation: fadeOut 5s;
        -moz-animation: fadeOut 5s;
        -o-animation: fadeOut 5s;
        -ms-animation: fadeOut 5s;
        `  :
        "none")
};

`

const fadeOutAnimation = keyframes `
  @keyframes fadeOut {
    100% {opacity:1;}
    0% {opacity:0;}
  }
  
  @-moz-keyframes fadeOut {
    100% {opacity:1;}
    0% {opacity:0;}
  }
  
  @-webkit-keyframes fadeOut {
    100% {opacity:1;}
    0% {opacity:0;}
  }
  
  @-o-keyframes fadeIn fadeOut {
    100% {opacity:1;}
    0% {opacity:0;}
  }
  
  @-ms-keyframes fadeIn fadeOut {
    100% {opacity:1;}
    0% {opacity:0;}
  }
`

const fadeInAnimation = keyframes `
  @keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }
  
  @-moz-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }
  
  @-webkit-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }
  
  @-o-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }
  
  @-ms-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }
`