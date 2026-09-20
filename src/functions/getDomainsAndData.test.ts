import { getDomainsAndData } from './getDomainsAndData';
import { ukWhoMaleWeight } from '../testParameters/measurements/generated/ukWhoMaleWeight';
import { ukWhoFemaleWeightPreterm22 } from '../testParameters/measurements/generated/ukWhoFemaleWeightPreterm22';
import { whoMaleWeight } from '../testParameters/measurements/generated/whoMaleWeight';

/*
These tests cover the life course view, which is entered by withholding the measurements
from the domain calculation while still plotting them. The uk-who and who life course
domains start at two weeks postnatal, so any measurement taken before then must extend the
lower bound or it is silently plotted outside the visible chart.
*/

const TWO_WEEKS_POSTNATAL = 0.038329911019849415;
const GEST_WEEKS_37 = -0.057494866529774126;

// a term male born at 40+0 whose weight was recorded on his birth date
const termBirthWeight = [ukWhoMaleWeight[0]];
const whoTermBirthWeight = [whoMaleWeight[0]];
// an extremely preterm girl born at 22 weeks, measured before her due date
const pretermWeight = [ukWhoFemaleWeightPreterm22[0]];

describe('getDomainsAndData scopes the measurement-scoped domain to the data supplied.', () => {
    it('should start the domain at 37 weeks gestation for a term birth weight.', () => {
        const { computedDomains } = getDomainsAndData(termBirthWeight, 'male', 'weight', 'uk-who', false, true);
        expect(computedDomains.x[0]).toBeCloseTo(GEST_WEEKS_37, 10);
    });
});

describe('getDomainsAndData includes measurements taken before two weeks postnatal in the life course view.', () => {
    it('should extend the uk-who lower bound to 37 weeks gestation for a term birth weight.', () => {
        const { computedDomains } = getDomainsAndData([], 'male', 'weight', 'uk-who', false, true, termBirthWeight);
        expect(computedDomains.x[0]).toBeCloseTo(GEST_WEEKS_37, 10);
        expect(computedDomains.x[0]).toBeLessThan(termBirthWeight[0].measurement_dates.chronological_decimal_age);
    });

    it('should extend the who lower bound to birth for a term birth weight.', () => {
        const { computedDomains } = getDomainsAndData([], 'male', 'weight', 'who', false, true, whoTermBirthWeight);
        expect(computedDomains.x[0]).toBeCloseTo(-0.01, 10);
        expect(computedDomains.x[0]).toBeLessThan(whoTermBirthWeight[0].measurement_dates.chronological_decimal_age);
    });

    it('should still extend the lower bound to the corrected age of a preterm measurement.', () => {
        const { computedDomains } = getDomainsAndData([], 'female', 'weight', 'uk-who', true, false, pretermWeight);
        const correctedAge = pretermWeight[0].measurement_dates.corrected_decimal_age;
        expect(computedDomains.x[0]).toBeLessThan(correctedAge);
        expect(computedDomains.x[0]).toBeGreaterThanOrEqual(-0.345);
    });

    it('should leave the default lower bound alone when every measurement is already in view.', () => {
        const olderChild = [ukWhoMaleWeight[1]];
        const { computedDomains } = getDomainsAndData([], 'male', 'weight', 'uk-who', false, true, olderChild);
        expect(computedDomains.x[0]).toBeCloseTo(TWO_WEEKS_POSTNATAL, 10);
    });
});
