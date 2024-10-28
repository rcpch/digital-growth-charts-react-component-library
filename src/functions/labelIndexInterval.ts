export function labelIndexInterval(
    chartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild' = 'biggerChild',
    index: number,
    reference: 'uk-who' | 'cdc' | 'trisomy-21' | 'trisomy-21-aap' | 'turner',
    measurementMethod: 'height' | 'weight' | 'bmi' | 'ofc',
): boolean {
    // returns true if index of data point in centile data array should be rendered

    switch (chartScaleType) {
        case 'prem':
            return index % 5 == 0;
        case 'infant':
            return index % 5 == 0;
        case 'smallChild':
            return index % 30 == 0;
        case 'biggerChild':
            if (reference === 'trisomy-21-aap') {
                if (measurementMethod === 'height' || measurementMethod === 'ofc') {
                    return index % 5 == 0;
                }
                return index % 20 == 0;
            }
            return index % 40 == 0;
        default:
            return index % 50 == 0;
    }
}
