export interface CentilesObject {
    [key: string]:  ISexChoice
}

export interface ICentile {
    centile: number,
    data: IPlottedCentileMeasurement [],

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