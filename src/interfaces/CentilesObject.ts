export interface UKWHOReferences {
    "uk90_preterm"?:  ISexChoice
    "uk_who_infant"?:  ISexChoice
    "uk_who_child"?:  ISexChoice
    "uk90_child"?:  ISexChoice
}
export interface ReferenceGroup {
    centile_data: Reference[]
}
export interface Reference {
    [name: string]: ISexChoice
}

export interface ICentile {
    centile: number,
    data: IPlottedCentileMeasurement [],
    sds: number
}

export interface IPlottedCentileMeasurement {
    "l": string | number,
    "x": number,
    "y": number
}

export interface ISexChoice {
    male: IMeasurementMethod,
    female: IMeasurementMethod
}

export interface IMeasurementMethod{
    height?: ICentile[],
    weight?: ICentile[],
    bmi?: ICentile[],
    ofc?: ICentile[],
}