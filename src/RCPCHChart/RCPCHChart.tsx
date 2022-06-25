// packages/libraries
import React from 'react';

// props and interfaces
import { RCPCHChartProps } from './RCPCHChart.types';


// style sheets
import './RCPCHChart.scss';

// components
import CentileChart from '../CentileChart';
import SDSChart from '../SDSChart/SDSChart';

// helper functions
import makeAllStyles from '../functions/makeAllStyles';
import ErrorBoundary from '../SubComponents/ErrorBoundary';
import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';
import defineNonStylePropDefaults from '../functions/defineNonStylePropDefaults';

const RCPCHChart: React.FC<RCPCHChartProps> = ({
    title,
    subtitle,
    measurementMethod,
    reference,
    sex,
    measurementsArray,
    midParentalHeightData,
    enableZoom = true,
    chartStyle,
    axisStyle,
    gridlineStyle,
    centileStyle,
    sdsStyle,
    measurementStyle,
    chartType,
    enableExport,
    exportChartCallback,
    clinicianFocus
}) => {
    const styles = makeAllStyles(chartStyle, axisStyle, gridlineStyle, centileStyle, sdsStyle, measurementStyle);
    
    clinicianFocus = defineNonStylePropDefaults('clinicianFocus', clinicianFocus);
    enableExport = defineNonStylePropDefaults('enableExport', enableExport);
    chartType = defineNonStylePropDefaults('chartType', chartType);
    
    // uncomment in development
    // console.log("loading from locally...");
    
    let isCentile=(chartType === "centile" || chartType === undefined);

    const version="v6.1.4"
    
    if (isCentile){
        return (
            <ErrorBoundary styles={styles}>
                <CentileChart
                    chartsVersion={version}
                    reference={reference}
                    title={title}
                    subtitle={subtitle}
                    childMeasurements={measurementsArray || []}
                    midParentalHeightData={midParentalHeightData}
                    measurementMethod={measurementMethod}
                    sex={sex}
                    enableZoom={enableZoom}
                    styles={styles}
                    enableExport={enableExport}
                    exportChartCallback={exportChartCallback}
                    clinicianFocus={clinicianFocus}
                />
            </ErrorBoundary>
        );
    } else {
        const castArray = measurementsArray as ClientMeasurementObject;
        
        return (
            <ErrorBoundary styles={styles}>
                <SDSChart
                    chartsVersion={version}
                    reference={reference}
                    title={title}
                    subtitle={subtitle}
                    measurementMethod={measurementMethod}
                    childMeasurements={castArray}
                    midParentalHeightData={midParentalHeightData}
                    sex={sex}
                    enableZoom={enableZoom}
                    styles={styles}
                    enableExport={enableExport}
                    exportChartCallback={exportChartCallback}
                />
            </ErrorBoundary>
        );
    }

};

export default RCPCHChart;

