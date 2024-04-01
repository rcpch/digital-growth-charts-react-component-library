import styled from 'styled-components';

export const StyledButtonTooltip = styled.div`
    position: relative;

    .tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        background-color: #333;
        color: #fff;
        padding: 5px;
        border-radius: 4px;
        font-size: 14px;
        font-family: 'Montserrat', Helvetica, Arial, sans-serif;
      }
    
      &:hover .tooltip {
        display: block;
      }
`;