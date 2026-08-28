/**
 * Normalizes a chart `reference` prop value to the canonical API provenance
 * spelling, for comparison purposes only. The legacy `turner` chart prop is
 * kept for source compatibility; it is not renamed.
 */
export function normalizeGrowthReference(reference: string): string {
    return reference === 'turner' ? 'turners-syndrome' : reference;
}
