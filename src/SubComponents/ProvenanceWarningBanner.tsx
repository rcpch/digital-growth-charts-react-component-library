import * as React from 'react';
import { styled } from 'styled-components';

import { ProvenanceIssue } from '../functions/filterMeasurementsByProvenance';

interface Props {
    issues: ProvenanceIssue[];
    componentVersion?: string;
}

function summaryText(issues: ProvenanceIssue[]): string {
    const mismatchCount = issues.filter((i) => i.status === 'mismatch').length;
    const hasUnknown = issues.some((i) => i.status === 'unknown');
    const hasLegacy = issues.some((i) => i.status === 'legacy');

    if (mismatchCount > 0) {
        return `${mismatchCount} measurement${mismatchCount === 1 ? '' : 's'} on this chart could not be verified against the displayed growth reference and ${
            mismatchCount === 1 ? 'has' : 'have'
        } been hidden.`;
    }
    if (hasUnknown) {
        return 'Some measurements on this chart have an unrecognised growth reference and could not be verified.';
    }
    if (hasLegacy) {
        return 'Some measurements on this chart were calculated before growth-reference verification was available and could not be verified.';
    }
    return '';
}

const ERROR_CODES: Record<ProvenanceIssue['status'], string> = {
    legacy: 'PROVENANCE_LEGACY',
    unknown: 'PROVENANCE_UNKNOWN',
    mismatch: 'PROVENANCE_MISMATCH',
};

const REMEDIATION_TEXT: Record<ProvenanceIssue['status'], string> = {
    legacy: 'This measurement was calculated before growth-reference verification was available. No action needed.',
    unknown:
        "This measurement's growth reference was not recognised by this version of the chart component. If this persists, check for a component update.",
    mismatch:
        'This measurement was calculated against a different growth reference than the one selected for this chart. Contact your system supplier if this recurs.',
};

function technicalDetailsText(issues: ProvenanceIssue[], componentVersion?: string): string {
    const lines = issues.map((issue) => {
        const referenceText = issue.receivedReference
            ? `expected "${issue.expectedReference}", received "${issue.receivedReference}"`
            : `expected "${issue.expectedReference}"`;
        return [
            `- ${issue.method}[${issue.index}]`,
            `  Error code: ${ERROR_CODES[issue.status]}`,
            `  Reference: ${referenceText}`,
            `  Remediation: ${REMEDIATION_TEXT[issue.status]}`,
        ].join('\n');
    });
    return [
        'RCPCH Growth Chart - growth reference verification warning',
        componentVersion ? `Component version: ${componentVersion}` : undefined,
        '',
        ...lines,
        '',
        'Please share this text with your local IT support or system supplier so the source of the mismatch can be investigated.',
    ]
        .filter((line): line is string => line !== undefined)
        .join('\n');
}

const Banner = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    background: #fff8e1;
    border: 1px solid #e0b400;
    border-radius: 4px;
    padding: 8px 12px;
    margin: 8px 0;
    color: #6b5300;
`;

const DetailsPre = styled.pre`
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 0.75rem;
    background: #fffdf5;
    border: 1px solid #e0b400;
    border-radius: 4px;
    padding: 8px;
    margin-top: 8px;
`;

const ToggleButton = styled.button`
    background: none;
    border: 1px solid #6b5300;
    border-radius: 4px;
    color: #6b5300;
    cursor: pointer;
    font-size: 0.75rem;
    padding: 2px 8px;
    margin-left: 8px;
`;

/**
 * Permanently visible (not dismissible) - see the growth-reference
 * provenance contract decision record for why: legacy/unverified data is
 * expected to persist indefinitely at already-integrated sites, so the
 * warning must not be something a user can lose track of.
 */
const ProvenanceWarningBanner: React.FC<Props> = ({ issues, componentVersion }) => {
    const [showDetails, setShowDetails] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    if (!issues || issues.length === 0) return null;

    const details = technicalDetailsText(issues, componentVersion);

    const handleCopy = async () => {
        try {
            if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(details);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch {
            // Clipboard access can be denied by the browser/embedding context.
            // Non-fatal: the details remain visible and selectable by hand.
        }
    };

    return (
        <Banner data-testid="provenance-warning-banner">
            <span>{summaryText(issues)}</span>
            <ToggleButton
                type="button"
                onClick={() => setShowDetails((s) => !s)}
                data-testid="provenance-warning-toggle"
            >
                {showDetails ? 'Hide technical details' : 'Show technical details'}
            </ToggleButton>
            {showDetails && (
                <>
                    <DetailsPre data-testid="provenance-warning-details">{details}</DetailsPre>
                    <ToggleButton type="button" onClick={handleCopy} data-testid="provenance-warning-copy">
                        {copied ? 'Copied' : 'Copy technical details'}
                    </ToggleButton>
                </>
            )}
        </Banner>
    );
};

export default ProvenanceWarningBanner;
