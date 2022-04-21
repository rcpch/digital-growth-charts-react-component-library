import React from 'react';
import styled from 'styled-components';
import Icon from './Icon'

const Svg = styled(Icon)` 
  width: 25px; 
  height: 25px;
`;

export const FullScreenIcon = ()=>(
    <Svg xmlns="http://www.w3.org/2000/svg" fill="white" width={25} height={25}>
     <path d="M5 5h5v2H7v3H5V5m9 0h5v5h-2V7h-3V5m3 9h2v5h-5v-2h3v-3m-7 3v2H5v-5h2v3h3Z"/>
    </Svg>
)