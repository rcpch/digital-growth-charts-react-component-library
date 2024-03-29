import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import Icon from './Icon'

const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(.25);
    opacity: 0;
  }
`;

const Svg = styled(Icon)` 
  width: 16px; 
  height: 16px;
  animation: ${fadeOut} .25s linear forwards, ${fadeIn} .25s linear forwards;
`;


export const HideCentileLabelIcon = ()=>(
    <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"  viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
      {/* <path d="M27.5,70h-15c-1.4,0-2.5,1.1-2.5,2.5v15c0,1.4,1.1,2.5,2.5,2.5h15c1.4,0,2.5-1.1,2.5-2.5v-15C30,71.1,28.9,70,27.5,70z M25,85H15V75h10V85z" stroke="none"></path><path d="M27.5,40h-15c-1.4,0-2.5,1.1-2.5,2.5v15c0,1.4,1.1,2.5,2.5,2.5h15c1.4,0,2.5-1.1,2.5-2.5v-15C30,41.1,28.9,40,27.5,40z M25,55H15V45h10V55z" stroke="none"></path><path d="M27.5,10h-15c-1.4,0-2.5,1.1-2.5,2.5v15c0,1.4,1.1,2.5,2.5,2.5h15c1.4,0,2.5-1.1,2.5-2.5v-15C30,11.1,28.9,10,27.5,10z M25,25H15V15h10V25z" stroke="none"></path><path d="M57.5,22.5h-20c-1.4,0-2.5-1.1-2.5-2.5v0c0-1.4,1.1-2.5,2.5-2.5h20c1.4,0,2.5,1.1,2.5,2.5v0C60,21.4,58.9,22.5,57.5,22.5z" stroke="none"></path><path d="M57.5,52.5h-20c-1.4,0-2.5-1.1-2.5-2.5v0c0-1.4,1.1-2.5,2.5-2.5h20c1.4,0,2.5,1.1,2.5,2.5v0C60,51.4,58.9,52.5,57.5,52.5z" stroke="none"></path><path d="M57.5,82.5h-20c-1.4,0-2.5-1.1-2.5-2.5l0,0c0-1.4,1.1-2.5,2.5-2.5h20c1.4,0,2.5,1.1,2.5,2.5l0,0 C60,81.4,58.9,82.5,57.5,82.5z" stroke="none"></path><path d="M87.5,22.5h-20c-1.4,0-2.5-1.1-2.5-2.5v0c0-1.4,1.1-2.5,2.5-2.5h20c1.4,0,2.5,1.1,2.5,2.5v0C90,21.4,88.9,22.5,87.5,22.5z" stroke="none"></path><path d="M87.5,52.5h-20c-1.4,0-2.5-1.1-2.5-2.5v0c0-1.4,1.1-2.5,2.5-2.5h20c1.4,0,2.5,1.1,2.5,2.5v0C90,51.4,88.9,52.5,87.5,52.5z" stroke="none"></path><path d="M87.5,82.5h-20c-1.4,0-2.5-1.1-2.5-2.5l0,0c0-1.4,1.1-2.5,2.5-2.5h20c1.4,0,2.5,1.1,2.5,2.5l0,0 C90,81.4,88.9,82.5,87.5,82.5z" stroke="none"></path> */}
<g>

 <line stroke="#FFFFFF" strokeWidth="80"  id="svg_4" y2="-54.14289" x2="609.71431" y1="652.85719" x1="-126.28573" fill="none"/>
 <line stroke="#FFFFFF" strokeWidth="80"  id="svg_8" y2="115.2857" x2="948.2857" y1="866.28579" x1="187.28571" fill="none"/>
 <line transform="rotate(-1.19233 398 403)" stroke="#FFFFFF" strokeDasharray="5,5" strokeWidth="80"  id="svg_9" y2="13.59075" x2="805.7743" y1="792.40929" x1="-9.77433" fill="none"/>
 <line stroke="#FFFFFF" strokeDasharray="5,5" strokeWidth="80"  id="svg_10" y2="-250.71431" x2="536.00001" y1="413.57146" x1="-134.42859" fill="none"/>
 <line stroke="#FFFFFF" strokeDasharray="5,5" strokeWidth="80"  id="svg_12" y2="257.99999" x2="1059.99999" y1="901.57152" x1="410.99996" fill="none"/>
 <text transform="rotate(-44.96051788330078 389.7053680419922,410.42857360839844)" fontStyle="normal" fontWeight="bold" textAnchor="start" fontFamily="'Montserrat'" fontSize="100" id="svg_13" y="446.14286" x="326" strokeDasharray="5,5" strokeWidth="0" stroke="#FFFFFF" fill="#FFFFFF">50</text>
 <text transform="rotate(-43.8873 525.538 532.714)" fontStyle="normal" fontWeight="bold" textAnchor="start" fontFamily="'Montserrat'" fontSize="100" id="svg_14" y="568.42857" x="466.28572" strokeDasharray="5,5" strokeWidth="0" stroke="#FFFFFF" fill="#FFFFFF">25</text>
 <text transform="rotate(-45.0115 255.911 282.143)" fontStyle="normal" fontWeight="bold" textAnchor="start" fontFamily="'Montserrat'" fontSize="100" id="svg_15" y="317.85714" x="196" strokeDasharray="5,5" strokeWidth="0" stroke="#FFFFFF" fill="#FFFFFF">75</text>
 <text transform="rotate(-45.5837 133.875 142.857)" fontStyle="normal" fontWeight="bold" textAnchor="start" fontFamily="'Montserrat'" fontSize="100" id="svg_16" y="178.57143" x="82.71428" strokeDasharray="5,5" strokeWidth="0" stroke="#FFFFFF" fill="#FFFFFF">91</text>
 <text transform="rotate(-43.8873 666.71 649.857)" fontStyle="normal" fontWeight="bold" textAnchor="start" fontFamily="'Montserrat'" fontSize="100" id="svg_18" y="685.57143" x="634.85714" strokeDasharray="5,5" strokeWidth="0" stroke="#FFFFFF" fill="#FFFFFF">9</text>
</g>
</Svg>
)