import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

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

    test('applies all custom error styles (title, subtitle, toggle button) and preserves them after toggle', () => {
        // Simulate theme->ErrorBoundary style mapping (new error* style keys)
        const customThemeChartStyle = {
            errorTitleStyle: {
                fontFamily: 'Arial',
                colour: '#aa0000',
                size: 26,
                weight: 800,
                style: 'italic',
            },
            errorSubtitleStyle: {
                fontFamily: 'Courier New',
                colour: '#005500',
                size: 16,
                weight: 400,
                style: 'normal',
            },
            errorToggleButtonTextStyle: {
                fontFamily: 'Verdana',
                colour: '#ffffff',
                size: 14,
                weight: 600,
                style: 'normal',
            },
            errorToggleButtonActiveColour: '#333399',
            errorToggleButtonInactiveColour: '#999999',
            errorToggleButtonSize: 14,
        };

        // What the real component would pass down to ErrorBoundary (flattened / transformed)
        const styles = {
            chartHeight: 500,
            chartWidth: 700,
            errorTitle: {
                fontFamily: customThemeChartStyle.errorTitleStyle.fontFamily,
                color: customThemeChartStyle.errorTitleStyle.colour,
                fontSize: customThemeChartStyle.errorTitleStyle.size,
                fontWeight: String(customThemeChartStyle.errorTitleStyle.weight),
                fontStyle: customThemeChartStyle.errorTitleStyle.style,
            },
            errorSubtitle: {
                fontFamily: customThemeChartStyle.errorSubtitleStyle.fontFamily,
                color: customThemeChartStyle.errorSubtitleStyle.colour,
                fontSize: customThemeChartStyle.errorSubtitleStyle.size,
                fontWeight: String(customThemeChartStyle.errorSubtitleStyle.weight),
                fontStyle: customThemeChartStyle.errorSubtitleStyle.style,
            },
            errorToggleButtonStyle: {
                fontFamily: customThemeChartStyle.errorToggleButtonTextStyle.fontFamily,
                color: customThemeChartStyle.errorToggleButtonTextStyle.colour,
                fontSize: customThemeChartStyle.errorToggleButtonTextStyle.size,
                fontWeight: String(customThemeChartStyle.errorToggleButtonTextStyle.weight),
                fontStyle: customThemeChartStyle.errorToggleButtonTextStyle.style,
                backgroundColor: customThemeChartStyle.errorToggleButtonActiveColour,
            },
        };

        render(
            <ErrorBoundary styles={styles} chartType="centile-height">
                <ThrowingChild />
            </ErrorBoundary>,
        );

        // Title styles
        const title = screen.getByText('The chart could not be displayed');
        expect(title).toHaveStyle({
            fontFamily: 'Arial',
            color: '#aa0000',
            fontSize: '26px',
            fontWeight: '800',
            fontStyle: 'italic',
        });

        // Toggle button initial styles
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

        // Subtitle not yet visible
        expect(screen.queryByText('Boom test error')).not.toBeInTheDocument();

        // Toggle to show details
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

        // Ensure button styling unchanged after click
        expect(toggleBtn).toHaveStyle({
            backgroundColor: '#333399',
            fontFamily: 'Verdana',
        });
    });

    test('gracefully handles partial custom styles (only errorTitleStyle supplied)', () => {
        const styles = {
            chartHeight: 400,
            chartWidth: 600,
            errorTitle: {
                fontFamily: 'Times',
                color: '#123456',
                fontSize: 20,
            },
            // No errorSubtitle / errorToggleButtonStyle
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
