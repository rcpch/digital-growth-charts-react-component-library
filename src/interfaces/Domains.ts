export interface Domains {
    x: [number, number],
    y: [number, number]
}


export interface IDomainMeasurementMethod {
    [measurementMethod: string]: Domains
}

export interface IDomainReference {
    [reference: string]: IDomainMeasurementMethod
}

export interface IDomainSex {
    [sex: string]: IDomainReference
}