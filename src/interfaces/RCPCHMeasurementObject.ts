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
      observation_value: number,
      observation_value_error: string
    },
    measurement_dates: {
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
      chronological_centile: number,
      chronological_centile_band: string,
      chronological_measurement_error: string,
      chronological_sds: number,
      corrected_centile: number,
      corrected_centile_band: string,
      corrected_measurement_error: string,
      corrected_sds: number
      measurement_method: 'height' | 'weight' | 'bmi' | 'ofc',
    }
    plottable_data: {
      centile_data: {
        chronological_decimal_age_data: {
          x: number,
          y: number,
        },
        corrected_decimal_age_data: {
          x: number,
          y: number
        }
      },
      sds_data: {
        chronological_decimal_age_data: {
          x: number,
          y: number,
        },
        corrected_decimal_age_data: {
          x: number,
          y: number
        }
      }
    }
  }