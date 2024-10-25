import styled from 'styled-components';

export const ChartTitle = styled.h2<{
    fontFamily: string;
    color: string;
    fontSize: number;
    fontWeight: string;
    fontStyle: string;
    show?: boolean;
}>`
    font-family: ${({ fontFamily }) => fontFamily};
    font-size: ${({ fontSize }) => fontSize}px;
    font-weight: ${({ fontWeight }) => fontWeight};
    font-style: ${({ fontStyle }) => fontStyle};
    line-height: 1.3em;
    padding: 0px;
    margin: 5px;
    color: ${({ color }) => color};
    visibility: ${({ show }) => (show === false ? 'hidden' : 'visible')};
`;
