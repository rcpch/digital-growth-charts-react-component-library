import { Domains } from '../interfaces/Domains';

export const nondisjunctionThresholds = {
    male: [
        {
            x: 0.038,
            label: 'Transition point from UK-WHO to UK90 reference',
        },
        {
            x: 2,
            label: "Measure length until 2y. Measure height from 2y. A child's height is usually slightly less than their length.",
        },
        {
            x: 4,
            label: 'Transition point from UK-WHO to UK90 reference',
        },
    ],
    female: [
        {
            x: 0.038,
            label: 'Transition point from UK-WHO to UK90 reference',
        },
        {
            x: 2,
            label: "Measure length until 2y. Measure height from 2y. A child's height is usually slightly less than their length.",
        },
        {
            x: 4,
            label: 'Transition point from UK-WHO to UK90 reference',
        },
    ],
};

export function makeNonDisjunctionThresholds(domains: Domains | null, sex: 'male' | 'female') {
    if (!domains) {
        return [];
    }
    const newNonDisjunctionThresholds: any[] = [];
    for (const element of nondisjunctionThresholds[sex]) {
        const dataSubArray = [];
        dataSubArray.push({ x: element.x, y: domains.y[0], label: element.label });
        dataSubArray.push({ x: element.x, y: domains.y[1], label: element.label });
        newNonDisjunctionThresholds.push(dataSubArray);
    }
    return newNonDisjunctionThresholds;
}