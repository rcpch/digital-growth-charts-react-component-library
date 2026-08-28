import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import ProvenanceWarningBanner from './ProvenanceWarningBanner';
import type { ProvenanceIssue } from '../functions/filterMeasurementsByProvenance';

const issues: ProvenanceIssue[] = [
    {
        method: 'height',
        index: 0,
        status: 'legacy',
        expectedReference: 'uk-who',
    },
    {
        method: 'weight',
        index: 1,
        status: 'unknown',
        expectedReference: 'uk-who',
        receivedReference: 'future-reference',
    },
    {
        method: 'bmi',
        index: 2,
        status: 'mismatch',
        expectedReference: 'uk-who',
        receivedReference: 'cdc',
    },
];

describe('ProvenanceWarningBanner', () => {
    const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

    afterEach(() => {
        jest.useRealTimers();
        if (originalClipboard) {
            Object.defineProperty(navigator, 'clipboard', originalClipboard);
        } else {
            Reflect.deleteProperty(navigator, 'clipboard');
        }
    });

    it('prioritises hidden mismatches and includes every issue in its technical details', () => {
        const banner = render(<ProvenanceWarningBanner issues={issues} componentVersion="7.5.2" />);

        expect(banner.getByTestId('provenance-warning-banner')).toHaveTextContent(/1 measurement.*has been hidden/i);

        fireEvent.click(banner.getByTestId('provenance-warning-toggle'));

        const details = banner.getByTestId('provenance-warning-details');
        expect(details).toHaveTextContent('Component version: 7.5.2');
        expect(details).toHaveTextContent('height[0] Error code: PROVENANCE_LEGACY');
        expect(details).toHaveTextContent('weight[1] Error code: PROVENANCE_UNKNOWN');
        expect(details).toHaveTextContent('bmi[2] Error code: PROVENANCE_MISMATCH');
        expect(details).toHaveTextContent('expected "uk-who", received "future-reference"');
        expect(details).toHaveTextContent('expected "uk-who", received "cdc"');
    });

    it('copies the exact technical details and resets its success state', async () => {
        jest.useFakeTimers();
        const writeText = jest.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
        const banner = render(<ProvenanceWarningBanner issues={issues} componentVersion="7.5.2" />);

        fireEvent.click(banner.getByTestId('provenance-warning-toggle'));
        const details = banner.getByTestId('provenance-warning-details').textContent;

        await act(async () => {
            fireEvent.click(banner.getByTestId('provenance-warning-copy'));
        });

        expect(writeText).toHaveBeenCalledWith(details);
        expect(banner.getByTestId('provenance-warning-copy')).toHaveTextContent('Copied');

        act(() => jest.advanceTimersByTime(2000));
        expect(banner.getByTestId('provenance-warning-copy')).toHaveTextContent('Copy technical details');
    });

    it('leaves details available when clipboard access is rejected', async () => {
        const writeText = jest.fn().mockRejectedValue(new Error('permission denied'));
        Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
        const banner = render(<ProvenanceWarningBanner issues={issues} />);

        fireEvent.click(banner.getByTestId('provenance-warning-toggle'));
        fireEvent.click(banner.getByTestId('provenance-warning-copy'));

        await waitFor(() => expect(writeText).toHaveBeenCalled());
        expect(banner.getByTestId('provenance-warning-details')).toBeInTheDocument();
        expect(banner.getByTestId('provenance-warning-copy')).toHaveTextContent('Copy technical details');
    });
});
