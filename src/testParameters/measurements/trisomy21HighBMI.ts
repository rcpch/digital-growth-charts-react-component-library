import type { Measurement } from "../../interfaces/RCPCHMeasurementObject";

export const trisomy21HighBMI: Measurement[] = [
    {
        "birth_data": {
            "birth_date": "2006-05-08",
            "gestation_weeks": 40,
            "gestation_days": 0,
            "estimated_date_delivery": "2006-05-08",
            "estimated_date_delivery_string": "Mon 08 May, 2006",
            "sex": "male"
        },
        "measurement_dates": {
            "observation_date": "2022-11-01",
            "chronological_decimal_age": 16.484599589322382,
            "corrected_decimal_age": 16.484599589322382,
            "chronological_calendar_age": "16 years, 5 months, 3 weeks and 3 days",
            "corrected_calendar_age": "16 years, 5 months, 3 weeks and 3 days",
            "corrected_gestational_age": {
                "corrected_gestation_weeks": null,
                "corrected_gestation_days": null
            },
            "comments": {
                "clinician_corrected_decimal_age_comment": "Born at term. No correction has been made for gestation.",
                "lay_corrected_decimal_age_comment": "Your child was born on their due date.",
                "clinician_chronological_decimal_age_comment": "Born Term. No correction has been made for gestation.",
                "lay_chronological_decimal_age_comment": "Your child was born on their due date."
            },
            "corrected_decimal_age_error": null,
            "chronological_decimal_age_error": null
        },
        "child_observation_value": {
            "measurement_method": "bmi",
            "observation_value": 36.3,
            "observation_value_error": null
        },
        "measurement_calculated_values": {
            "corrected_sds": 1.9929195642473767,
            "corrected_centile": 97.7,
            "corrected_centile_band": "This body mass index measurement is on or near the 98th centile.",
            "chronological_sds": 1.9929195642473767,
            "chronological_centile": 97.7,
            "chronological_centile_band": "This body mass index measurement is on or near the 98th centile.",
            "corrected_measurement_error": null,
            "chronological_measurement_error": null,
            "corrected_percentage_median_bmi": 163.3208998549931,
            "chronological_percentage_median_bmi": 163.3208998549931
        },
        "plottable_data": {
            "centile_data": {
                "chronological_decimal_age_data": {
                    "x": 16.484599589322382,
                    "y": 36.3,
                    "b": null,
                    "centile": 97.7,
                    "sds": 1.9929195642473767,
                    "bone_age_label": null,
                    "events_text": null,
                    "bone_age_type": null,
                    "bone_age_sds": null,
                    "bone_age_centile": null,
                    "observation_error": null,
                    "age_type": "chronological_age",
                    "calendar_age": "16 years, 5 months, 3 weeks and 3 days",
                    "lay_comment": "Your child was born on their due date.",
                    "clinician_comment": "Born Term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This body mass index measurement is on or near the 98th centile.",
                    "observation_value_error": null
                },
                "corrected_decimal_age_data": {
                    "x": 16.484599589322382,
                    "y": 36.3,
                    "b": null,
                    "centile": 97.7,
                    "sds": 1.9929195642473767,
                    "bone_age_label": null,
                    "events_text": null,
                    "bone_age_type": null,
                    "bone_age_sds": null,
                    "bone_age_centile": null,
                    "observation_error": null,
                    "age_type": "corrected_age",
                    "calendar_age": "16 years, 5 months, 3 weeks and 3 days",
                    "corrected_gestational_age": "",
                    "lay_comment": "Your child was born on their due date.",
                    "clinician_comment": "Born at term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This body mass index measurement is on or near the 98th centile.",
                    "observation_value_error": null
                }
            },
            "sds_data": {
                "chronological_decimal_age_data": {
                    "x": 16.484599589322382,
                    "y": 1.9929195642473767,
                    "b": null,
                    "centile": 97.7,
                    "sds": null,
                    "bone_age_label": null,
                    "events_text": null,
                    "bone_age_type": null,
                    "bone_age_sds": null,
                    "bone_age_centile": null,
                    "observation_error": null,
                    "age_type": "chronological_age",
                    "calendar_age": "16 years, 5 months, 3 weeks and 3 days",
                    "lay_comment": "Your child was born on their due date.",
                    "clinician_comment": "Born Term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This body mass index measurement is on or near the 98th centile.",
                    "observation_value_error": null
                },
                "corrected_decimal_age_data": {
                    "x": 16.484599589322382,
                    "y": 1.9929195642473767,
                    "b": null,
                    "centile": 97.7,
                    "sds": null,
                    "bone_age_label": null,
                    "events_text": null,
                    "bone_age_type": null,
                    "bone_age_sds": null,
                    "bone_age_centile": null,
                    "observation_error": null,
                    "age_type": "corrected_age",
                    "calendar_age": "16 years, 5 months, 3 weeks and 3 days",
                    "corrected_gestational_age": "",
                    "lay_comment": "Your child was born on their due date.",
                    "clinician_comment": "Born at term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This body mass index measurement is on or near the 98th centile.",
                    "observation_value_error": null
                }
            }
        },
        "bone_age": {
            "bone_age": null,
            "bone_age_type": null,
            "bone_age_sds": null,
            "bone_age_centile": null,
            "bone_age_text": null
        },
        "events_data": {
            "events_text": null
        }
    }
]