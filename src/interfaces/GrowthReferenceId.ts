/**
 * The public calculation-reference selectors produced by rcpchgrowth and
 * passed through the API unchanged. Not to be confused with the internal
 * curve-data `Reference` type used for chart plotting, or with the legacy
 * `turner` chart prop value (see normalizeGrowthReference.ts).
 */
export type GrowthReferenceId = 'uk-who' | 'trisomy-21' | 'trisomy-21-aap' | 'turners-syndrome' | 'cdc' | 'who';

export const GROWTH_REFERENCE_IDS: GrowthReferenceId[] = [
    'uk-who',
    'trisomy-21',
    'trisomy-21-aap',
    'turners-syndrome',
    'cdc',
    'who',
];
