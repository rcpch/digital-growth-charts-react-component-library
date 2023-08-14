export interface Measurement {
    birth_data: {
        birth_date: string;
        estimated_date_delivery: string;
        estimated_date_delivery_string: string;
        gestation_weeks: number;
        gestation_days: number;
        sex: 'male' | 'female';
    };
    child_observation_value: {
        measurement_method: 'height' | 'weight' | 'bmi' | 'ofc';
        observation_value: number;
        observation_value_error?: string;
    };
    measurement_dates: {
        chronological_calendar_age: string;
        chronological_decimal_age: number;
        corrected_calendar_age: string;
        corrected_decimal_age: number;
        corrected_gestational_age?: {
            corrected_gestation_weeks?: number;
            corrected_gestation_days?: number;
        };
        comments?:{
            clinician_corrected_decimal_age_comment?: string;
            lay_corrected_decimal_age_comment?: string;
            clinician_chronological_decimal_age_comment: string;
            lay_chronological_decimal_age_comment: string;
        }
        observation_date: string;
        corrected_decimal_age_error?: string; 
        chronological_decimal_age_error?: string; 
    };
    measurement_calculated_values: {
        chronological_centile: number;
        chronological_centile_band: string;
        chronological_measurement_error?: string;
        chronological_sds: number;
        corrected_centile: number;
        corrected_centile_band: string;
        corrected_measurement_error?: string;
        corrected_percentage_median_bmi?: number
        chronological_percentage_median_bmi?: number
        corrected_sds: number;
    };
    plottable_data: {
        centile_data: {
            chronological_decimal_age_data: {
                age_error?: string;
                age_type: 'chronological_age' | 'corrected_age';
                calendar_age: string;
                centile_band: string;
                clinician_comment: string;
                lay_comment: string;
                observation_error?: string;
                observation_value_error?: string;
                x: number;
                y: number;
                b?: number;
                centile?: number;
                sds?: number;
                bone_age_label?: string;
                events_text?: string[];
                bone_age_type?: string;
                bone_age_sds?: number; 
                bone_age_centile?: number; 
            };
            corrected_decimal_age_data: {
                age_error?: string;
                age_type: 'chronological_age' | 'corrected_age';
                calendar_age: string;
                centile_band: string;
                clinician_comment: string;
                lay_comment: string;
                observation_error?: string;
                observation_value_error?: string;
                x: number;
                y: number;
                b?: number;
                centile?: number;
                sds?: number;
                bone_age_label?: string;
                events_text?: string[];
                bone_age_type?: string;
                bone_age_sds?: number;
                bone_age_centile?: number;
                corrected_gestational_age?: string;
            };
        };
        sds_data: {
            chronological_decimal_age_data: {
                age_error?: string;
                age_type: 'chronological_age' | 'corrected_age';
                calendar_age: string;
                centile_band: string;
                clinician_comment: string;
                lay_comment: string;
                observation_error?: string;
                observation_value_error?: string;
                x: number;
                y: number;
                b?: number;
                centile: number;
                sds: number;
                bone_age_label?: string;
                events_text?: string[];
                bone_age_sds?: number;
                bone_age_type?: string;
                bone_age_centile?: number;
            };
            corrected_decimal_age_data: {
                age_error?: string;
                age_type: 'chronological_age' | 'corrected_age';
                calendar_age: string;
                centile_band: string;
                clinician_comment: string;
                lay_comment: string;
                observation_error?: string;
                observation_value_error?: string;
                x: number;
                y: number;
                b?: number;
                centile: number;
                sds: number;
                bone_age_label?: string;
                bone_age_type?: string;
                events_text?: string[];
                bone_age_sds?: number;
                bone_age_centile?: number;
                corrected_gestational_age?: string;
            };
        };
    };
    bone_age: {
        bone_age?: number;
        bone_age_type?: number;
        bone_age_centile?: number;
        bone_age_sds?: number;
        bone_age_text?: string;
    };
    events_data: {
        events_text?: string[];
    };
}
