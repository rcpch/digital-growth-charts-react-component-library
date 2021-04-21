import { Domains } from '../interfaces/Domains';

function xAxislabel(chartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild', domains: Domains): string {
    const lowerX = domains.x[0];
    const upperX = domains.x[1];
    switch (chartScaleType) {
        case 'prem':
            if (upperX <= 0.038329911019849415) {
                return 'Gestation (weeks)';
            } else {
                return 'Gestation or postnatal weeks';
            }
        case 'infant':
            if (lowerX < 0 && upperX >= 0) {
                return 'Gestation or postnatal weeks / months';
            } else if (upperX < 0) {
                return 'Gestation';
            } else {
                return 'Age (in weeks and months)';
            }
        case 'smallChild':
            return 'Age (in years and months)';
        case 'biggerChild':
            return 'Age (in years)';
        default:
            throw new Error('Invalid chartScaleStyle given to xAxisLabel function');
    }
}

export default xAxislabel;
