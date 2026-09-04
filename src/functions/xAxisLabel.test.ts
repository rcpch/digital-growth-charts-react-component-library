import { Domains } from '../interfaces/Domains';
import xAxislabel from './xAxisLabel';

type ChartScaleType = 'prem' | 'infant' | 'smallChild' | 'biggerChild';

const cases: Array<{
    chartScaleType: ChartScaleType;
    domains: Domains;
    expected: string;
}> = [
    {
        chartScaleType: 'prem',
        domains: { x: [-0.2, 0.03], y: [0, 1] },
        expected: 'Gestation (weeks)',
    },
    {
        chartScaleType: 'prem',
        domains: { x: [-0.2, 0.04], y: [0, 1] },
        expected: 'Gestation or postnatal weeks',
    },
    {
        chartScaleType: 'infant',
        domains: { x: [-0.2, 1], y: [0, 1] },
        expected: 'Gestation or postnatal age (weeks; months shown as lollipops)',
    },
    {
        chartScaleType: 'infant',
        domains: { x: [-0.2, -0.1], y: [0, 1] },
        expected: 'Gestation',
    },
    {
        chartScaleType: 'infant',
        domains: { x: [0, 1], y: [0, 1] },
        expected: 'Age (weeks; months shown as lollipops)',
    },
    {
        chartScaleType: 'smallChild',
        domains: { x: [0, 4], y: [0, 1] },
        expected: 'Age (years; months shown as lollipops)',
    },
    {
        chartScaleType: 'biggerChild',
        domains: { x: [2, 20], y: [0, 1] },
        expected: 'Age (years)',
    },
];

describe('xAxislabel', () => {
    it.each(cases)(
        'returns "$expected" for $chartScaleType domains $domains.x',
        ({ chartScaleType, domains, expected }) => {
            expect(xAxislabel(chartScaleType, domains)).toBe(expected);
        },
    );
});
