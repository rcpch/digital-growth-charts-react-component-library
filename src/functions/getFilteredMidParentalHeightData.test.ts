import { getFilteredMidParentalHeightData } from './getFilteredMidParentalHeightData';
import { MidParentalHeightObject } from '../interfaces/MidParentalHeightObject';
import { Measurement } from '../interfaces/RCPCHMeasurementObject';

const makeMeasurement = (correctedAge: number): Measurement =>
    ({
        plottable_data: {
            centile_data: {
                corrected_decimal_age_data: {
                    x: correctedAge,
                },
            },
        },
    }) as Measurement;

const makeMidParentalHeightData = (): MidParentalHeightObject => ({
    mid_parental_height_centile: 50,
    mid_parental_height_centile_data: [
        {
            uk_who_child: {
                male: {
                    height: [
                        {
                            centile: 50,
                            data: [
                                { x: 5, y: 110 },
                                { x: 20, y: 180 },
                            ],
                        },
                    ],
                },
                female: {
                    height: [
                        {
                            centile: 50,
                            data: [
                                { x: 5, y: 108 },
                                { x: 20, y: 170 },
                            ],
                        },
                    ],
                },
            },
        },
    ],
    mid_parental_height_lower_centile_data: [
        {
            uk_who_child: {
                male: {
                    height: [
                        {
                            centile: 9,
                            data: [
                                { x: 5, y: 102 },
                                { x: 20, y: 172 },
                            ],
                        },
                    ],
                },
                female: {
                    height: [
                        {
                            centile: 9,
                            data: [
                                { x: 5, y: 100 },
                                { x: 20, y: 162 },
                            ],
                        },
                    ],
                },
            },
        },
    ],
    mid_parental_height_upper_centile_data: [
        {
            uk_who_child: {
                male: {
                    height: [
                        {
                            centile: 91,
                            data: [
                                { x: 5, y: 118 },
                                { x: 20, y: 188 },
                            ],
                        },
                    ],
                },
                female: {
                    height: [
                        {
                            centile: 91,
                            data: [
                                { x: 5, y: 116 },
                                { x: 20, y: 178 },
                            ],
                        },
                    ],
                },
            },
        },
    ],
});

describe('getFilteredMidParentalHeightData regression tests', () => {
    it('does not mutate source MPH data when called before measurements arrive', () => {
        const mph = makeMidParentalHeightData();

        const firstCall = getFilteredMidParentalHeightData('uk-who', [], mph, 'male');
        expect(firstCall?.[0].midParentalCentile[0].data).toEqual([{ x: 20, y: 180 }]);

        // Input object remains intact for subsequent calls.
        expect(
            mph.mid_parental_height_centile_data?.[0].uk_who_child?.male?.height?.[0].data,
        ).toHaveLength(2);

        const secondCall = getFilteredMidParentalHeightData('uk-who', [makeMeasurement(5)], mph, 'male');
        expect(secondCall?.[0].midParentalCentile[0].data).toEqual([{ x: 5, y: 110 }]);
    });

    it('uses max corrected age rather than last array item', () => {
        const mph = makeMidParentalHeightData();
        const unsortedMeasurements = [makeMeasurement(5), makeMeasurement(2)];

        const result = getFilteredMidParentalHeightData('uk-who', unsortedMeasurements, mph, 'male');

        expect(result?.[0].midParentalCentile[0].data).toEqual([{ x: 5, y: 110 }]);
    });
});
