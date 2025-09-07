import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

// Adjust mock paths to match the real location of these components.
// Assuming ErrorBoundary lives at: src/RCPCHChart/SubComponents/ErrorBoundary.tsx
// which imports: './ChartTitle' and './StyledErrorButton'
jest.mock('../../SubComponents/ChartTitle', () => ({
    ChartTitle: (props: any) => {
        const { fontFamily, color, fontSize, fontWeight, fontStyle, children } = props;
        return (
            <div
                data-testid={props['data-testid'] || 'chart-title'}
                style={{
                    fontFamily,
                    color,
                    fontSize: fontSize ? `${fontSize}px` : undefined,
                    fontWeight,
                    fontStyle,
                }}
            >
                {children}
            </div>
        );
    },
}));

jest.mock('../../SubComponents/StyledErrorButton', () => ({
    StyledErrorButton: (props: any) => {
        const { fontFamily, color, fontSize, fontWeight, fontStyle, backgroundColor, children, onClick } = props;
        return (
            <button
                data-testid="error-toggle-button"
                style={{
                    fontFamily,
                    color,
                    fontSize: fontSize ? `${fontSize}px` : undefined,
                    fontWeight,
                    fontStyle,
                    backgroundColor,
                }}
                onClick={onClick}
            >
                {children}
            </button>
        );
    },
}));

import ErrorBoundary from '../../SubComponents/ErrorBoundary';

// Component that always throws
const ThrowingChild: React.FC = () => {
    throw new Error('Boom test error');
};

describe('ErrorBoundary custom error styles', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeAll(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });

    test('applies custom error styles and reveals subtitle on toggle', () => {
        const styles = {
            chartHeight: 500,
            chartWidth: 700,
            errorTitle: {
                fontFamily: 'Arial',
                color: '#aa0000',
                fontSize: 26,
                fontWeight: '800',
                fontStyle: 'italic',
            },
            errorSubtitle: {
                fontFamily: 'Courier New',
                color: '#005500',
                fontSize: 16,
                fontWeight: '400',
                fontStyle: 'normal',
            },
            errorToggleButtonStyle: {
                fontFamily: 'Verdana',
                color: '#ffffff',
                fontSize: 14,
                fontWeight: '600',
                fontStyle: 'normal',
                backgroundColor: '#333399',
            },
        };

        render(
            <ErrorBoundary styles={styles} chartType="centile-height">
                <ThrowingChild />
            </ErrorBoundary>,
        );

        const title = screen.getByText('The chart could not be displayed');
        expect(title).toHaveStyle({
            fontFamily: 'Arial',
            color: '#aa0000',
            fontSize: '26px',
            fontWeight: '800',
            fontStyle: 'italic',
        });

        const toggleBtn = screen.getByTestId('error-toggle-button');
        expect(toggleBtn).toHaveTextContent('Show Details');
        expect(toggleBtn).toHaveStyle({
            fontFamily: 'Verdana',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '600',
            fontStyle: 'normal',
            backgroundColor: '#333399',
        });

        expect(screen.queryByText('Boom test error')).not.toBeInTheDocument();

        fireEvent.click(toggleBtn);
        expect(toggleBtn).toHaveTextContent('Hide Details');

        const subtitle = screen.getByText('Boom test error');
        expect(subtitle).toHaveStyle({
            fontFamily: 'Courier New',
            color: '#005500',
            fontSize: '16px',
            fontWeight: '400',
            fontStyle: 'normal',
        });
    });

    test('works with partial error styles (only errorTitle)', () => {
        const styles = {
            chartHeight: 400,
            chartWidth: 600,
            errorTitle: {
                fontFamily: 'Times',
                color: '#123456',
                fontSize: 20,
            },
        };

        render(
            <ErrorBoundary styles={styles} chartType="sds">
                <ThrowingChild />
            </ErrorBoundary>,
        );

        const title = screen.getByText('The chart could not be displayed');
        expect(title).toHaveStyle({
            fontFamily: 'Times',
            color: '#123456',
            fontSize: '20px',
        });

        const toggleBtn = screen.getByTestId('error-toggle-button');
        fireEvent.click(toggleBtn);
        const subtitle = screen.getByText('Boom test error');
        expect(subtitle).toBeInTheDocument();
    });
});