/*
    return object structure from API
    [
    {
        "birth_data": {
            "birth_date": "1759-04-11T00:00:00",
            "gestation_weeks": 40,
            "gestation_days": 0,
            "estimated_date_delivery": "1759-04-11T00:00:00",
            "estimated_date_delivery_string": "Wed 11 April, 1759",
            "sex": "female"
        },
        "measurement_dates": {
            "observation_date": "1759-04-11T00:00:00",
            "chronological_decimal_age": 0.0,
            "corrected_decimal_age": 0.0,
            "chronological_calendar_age": "Happy Birthday",
            "corrected_calendar_age": "Happy Birthday",
            "corrected_gestational_age": {
                "corrected_gestation_weeks": 40,
                "corrected_gestation_days": 0
            },
            "comments": {
                "clinician_corrected_decimal_age_comment": "Born at term. No correction has been made for gestation.",
                "lay_corrected_decimal_age_comment": "Your baby was born on their due date.",
                "clinician_chronological_decimal_age_comment": "Born Term. No correction has been made for gestation.",
                "lay_chronological_decimal_age_comment": "Your baby was born on their due date."
            },
            "corrected_decimal_age_error": null,
            "chronological_decimal_age_error": null
        },
        "child_observation_value": {
            "measurement_method": "height",
            "observation_value": 50.0,
            "observation_value_error": null
        },
        "measurement_calculated_values": {
            "corrected_sds": -0.00929688975104273,
            "corrected_centile": 49,
            "corrected_centile_band": "This height measurement is on or near the 50th centile.",
            "chronological_sds": -0.00929688975104273,
            "chronological_centile": 49,
            "chronological_centile_band": "This height measurement is on or near the 50th centile.",
            "corrected_measurement_error": null,
            "chronological_measurement_error": null,
            "corrected_percentage_median_bmi": null,
            "chronological_percentage_median_bmi": null
        },
        "plottable_data": {
            "centile_data": {
                "chronological_decimal_age_data": {
                    "x": 0.0,
                    "y": 50.0,
                    "b": null,
                    "events_text": null,
                    "bone_age_label": null,
                    "observation_error": null,
                    "age_type": "chronological_age",
                    "calendar_age": "Happy Birthday",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born Term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
                    "observation_value_error": null
                },
                "corrected_decimal_age_data": {
                    "x": 0.0,
                    "y": 50.0,
                    "b": null,
                    "events_text": null,
                    "bone_age_label": "SDS: None, Centile: None",
                    "observation_error": null,
                    "age_type": "corrected_age",
                    "corrected_gestational_age": "40 + 0 weeks",
                    "calendar_age": "Happy Birthday",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born at term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
                    "observation_value_error": null
                }
            },
            "sds_data": {
                "chronological_decimal_age_data": {
                    "x": 0.0,
                    "y": -0.00929688975104273,
                    "b": null,
                    "bone_age_label": "SDS: None, Centile: None",
                    "age_type": "chronological_age",
                    "calendar_age": "Happy Birthday",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born Term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
                    "observation_value_error": null
                },
                "corrected_decimal_age_data": {
                    "x": 0.0,
                    "y": -0.00929688975104273,
                    "b": null,
                    "bone_age_label": "SDS: None, Centile: None",
                    "age_type": "corrected_age",
                    "corrected_gestational_age": "40 + 0 weeks",
                    "calendar_age": "Happy Birthday",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born at term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
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
    },
    {
        "birth_data": {
            "birth_date": "1759-04-11T00:00:00",
            "gestation_weeks": 40,
            "gestation_days": 0,
            "estimated_date_delivery": "1759-04-11T00:00:00",
            "estimated_date_delivery_string": "Wed 11 April, 1759",
            "sex": "female"
        },
        "measurement_dates": {
            "observation_date": "1759-07-11T07:30:00",
            "chronological_decimal_age": 0.24914442162902123,
            "corrected_decimal_age": 0.24914442162902123,
            "chronological_calendar_age": "3 months",
            "corrected_calendar_age": "3 months",
            "corrected_gestational_age": {
                "corrected_gestation_weeks": null,
                "corrected_gestation_days": null
            },
            "comments": {
                "clinician_corrected_decimal_age_comment": "Born at term. No correction has been made for gestation.",
                "lay_corrected_decimal_age_comment": "Your baby was born on their due date.",
                "clinician_chronological_decimal_age_comment": "Born Term. No correction has been made for gestation.",
                "lay_chronological_decimal_age_comment": "Your baby was born on their due date."
            },
            "corrected_decimal_age_error": null,
            "chronological_decimal_age_error": null
        },
        "child_observation_value": {
            "measurement_method": "height",
            "observation_value": 59.8,
            "observation_value_error": null
        },
        "measurement_calculated_values": {
            "corrected_sds": 0.010788148070195205,
            "corrected_centile": 50,
            "corrected_centile_band": "This height measurement is on or near the 50th centile.",
            "chronological_sds": 0.010788148070195205,
            "chronological_centile": 50,
            "chronological_centile_band": "This height measurement is on or near the 50th centile.",
            "corrected_measurement_error": null,
            "chronological_measurement_error": null,
            "corrected_percentage_median_bmi": null,
            "chronological_percentage_median_bmi": null
        },
        "plottable_data": {
            "centile_data": {
                "chronological_decimal_age_data": {
                    "x": 0.24914442162902123,
                    "y": 59.8,
                    "b": null,
                    "events_text": null,
                    "bone_age_label": null,
                    "observation_error": null,
                    "age_type": "chronological_age",
                    "calendar_age": "3 months",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born Term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
                    "observation_value_error": null
                },
                "corrected_decimal_age_data": {
                    "x": 0.24914442162902123,
                    "y": 59.8,
                    "b": null,
                    "events_text": null,
                    "bone_age_label": "SDS: None, Centile: None",
                    "observation_error": null,
                    "age_type": "corrected_age",
                    "corrected_gestational_age": "",
                    "calendar_age": "3 months",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born at term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
                    "observation_value_error": null
                }
            },
            "sds_data": {
                "chronological_decimal_age_data": {
                    "x": 0.24914442162902123,
                    "y": 0.010788148070195205,
                    "b": null,
                    "bone_age_label": "SDS: None, Centile: None",
                    "age_type": "chronological_age",
                    "calendar_age": "3 months",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born Term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
                    "observation_value_error": null
                },
                "corrected_decimal_age_data": {
                    "x": 0.24914442162902123,
                    "y": 0.010788148070195205,
                    "b": null,
                    "bone_age_label": "SDS: None, Centile: None",
                    "age_type": "corrected_age",
                    "corrected_gestational_age": "",
                    "calendar_age": "3 months",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born at term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
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
    },
    {
        "birth_data": {
            "birth_date": "1759-04-11T00:00:00",
            "gestation_weeks": 40,
            "gestation_days": 0,
            "estimated_date_delivery": "1759-04-11T00:00:00",
            "estimated_date_delivery_string": "Wed 11 April, 1759",
            "sex": "female"
        },
        "measurement_dates": {
            "observation_date": "1759-10-10T15:00:00",
            "chronological_decimal_age": 0.49828884325804246,
            "corrected_decimal_age": 0.49828884325804246,
            "chronological_calendar_age": "5 months, 4 weeks and 1 day",
            "corrected_calendar_age": "5 months, 4 weeks and 1 day",
            "corrected_gestational_age": {
                "corrected_gestation_weeks": null,
                "corrected_gestation_days": null
            },
            "comments": {
                "clinician_corrected_decimal_age_comment": "Born at term. No correction has been made for gestation.",
                "lay_corrected_decimal_age_comment": "Your baby was born on their due date.",
                "clinician_chronological_decimal_age_comment": "Born Term. No correction has been made for gestation.",
                "lay_chronological_decimal_age_comment": "Your baby was born on their due date."
            },
            "corrected_decimal_age_error": null,
            "chronological_decimal_age_error": null
        },
        "child_observation_value": {
            "measurement_method": "height",
            "observation_value": 65.7,
            "observation_value_error": null
        },
        "measurement_calculated_values": {
            "corrected_sds": 0.0009045032170827941,
            "corrected_centile": 50,
            "corrected_centile_band": "This height measurement is on or near the 50th centile.",
            "chronological_sds": 0.0009045032170827941,
            "chronological_centile": 50,
            "chronological_centile_band": "This height measurement is on or near the 50th centile.",
            "corrected_measurement_error": null,
            "chronological_measurement_error": null,
            "corrected_percentage_median_bmi": null,
            "chronological_percentage_median_bmi": null
        },
        "plottable_data": {
            "centile_data": {
                "chronological_decimal_age_data": {
                    "x": 0.49828884325804246,
                    "y": 65.7,
                    "b": null,
                    "events_text": null,
                    "bone_age_label": null,
                    "observation_error": null,
                    "age_type": "chronological_age",
                    "calendar_age": "5 months, 4 weeks and 1 day",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born Term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
                    "observation_value_error": null
                },
                "corrected_decimal_age_data": {
                    "x": 0.49828884325804246,
                    "y": 65.7,
                    "b": null,
                    "events_text": null,
                    "bone_age_label": "SDS: None, Centile: None",
                    "observation_error": null,
                    "age_type": "corrected_age",
                    "corrected_gestational_age": "",
                    "calendar_age": "5 months, 4 weeks and 1 day",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born at term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
                    "observation_value_error": null
                }
            },
            "sds_data": {
                "chronological_decimal_age_data": {
                    "x": 0.49828884325804246,
                    "y": 0.0009045032170827941,
                    "b": null,
                    "bone_age_label": "SDS: None, Centile: None",
                    "age_type": "chronological_age",
                    "calendar_age": "5 months, 4 weeks and 1 day",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born Term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
                    "observation_value_error": null
                },
                "corrected_decimal_age_data": {
                    "x": 0.49828884325804246,
                    "y": 0.0009045032170827941,
                    "b": null,
                    "bone_age_label": "SDS: None, Centile: None",
                    "age_type": "corrected_age",
                    "corrected_gestational_age": "",
                    "calendar_age": "5 months, 4 weeks and 1 day",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born at term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
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
    },
    {
        "birth_data": {
            "birth_date": "1759-04-11T00:00:00",
            "gestation_weeks": 40,
            "gestation_days": 0,
            "estimated_date_delivery": "1759-04-11T00:00:00",
            "estimated_date_delivery_string": "Wed 11 April, 1759",
            "sex": "female"
        },
        "measurement_dates": {
            "observation_date": "1760-01-09T22:30:00",
            "chronological_decimal_age": 0.7474332648870636,
            "corrected_decimal_age": 0.7474332648870636,
            "chronological_calendar_age": "8 months, 4 weeks and 1 day",
            "corrected_calendar_age": "8 months, 4 weeks and 1 day",
            "corrected_gestational_age": {
                "corrected_gestation_weeks": null,
                "corrected_gestation_days": null
            },
            "comments": {
                "clinician_corrected_decimal_age_comment": "Born at term. No correction has been made for gestation.",
                "lay_corrected_decimal_age_comment": "Your baby was born on their due date.",
                "clinician_chronological_decimal_age_comment": "Born Term. No correction has been made for gestation.",
                "lay_chronological_decimal_age_comment": "Your baby was born on their due date."
            },
            "corrected_decimal_age_error": null,
            "chronological_decimal_age_error": null
        },
        "child_observation_value": {
            "measurement_method": "height",
            "observation_value": 70.1,
            "observation_value_error": null
        },
        "measurement_calculated_values": {
            "corrected_sds": -0.0006082947536528116,
            "corrected_centile": 49,
            "corrected_centile_band": "This height measurement is on or near the 50th centile.",
            "chronological_sds": -0.0006082947536528116,
            "chronological_centile": 49,
            "chronological_centile_band": "This height measurement is on or near the 50th centile.",
            "corrected_measurement_error": null,
            "chronological_measurement_error": null,
            "corrected_percentage_median_bmi": null,
            "chronological_percentage_median_bmi": null
        },
        "plottable_data": {
            "centile_data": {
                "chronological_decimal_age_data": {
                    "x": 0.7474332648870636,
                    "y": 70.1,
                    "b": null,
                    "events_text": null,
                    "bone_age_label": null,
                    "observation_error": null,
                    "age_type": "chronological_age",
                    "calendar_age": "8 months, 4 weeks and 1 day",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born Term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
                    "observation_value_error": null
                },
                "corrected_decimal_age_data": {
                    "x": 0.7474332648870636,
                    "y": 70.1,
                    "b": null,
                    "events_text": null,
                    "bone_age_label": "SDS: None, Centile: None",
                    "observation_error": null,
                    "age_type": "corrected_age",
                    "corrected_gestational_age": "",
                    "calendar_age": "8 months, 4 weeks and 1 day",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born at term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
                    "observation_value_error": null
                }
            },
            "sds_data": {
                "chronological_decimal_age_data": {
                    "x": 0.7474332648870636,
                    "y": -0.0006082947536528116,
                    "b": null,
                    "bone_age_label": "SDS: None, Centile: None",
                    "age_type": "chronological_age",
                    "calendar_age": "8 months, 4 weeks and 1 day",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born Term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
                    "observation_value_error": null
                },
                "corrected_decimal_age_data": {
                    "x": 0.7474332648870636,
                    "y": -0.0006082947536528116,
                    "b": null,
                    "bone_age_label": "SDS: None, Centile: None",
                    "age_type": "corrected_age",
                    "corrected_gestational_age": "",
                    "calendar_age": "8 months, 4 weeks and 1 day",
                    "lay_comment": "Your baby was born on their due date.",
                    "clinician_comment": "Born at term. No correction has been made for gestation.",
                    "age_error": null,
                    "centile_band": "This height measurement is on or near the 50th centile.",
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

*/
