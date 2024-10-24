import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import Icon from './Icon';

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
    animation:
        ${fadeOut} 0.25s linear forwards,
        ${fadeIn} 0.25s linear forwards;
`;

export const ShowCentileLabelIcon = () => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="white"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid meet"
    >
        <g>
            <line
                strokeDasharray="5,5"
                stroke="#FFFFFF"
                strokeWidth="80"
                id="svg_4"
                y2="-54.14289"
                x2="609.71431"
                y1="652.85719"
                x1="-126.28573"
                fill="none"
            />
            <line
                strokeDasharray="5,5"
                stroke="#FFFFFF"
                strokeWidth="80"
                id="svg_8"
                y2="115.2857"
                x2="948.2857"
                y1="866.28579"
                x1="187.28571"
                fill="none"
            />
            <line
                transform="rotate(-1.19233 398 403)"
                stroke="#FFFFFF"
                strokeDasharray="5,5"
                strokeWidth="80"
                id="svg_9"
                y2="13.59075"
                x2="805.7743"
                y1="792.40929"
                x1="-9.77433"
                fill="none"
            />
            <line
                stroke="#FFFFFF"
                strokeDasharray="5,5"
                strokeWidth="80"
                id="svg_10"
                y2="-250.71431"
                x2="536.00001"
                y1="413.57146"
                x1="-134.42859"
                fill="none"
            />
            <line
                stroke="#FFFFFF"
                strokeDasharray="5,5"
                strokeWidth="80"
                id="svg_12"
                y2="257.99999"
                x2="1059.99999"
                y1="901.57152"
                x1="410.99996"
                fill="none"
            />
            <text
                stroke="#FFFFFF"
                transform="matrix(2.51622 -0.0989381 0.0878684 2.83322 -326.245 -645.991)"
                fontStyle="normal"
                fontWeight="normal"
                textAnchor="start"
                fontFamily="'Montserrat'"
                fontSize="250"
                id="svg_13"
                y="483.01008"
                x="109.12356"
                strokeDasharray="5,5"
                strokeWidth="0"
                fill="#FFFFFF"
            >
                50
            </text>
            <text
                fontWeight="bold"
                stroke="#FFFFFF"
                transform="rotate(-0.683087 707.903 149.098) matrix(0.703744 0 0 0.828962 262.805 -68.9499)"
                textAnchor="start"
                fontFamily="'Montserrat'"
                fontSize="250"
                id="svg_19"
                y="352.21799"
                x="491.71875"
                strokeDasharray="5,5"
                strokeWidth="0"
                fill="#FFFFFF"
            >
                th
            </text>
        </g>
    </Svg>
);
