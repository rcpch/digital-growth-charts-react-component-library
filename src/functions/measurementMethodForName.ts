export const measurementMethodForName = (name: string): string => {
    let measurementMethod = 'height';
    if (name === 'Weight') {
        measurementMethod = 'weight';
    }
    if (name === 'Body Mass Index') {
        measurementMethod = 'bmi';
    }
    if (name === 'Head Circumference') {
        measurementMethod = 'ofc';
    }
    return measurementMethod;
};
