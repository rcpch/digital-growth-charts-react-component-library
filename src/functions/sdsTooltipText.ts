
export function sdsTooltipText(datum){
    
    if (datum.datum.childName==="legend"){
        return "Click to hide/reveal measurement type."
    }
    if (datum.datum.childName==='mid-parental-sds'){
        return `Midparental Height SDS: ${datum.datum.y > 0 ? '+' : ''}${Math.round(datum.datum.y*1000)/1000}`;
    }
    let corrected = "Adjusted Age: ";
    const array = datum.datum.childName.split('-')
    let measurementMethod = array[1];

    let finalString = ""
    if (measurementMethod=="height"){
        finalString="Height"
    }
    if (measurementMethod=="weight"){
        finalString="Weight"
    }
    if (measurementMethod=="bmi"){
        finalString="Body Mass Index"
    }
    if (measurementMethod=="ofc"){
        finalString="Head Circumference"
    }
    
    if (datum.datum.age_type==="chronological_age"){
        corrected="Unadjusted Age: ";
    }
    let finalLabel = "";
    
        if (corrected==="chronological"){
            finalLabel = measurementMethod+"\n"+datum.datum.measurement_dates.chronological_calendar_age + "\n"+ "SDS: " + Math.round(datum.datum.measurement_calculated_values.chronological_sds*1000)/1000;
        } else {
            finalLabel = finalString+"\n"+datum.datum.measurement_dates.corrected_calendar_age + "\n"+ "SDS: " + Math.round(datum.datum.measurement_calculated_values.corrected_sds*1000)/1000;
        }
    
        if (datum.datum.age_error){
            finalLabel += datum.datum.age_error;
        }
        if (datum.datum.observation_value_error){
            finalLabel+=datum.datum.observation_value_error;
        }
    
    return finalLabel;
}