import defaultToggles from './defaultToggles';
import { Measurement } from '../interfaces/RCPCHMeasurementObject';
import { ukWhoMaleWeight } from '../testParameters/measurements/generated/ukWhoMaleWeight';
import { ukWhoMaleHeightPreterm30 } from '../testParameters/measurements/generated/ukWhoMaleHeightPreterm30';

/*
No age correction is applied at or beyond 40+0, so the corrected/chronological toggle is
not offered for those children. Every other gestation is corrected in some form, so the
toggle is offered and corrected age is shown by default.
*/

const atGestation = (weeks: number, days: number, source: Measurement[] = ukWhoMaleWeight): Measurement[] => {
    const copy: Measurement[] = JSON.parse(JSON.stringify(source));
    copy.forEach((measurement) => {
        measurement.birth_data.gestation_weeks = weeks;
        measurement.birth_data.gestation_days = days;
    });
    return copy;
};

describe('defaultToggles does not offer age correction from 40+0 onwards.', () => {
    it.each([
        [40, 0],
        [40, 3],
        [41, 0],
        [42, 0],
    ])('should show chronological age only and hide the toggle at %i+%i weeks.', (weeks, days) => {
        const { defaultShowCorrected, defaultShowChronological, showToggle } = defaultToggles(atGestation(weeks, days));
        expect(defaultShowCorrected).toBe(false);
        expect(defaultShowChronological).toBe(true);
        expect(showToggle).toBe(false);
    });
});

describe('defaultToggles offers age correction below 40+0.', () => {
    it.each([
        [37, 0],
        [38, 2],
        [39, 6],
    ])('should show corrected age and offer the toggle at %i+%i weeks.', (weeks, days) => {
        const { defaultShowCorrected, showToggle } = defaultToggles(atGestation(weeks, days));
        expect(defaultShowCorrected).toBe(true);
        expect(showToggle).toBe(true);
    });

    it('should show both ages for a preterm child measured beyond two weeks corrected.', () => {
        const { defaultShowCorrected, defaultShowChronological, showToggle } = defaultToggles(ukWhoMaleHeightPreterm30);
        expect(defaultShowCorrected).toBe(true);
        expect(defaultShowChronological).toBe(true);
        expect(showToggle).toBe(true);
    });
});

describe('defaultToggles with no measurements.', () => {
    it('should show chronological age only and hide the toggle.', () => {
        const { defaultShowCorrected, defaultShowChronological, showToggle } = defaultToggles([]);
        expect(defaultShowCorrected).toBe(false);
        expect(defaultShowChronological).toBe(true);
        expect(showToggle).toBe(false);
    });
});
