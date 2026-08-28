import { filterMeasurementsByProvenance } from './filterMeasurementsByProvenance';
import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';
import { Measurement } from '../interfaces/RCPCHMeasurementObject';

const makeMeasurement = (growthReference?: string): Measurement =>
    (growthReference === undefined
        ? {}
        : {
              provenance: {
                  growth_reference: growthReference,
              },
          }) as Measurement;

describe('filterMeasurementsByProvenance', () => {
    it('keeps matching, legacy, and unknown measurements, and removes only mismatch measurements', () => {
        const measurements: ClientMeasurementObject = {
            height: [
                makeMeasurement('uk-who'), // match
                makeMeasurement(undefined), // legacy
                makeMeasurement('not-a-real-reference'), // unknown
                makeMeasurement('cdc'), // mismatch
            ],
        };

        const { measurements: filtered, issues } = filterMeasurementsByProvenance(measurements, 'uk-who');

        expect(filtered.height).toHaveLength(3);
        expect(issues).toHaveLength(3);
        expect(issues.map((i) => i.status).sort()).toEqual(['legacy', 'mismatch', 'unknown']);
    });

    it('reports the correct method and array index for each issue', () => {
        const measurements: ClientMeasurementObject = {
            height: [makeMeasurement('uk-who'), makeMeasurement('cdc')],
            weight: [makeMeasurement(undefined)],
        };

        const { issues } = filterMeasurementsByProvenance(measurements, 'uk-who');

        expect(issues).toContainEqual(expect.objectContaining({ method: 'height', index: 1, status: 'mismatch' }));
        expect(issues).toContainEqual(expect.objectContaining({ method: 'weight', index: 0, status: 'legacy' }));
    });

    it('runs every populated measurement-method array independently', () => {
        const measurements: ClientMeasurementObject = {
            height: [makeMeasurement('uk-who')],
            weight: [makeMeasurement('cdc')],
            bmi: [makeMeasurement('uk-who')],
            ofc: [makeMeasurement('cdc')],
        };

        const { measurements: filtered, issues } = filterMeasurementsByProvenance(measurements, 'uk-who');

        expect(filtered.height).toHaveLength(1);
        expect(filtered.weight).toHaveLength(0);
        expect(filtered.bmi).toHaveLength(1);
        expect(filtered.ofc).toHaveLength(0);
        expect(issues).toHaveLength(2);
    });

    it('leaves methods with no array untouched', () => {
        const measurements: ClientMeasurementObject = { height: [makeMeasurement('uk-who')] };

        const { measurements: filtered, issues } = filterMeasurementsByProvenance(measurements, 'uk-who');

        expect(filtered.weight).toBeUndefined();
        expect(filtered.bmi).toBeUndefined();
        expect(filtered.ofc).toBeUndefined();
        expect(issues).toHaveLength(0);
    });

    it('a mixture of legacy and matching data in one chart renders both, with no issue for matches', () => {
        const measurements: ClientMeasurementObject = {
            height: [makeMeasurement('uk-who'), makeMeasurement(undefined)],
        };

        const { measurements: filtered, issues } = filterMeasurementsByProvenance(measurements, 'uk-who');

        expect(filtered.height).toHaveLength(2);
        expect(issues).toHaveLength(1);
        expect(issues[0].status).toBe('legacy');
    });

    it('normalizes the legacy turner chart prop when checking for mismatches', () => {
        const measurements: ClientMeasurementObject = {
            height: [makeMeasurement('turners-syndrome')],
        };

        const { measurements: filtered, issues } = filterMeasurementsByProvenance(measurements, 'turner');

        expect(filtered.height).toHaveLength(1);
        expect(issues).toHaveLength(0);
    });
});
