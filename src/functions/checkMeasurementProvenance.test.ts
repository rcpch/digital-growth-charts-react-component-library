import { checkMeasurementProvenance } from './checkMeasurementProvenance';
import { Measurement } from '../interfaces/RCPCHMeasurementObject';

const makeMeasurement = (growthReference?: string): Pick<Measurement, 'provenance'> =>
    growthReference === undefined
        ? {}
        : {
              provenance: {
                  growth_reference: growthReference,
              },
          };

describe('checkMeasurementProvenance', () => {
    it('returns match when provenance matches the chart reference', () => {
        const result = checkMeasurementProvenance(makeMeasurement('uk-who'), 'uk-who');
        expect(result).toEqual({
            status: 'match',
            expectedReference: 'uk-who',
            receivedReference: 'uk-who',
        });
    });

    it('normalizes the legacy turner chart prop to turners-syndrome before comparing', () => {
        const result = checkMeasurementProvenance(makeMeasurement('turners-syndrome'), 'turner');
        expect(result).toEqual({
            status: 'match',
            expectedReference: 'turners-syndrome',
            receivedReference: 'turners-syndrome',
        });
    });

    it('returns legacy when provenance is absent', () => {
        const result = checkMeasurementProvenance(makeMeasurement(undefined), 'uk-who');
        expect(result).toEqual({ status: 'legacy', expectedReference: 'uk-who' });
    });

    it('returns legacy when provenance.growth_reference is an empty string', () => {
        const result = checkMeasurementProvenance(makeMeasurement(''), 'uk-who');
        expect(result).toEqual({ status: 'legacy', expectedReference: 'uk-who' });
    });

    it('returns unknown when provenance is present but not a canonical value', () => {
        const result = checkMeasurementProvenance(makeMeasurement('made-up-reference'), 'uk-who');
        expect(result).toEqual({
            status: 'unknown',
            expectedReference: 'uk-who',
            receivedReference: 'made-up-reference',
        });
    });

    it('returns mismatch when provenance is present, recognised, and does not match', () => {
        const result = checkMeasurementProvenance(makeMeasurement('cdc'), 'uk-who');
        expect(result).toEqual({
            status: 'mismatch',
            expectedReference: 'uk-who',
            receivedReference: 'cdc',
        });
    });

    it('never throws when measurement is null or undefined', () => {
        expect(() => checkMeasurementProvenance(null as unknown as Measurement, 'uk-who')).not.toThrow();
        expect(() => checkMeasurementProvenance(undefined as unknown as Measurement, 'uk-who')).not.toThrow();
    });
});
