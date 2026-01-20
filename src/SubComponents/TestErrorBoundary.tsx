import React from 'react';

type Props = React.PropsWithChildren<{
    // Array of substrings; if an error message includes any, the error will be rethrown.
    rethrowOnMatch?: string[];
}>;

type State = {
    errorMessage?: string | null;
};

class TestErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { errorMessage: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { errorMessage: error?.message ?? null };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log for visibility in test output
        // eslint-disable-next-line no-console
        console.error({ error: error.message, errorInfo });

        const { rethrowOnMatch = ['Duplicate measurement detected'] } = this.props;
        if (process.env.NODE_ENV === 'test' && error.message) {
            for (const substr of rethrowOnMatch) {
                if (error.message.includes(substr)) {
                    // Rethrow so tests that expect throws can observe it
                    throw error;
                }
            }
        }
    }

    render() {
        if (this.state.errorMessage) {
            return <div>Error: {this.state.errorMessage}</div>;
        }
        return this.props.children as React.ReactElement;
    }
}

export default TestErrorBoundary;
