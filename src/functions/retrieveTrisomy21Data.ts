import trisomy21Data from '../../chartdata/trisomy21Data'

export function retrieveTrisomy21Data(measurementMethod: string, sex:string){
    let data = []
    if (measurementMethod==="height"){
      if (sex === "male"){
        data = trisomy21Data.trisomy21.male.height
      } else {
        data = trisomy21Data.trisomy21.female.height
      }
    }
    if (measurementMethod==="weight"){
      if (sex === "male"){
        data = trisomy21Data.trisomy21.male.weight
      } else {
        data = trisomy21Data.trisomy21.female.weight
      }
    }
    if (measurementMethod==="bmi"){
      if (sex === "male"){
        data = trisomy21Data.trisomy21.male.bmi
      } else {
        data = trisomy21Data.trisomy21.female.bmi
      }
    }
    if (measurementMethod==="ofc"){
      if (sex === "male"){
        data = trisomy21Data.trisomy21.male.ofc
      } else {
        data = trisomy21Data.trisomy21.female.ofc
      }
    }
    return data
}