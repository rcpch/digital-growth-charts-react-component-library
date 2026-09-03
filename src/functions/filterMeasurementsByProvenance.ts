import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';
import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { checkMeasurementProvenance, ProvenanceStatus } from './checkMeasurementProvenance';

export interface ProvenanceIssue {
    method: keyof ClientMeasurementObject;
    index: number;
    status: Exclude<ProvenanceStatus, 'match'>;
    expectedReference: string;
    receivedReference?: string;
}

export interface ProvenanceFilterResult {
    measurements: ClientMeasurementObject;
    issues: ProvenanceIssue[];
}

const METHOD_KEYS: (keyof ClientMeasurementObject)[] = ['height', 'weight', 'bmi', 'ofc'];

/**
 * Runs every populated measurement-method array through
 * checkMeasurementProvenance against the chart's reference. Only
 * 'mismatch' measurements are removed from the returned collection - the
 * chart's reference curves are unaffected because they are static and do
 * not come from this data. 'legacy' and 'unknown' measurements are kept
 * (and reported) so a mixture of pre- and post-provenance data continues to
 * render.
 */
export function filterMeasurementsByProvenance(
    measurements: ClientMeasurementObject,
    chartReference: string,
): ProvenanceFilterResult {
    const issues: ProvenanceIssue[] = [];
    const filtered: ClientMeasurementObject = {};

    METHOD_KEYS.forEach((method) => {
        const array = measurements[method] as Measurement[] | undefined;
        if (!Array.isArray(array)) return;

        filtered[method] = array.filter((measurement, index) => {
            const result = checkMeasurementProvenance(measurement, chartReference);
            if (result.status !== 'match') {
                issues.push({
                    method,
                    index,
                    status: result.status,
                    expectedReference: result.expectedReference,
                    receivedReference: result.receivedReference,
                });
            }
            return result.status !== 'mismatch';
        }) as any;
    });

    return { measurements: filtered, issues };
}
