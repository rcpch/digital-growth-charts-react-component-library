export interface PlottableMeasurement {
    calendar_age: string,
    centile_band: string,
    centile_value: number,
    corrected_gestation_days: number,
    corrected_gestation_weeks: number,
    age_type: "corrected_age" | "chronological_age"
    x: number,
    y: number
}

export interface Measurement {
    birth_data: {
      birth_date: Date,
      estimated_date_delivery: Date,
      estimated_date_delivery_string: string,
      gestation_weeks: number,
      gestation_days: number,
      sex: 'male' | 'female'
    },
    child_observation_value: {
      measurement_method: 'height' | 'weight' | 'bmi' | 'bmi',
      measurement_value: number
    },
    child_measurement_dates: {
      chronological_calendar_age: string,
      chronological_decimal_age: number,
      clinician_decimal_age_comment: string
      corrected_calendar_age: string,
      corrected_decimal_age: number,
      corrected_gestational_age: {
        corrected_gestation_weeks: number
        corrected_gestation_days: number
      },
      lay_decimal_age_comment: string,
      observation_date: Date
    },
    measurement_calculated_values: {
      centile: number,
      measurement_method: 'height' | 'weight' | 'bmi' | 'ofc',
      sds: number,
      centile_band: string
    }
  }