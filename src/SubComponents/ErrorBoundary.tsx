import React from 'react';
import styled from 'styled-components';

import { ChartTitle, StyledButton } from '../CentileChart/CentileChart';

type TitleType = {
    fontFamily: string;
    color: string;
    fontSize: number;
    fontWeight: string;
    fontStyle: string;
};

type PropTypes = {
    children: React.ReactNode;
    styles: { [key: string]: any };
};

class ErrorBoundary extends React.Component {
    state: { hasError: boolean; errorMessage: string; showError: boolean };
    props: PropTypes;
    constructor(props: PropTypes) {
        super(props);
        this.state = { hasError: false, errorMessage: '', showError: false };
        this.handleClick = this.handleClick.bind(this);
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error({ error: error.message, errorInfo: errorInfo });
        this.setState({ errorMessage: error.message });
    }

    handleClick() {
        this.setState({ showError: !this.state.showError });
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorContainer height={this.props.styles.chartHeight} width={this.props.styles.chartWidth}>
                    <TextContainer>
                        <ChartTitle {...this.props.styles.chartTitle}>The chart could not be displayed</ChartTitle>
                        <StyledButton
                            {...this.props.styles.toggleStyle}
                            onClick={this.handleClick}
                            margin="20px 20px"
                            enabled
                        >
                            {!this.state.showError ? 'Show Details' : 'Hide Details'}
                        </StyledButton>
                        <ChartTitle show={this.state.showError} {...this.props.styles.chartSubTitle}>
                            {this.state.errorMessage}
                        </ChartTitle>
                    </TextContainer>
                </ErrorContainer>
            );
        } else {
            return this.props.children;
        }
    }
}

const ErrorContainer = styled.div<{ height: number; width: number }>`
    display: block;
    margin: auto;
    height: ${({ height }) => height}px;
    width: ${({ width }) => width}px;
`;

const TextContainer = styled.div`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
`;

export default ErrorBoundary;
