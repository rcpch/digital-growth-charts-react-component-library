import { ukWhoFemaleHeight } from './generated/ukWhoFemaleHeight';
import type { Measurement } from '../../interfaces/RCPCHMeasurementObject';

const withoutProvenance = ({ provenance: _provenance, ...measurement }: Measurement): Measurement => measurement;

const withGrowthReference = (measurement: Measurement, growth_reference: string): Measurement => ({
    ...measurement,
    provenance: { ...measurement.provenance, growth_reference },
});

const currentMeasurements = ukWhoFemaleHeight.slice(0, 3);

/**
 * Dedicated fixtures for demonstrating each growth-reference provenance
 * outcome from the contract at
 * digital-growth-charts-documentation/spec/growth-reference-provenance-contract.md.
 * Reuses a current API-generated series so the plotted points and matching
 * provenance are realistic; only `provenance` differs between variants.
 */
export const provenanceMatchHeight: Measurement[] = currentMeasurements;

export const provenanceLegacyHeight: Measurement[] = currentMeasurements.map(withoutProvenance);

export const provenanceUnknownHeight: Measurement[] = currentMeasurements.map((measurement) =>
    withGrowthReference(measurement, 'uk-who-2027'),
);

export const provenanceMismatchHeight: Measurement[] = currentMeasurements.map((measurement) =>
    withGrowthReference(measurement, 'cdc'),
);

export const provenanceMixedHeight: Measurement[] = [
    currentMeasurements[0], // match
    withoutProvenance(currentMeasurements[1]), // legacy
    withGrowthReference(currentMeasurements[2], 'cdc'), // mismatch - suppressed from the chart
];
