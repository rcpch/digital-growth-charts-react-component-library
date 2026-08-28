import { GrowthReferenceId, GROWTH_REFERENCE_IDS } from '../interfaces/GrowthReferenceId';
import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { normalizeGrowthReference } from './normalizeGrowthReference';

export type ProvenanceStatus = 'match' | 'legacy' | 'unknown' | 'mismatch';

export interface ProvenanceCheckResult {
    status: ProvenanceStatus;
    expectedReference: string;
    receivedReference?: string;
}

/**
 * Compares one Measurement's provenance against the reference the chart was
 * asked to display. Pure and side-effect free: never throws, never mutates
 * its arguments.
 *
 * - 'legacy': no provenance present. Data calculated before provenance
 *   existed. Renders normally with a non-blocking warning - it cannot be
 *   distinguished from safe legacy data, and sites will likely carry a
 *   permanent mixture of legacy and provenance-bearing measurements.
 * - 'unknown': provenance present but not a recognised canonical value.
 *   Renders with a warning - reserved for a confirmed mismatch, not
 *   suppression, because an unrecognised value could itself be a new
 *   canonical reference this build doesn't know about yet.
 * - 'mismatch': provenance present, recognised, and does not match the
 *   chart's reference. The one state that can be distinguished with
 *   certainty from legacy data - this measurement should be suppressed.
 * - 'match': provenance present and matches. Renders normally.
 */
export function checkMeasurementProvenance(
    measurement: Pick<Measurement, 'provenance'>,
    chartReference: string,
): ProvenanceCheckResult {
    const expectedReference = normalizeGrowthReference(chartReference);
    const received = measurement?.provenance?.growth_reference;

    if (received == null || received === '') {
        return { status: 'legacy', expectedReference };
    }

    if (typeof received !== 'string' || !GROWTH_REFERENCE_IDS.includes(received as GrowthReferenceId)) {
        return { status: 'unknown', expectedReference, receivedReference: String(received) };
    }

    if (received !== expectedReference) {
        return { status: 'mismatch', expectedReference, receivedReference: received };
    }

    return { status: 'match', expectedReference, receivedReference: received };
}
