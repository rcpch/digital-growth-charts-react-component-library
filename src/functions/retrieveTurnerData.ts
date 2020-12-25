import turnerData from '../../chartdata/turners_chart_data'


export function retrieveTurnerData(measurementMethod: string, sex: string){
    let data = []
    if (measurementMethod==="height"){
    if (sex === "male"){
        data = turnerData.turnerssyndrome.male.height
    } else {
        data = turnerData.turnerssyndrome.female.height
    }
    }
    if (measurementMethod==="weight"){
    if (sex === "male"){
        data = turnerData.turnerssyndrome.male.weight
    } else {
        data = turnerData.turnerssyndrome.female.weight
    }
    }
    if (measurementMethod==="bmi"){
    if (sex === "male"){
        data = turnerData.turnerssyndrome.male.bmi
    } else {
        data = turnerData.turnerssyndrome.female.bmi
    }
    }
    if (measurementMethod==="ofc"){
    if (sex === "male"){
        data = turnerData.turnerssyndrome.male.ofc
    } else {
        data = turnerData.turnerssyndrome.female.ofc
    }
    }
    return  data
}