// packages/libraries
import * as React from 'react';

import { styled } from 'styled-components';

// props and interfaces
import { RCPCHChartProps } from './RCPCHChart.types';

// components
import CentileChart from '../CentileChart';
import SDSChart from '../SDSChart/SDSChart';

// helper functions
import makeAllStyles from '../functions/makeAllStyles';
import ErrorBoundary from '../SubComponents/ErrorBoundary';
import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';
import defineNonStylePropDefaults from '../functions/defineNonStylePropDefaults';
import { nameForReference } from '../functions/nameForReference'
import { nameForMeasurementMethod } from '../functions/nameForMeasurementMethod';
import { stylesForTheme } from '../functions/stylesForTheme';


import { montserratRegular } from '../fonts/montserrat-b64';
import { montserratBold } from '../fonts/montserrat-bold-b64';
import { montserratItalic } from '../fonts/montserrat-italic-b64';

// const VERSION_LOG = '[VI]Version: {version} - built on {date}[/VI]'; 
const VERSION = '[VI]v{version}[/VI]'; // uses version injector plugin to Rollup to report package.json version

const GlobalStyle = styled.div`
  @font-face {
    font-family: 'Montserrat';
    src: url(${montserratRegular}) format('truetype'),
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Montserrat-Bold';
    src: url(${montserratBold}) format('truetype'),
    font-weight: 700;
    font-style: bold;
  }
  
  @font-face {
    font-family: 'Montserrat-Italic';
    src: url(${montserratItalic}) format('truetype'),
    font-weight: 400;
    font-style: italic;
  }

  body {
    font-family: 'Montserrat', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
}`;

const RCPCHChart: React.FC<RCPCHChartProps> = ({
    title,
    measurementMethod,
    reference,
    sex,
    measurements,
    midParentalHeightData,
    enableZoom = true,
    chartType,
    enableExport,
    exportChartCallback,
    clinicianFocus,
    theme,
    customThemeStyles,
    height,
    width,
    logoVariant = 'top',
}) => {

    clinicianFocus = defineNonStylePropDefaults('clinicianFocus', clinicianFocus);
    enableExport = defineNonStylePropDefaults('enableExport', enableExport);
    chartType = defineNonStylePropDefaults('chartType', chartType);

    // get styles for each theme
    let all_styles = stylesForTheme(theme=theme, sex=sex);

    if(customThemeStyles != undefined){
        // replace any default theme styles with custom styles if provided by user
        // custom styles must be provided in the correct format
        for (const theme_style in all_styles){
            for (const property in customThemeStyles[theme_style]){
                if(property != undefined){
                    all_styles[theme_style][property] = customThemeStyles[theme_style][property];
                }
            }
        }
    }


    // spread styles into individual objects
    const { chartStyle, axisStyle, gridlineStyle, centileStyle, sdsStyle, measurementStyle } = all_styles

    // use height and width if provided to set text size also - text in SVG does not scale with the chart so we need to adjust it
    const referenceWidth = 1000;
    const referenceHeight = 800;
    const referenceGeometricMean = Math.sqrt(referenceWidth * referenceHeight);
    let textScaleFactor = 1;
    if (height != undefined && width != undefined){
        // Calculate the geometric mean of width and height
        const geometricMean = Math.sqrt(width * height);
        // Use the geometric mean to create a scaling factor
        textScaleFactor = geometricMean / referenceGeometricMean; 
    }

    // make granular styles to pass into charts
    const styles = makeAllStyles(chartStyle, axisStyle, gridlineStyle, centileStyle, sdsStyle, measurementStyle, textScaleFactor);
    
    
    // uncomment in development
    // console.log("loading from locally...");
    


    // create subtitle from sex, reference and measurementMethod
    const subtitleReferenceMeasurementMethod = `${nameForReference(reference)} - ${nameForMeasurementMethod(measurementMethod)}`
    const subtitle = sex==="male" ? `Boys - ${subtitleReferenceMeasurementMethod}` : `Girls - ${subtitleReferenceMeasurementMethod}`
    
    let isCentile=(chartType === "centile" || chartType === undefined);

    if (isCentile){
        /* Centile charts as of 7.0.0 receive the measurements array as a different structure:
        {
            [measurementMethod]: [...],
        }
        */

        return (
            <ErrorBoundary styles={styles}>
                <GlobalStyle>
                <CentileChart
                    chartsVersion={VERSION}
                    reference={reference}
                    title={title}
                    subtitle={subtitle}
                    childMeasurements={ measurements[measurementMethod] }
                    midParentalHeightData={midParentalHeightData || {}}
                    measurementMethod={measurementMethod}
                    sex={sex}
                    enableZoom={enableZoom}
                    styles={styles}
                    height={height ?? 800}
                    width={width ?? 1000}
                    textScaleFactor={textScaleFactor}
                    enableExport={enableExport}
                    exportChartCallback={exportChartCallback}
                    clinicianFocus={clinicianFocus}
                    logoVariant={logoVariant}
                />
                </GlobalStyle>
            </ErrorBoundary>
        );
    } else {
        /* Since the SDS chart shows multiple measurement methods on a single chart, it receives the measurements array as a different structure:
        {
            height?: [],
            weight?: [],
            bmi?: [],
            ofc?: [],
        }
        */
        const castArray = measurements as ClientMeasurementObject;

        
        return (
            <ErrorBoundary styles={styles}>
                <GlobalStyle>
                <SDSChart
                    chartsVersion={VERSION}
                    reference={reference}
                    title={title}
                    subtitle={subtitle}
                    measurementMethod={measurementMethod}
                    childMeasurements={castArray}
                    midParentalHeightData={midParentalHeightData}
                    sex={sex}
                    enableZoom={enableZoom}
                    styles={styles}
                    height={height ?? 800}
                    width={width ?? 1000}
                    textScaleFactor={textScaleFactor}
                    enableExport={enableExport}
                    exportChartCallback={exportChartCallback}
                    clinicianFocus={clinicianFocus}
                />
                </GlobalStyle>
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
