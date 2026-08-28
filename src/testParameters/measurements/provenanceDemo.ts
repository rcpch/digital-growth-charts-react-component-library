import { twoToEight } from './twoToEight';
import { Measurement } from '../../interfaces/RCPCHMeasurementObject';

const withProvenance = (measurement: Measurement, growth_reference?: string): Measurement =>
    growth_reference === undefined ? measurement : { ...measurement, provenance: { growth_reference } };

/**
 * Dedicated fixtures for demonstrating each growth-reference provenance
 * outcome from the contract at
 * digital-growth-charts-documentation/spec/growth-reference-provenance-contract.md.
 * Reuses twoToEight's calculated values so the plotted points are realistic;
 * only `provenance` differs between them.
 */
export const provenanceMatchHeight: Measurement[] = twoToEight.slice(0, 3).map((m) => withProvenance(m, 'uk-who'));

export const provenanceLegacyHeight: Measurement[] = twoToEight.slice(0, 3);

export const provenanceUnknownHeight: Measurement[] = twoToEight
    .slice(0, 3)
    .map((m) => withProvenance(m, 'uk-who-2027'));

export const provenanceMismatchHeight: Measurement[] = twoToEight.slice(0, 3).map((m) => withProvenance(m, 'cdc'));

export const provenanceMixedHeight: Measurement[] = [
    withProvenance(twoToEight[0], 'uk-who'), // match
    twoToEight[1], // legacy
    withProvenance(twoToEight[2], 'cdc'), // mismatch - suppressed from the chart
];
