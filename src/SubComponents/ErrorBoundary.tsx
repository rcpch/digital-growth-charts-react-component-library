import React from 'react';
import styled from 'styled-components';

type PropTypes = {
    children: React.ReactNode;
    height: number;
    width: number;
};

class ErrorBoundary extends React.Component {
    state: { hasError: boolean };
    props: PropTypes;
    constructor(props: PropTypes) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log({ error: error.message, errorInfo: errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorContainer height={this.props.height} width={this.props.width}>
                    <TextContainer>
                        <h2>Woops! The chart encountered an error</h2>
                        <p>Please refresh the screen</p>
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
