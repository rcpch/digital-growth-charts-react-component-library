export function yAxisLabel(measurement_method: string, isSDS: boolean) {
    if(isSDS){
        if (measurement_method === 'height') {
            return 'Height / Length (SDS)';
        }
        if (measurement_method === 'weight') {
            return 'Weight (SDS)';
        }
        if (measurement_method === 'bmi') {
            return 'Body Mass Index (SDS)';
        }
        if (measurement_method === 'ofc') {
            return 'Head Circumference (SDS)';
        }
    } else
    {   if (measurement_method === 'height') {
            return 'Height / Length (cm)';
        }
        if (measurement_method === 'weight') {
            return 'Weight (kg)';
        }
        if (measurement_method === 'bmi') {
            return 'Body Mass Index (kg/m²)';
        }
        if (measurement_method === 'ofc') {
            return 'Head Circumference (cm)';
        }
    }
}
