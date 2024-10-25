import * as React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const Svg = styled(Icon)`
    width: 25px;
    height: 25px;
    flex-grow: 0;
`;

export const CloseFullScreenIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="white">
        <path d="M14 14h5v2h-3v3h-2v-5m-9 0h5v5H8v-3H5v-2m3-9h2v5H5V8h3V5m11 3v2h-5V5h2v3h3Z" />
    </Svg>
);
