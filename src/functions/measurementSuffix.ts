export function measurementSuffix(measurement: string) {
    if (measurement === 'height') {
        return 'cm';
    }
    if (measurement === 'weight') {
        return 'kg';
    }
    if (measurement === 'ofc') {
        return 'cm';
    }
    if (measurement === 'bmi') {
        return 'kg/m²';
    }
}
