export const nameForMeasurementMethod = (measurementMethod: string): string =>{
    let name="Height/Length";
    if (measurementMethod==="weight"){
        name="Weight";
    }
    if (measurementMethod==="bmi"){
        name="Body Mass Index";
    }
    if (measurementMethod==="ofc"){
        name="Head Circumference";
    }
    return name;
}