export interface UKWHOReferences {
    uk90_preterm:  ISexChoice
    uk_who_infant:  ISexChoice
    uk_who_child:  ISexChoice
    uk90_child:  ISexChoice
}

export interface Reference {
    [key: string]: ISexChoice
}

export interface ICentile {
    centile: number,
    data: IPlottedCentileMeasurement [],
    sds: number
}

export interface IPlottedCentileMeasurement {
    l: number,
    x: number,
    y: number
}

export interface ISexChoice {
    male: IMeasurementMethod,
    female: IMeasurementMethod
}

export interface IMeasurementMethod{
    height: ICentile[],
    weight: ICentile[],
    bmi: ICentile[],
    ofc: ICentile[],
}