import styled from 'styled-components';

export const VersionLabel = styled.p<{
    fontFamily: string;
}>`
    font-family: ${({ fontFamily }) => fontFamily};
    font-size: 8px;
    font-weight: 200;
    font-style: italic;
    padding: 0px;
    color: '#A9A9A';
`;
