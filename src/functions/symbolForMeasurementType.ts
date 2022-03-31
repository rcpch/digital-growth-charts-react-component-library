export const symbolForMeasurementType=(measurementType: string)=>{
    switch(measurementType){
        case('height'):{
            return 'circle';
        }
        case('weight'):{
            return 'triangleUp';
        }
        case('ofc'):{
            return 'square';
        }
        case('bmi'):{
            return 'diamond';
        }
        default:{
            return 'circle';
        }
    }
}