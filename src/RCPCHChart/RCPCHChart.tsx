// Generated with util/create-component.js
import React from "react";

import { RCPCHChartProps } from "./RCPCHChart.types";

import "./RCPCHChart.scss";
import UKWHOChart from "../UKWHOChart";
import TurnerChart from '../TURNERChart';
import Trisomy21Chart from '../TRISOMY21Chart';

// import { trial } from '../functions/measurements'

const RCPCHChart: React.FC<RCPCHChartProps> = ({ 
                                                title,
                                                subtitle,
                                                measurementMethod,
                                                reference,
                                                sex,
                                                measurementsArray,
                                                chartBackground,
                                                gridlineStroke,
                                                gridlineStrokeWidth,
                                                gridlineDashed,
                                                gridlines,
                                                centileStroke,
                                                centileStrokeWidth,
                                                axisStroke,
                                                axisLabelFont,
                                                axisLabelColour,
                                                measurementFill,
                                                measurementSize,
                                                measurementShape,
                                              }) => (
    <div
      data-testid="RCPCHChart"
    //   className={`test-component test-component-${theme}`}
    >
      
{/*       
      The RCPCH chart component renders a single chart
      Essential props include:
      reference
      measurement_method
      sex
      measurementsArray (this is an array of measurement objects received from the dGC API)

      
      growth data point color
      line color
      axis color
      label font
      label size
      chart background color
       */}

    
      
    <div >
      { reference === 'trisomy-21' &&
          <Trisomy21Chart
            title={title}
            subtitle={subtitle}
            allMeasurementPairs={measurementsArray}
            measurementMethod={measurementMethod}
            sex={sex}
            chartBackground={chartBackground}
            gridlineStroke={gridlineStroke}
            gridlineStrokeWidth={gridlineStrokeWidth}
            gridlineDashed={gridlineDashed}
            gridlines={gridlines}
            centileStroke={centileStroke}
            centileStrokeWidth={centileStrokeWidth}
            axisStroke={axisStroke}
            axisLabelFont={axisLabelFont}
            axisLabelColour={axisLabelColour}
            measurementFill={measurementFill}
            measurementSize={measurementSize}
            measurementShape={measurementShape}
          />
      }
      { reference === 'turner' && sex === "female" && measurementMethod === "height" &&
           (<TurnerChart
              title={title}
              subtitle={subtitle}
              allMeasurementPairs={measurementsArray}
              measurementMethod={measurementMethod}
              sex={sex}
              chartBackground={chartBackground}
              gridlineStroke={gridlineStroke}
              gridlineStrokeWidth={gridlineStrokeWidth}
              gridlineDashed={gridlineDashed}
              gridlines={gridlines}
              centileStroke={centileStroke}
              centileStrokeWidth={centileStrokeWidth}
              axisStroke={axisStroke}
              axisLabelFont={axisLabelFont}
              axisLabelColour={axisLabelColour}
              measurementFill={measurementFill}
              measurementSize={measurementSize}
              measurementShape={measurementShape}
          />) 
      }
      { reference === 'uk-who' &&
          <UKWHOChart
            title={title}
            subtitle={subtitle}
            allMeasurementPairs={measurementsArray}
            measurementMethod={measurementMethod}
            sex={sex}
            chartBackground={chartBackground}
            gridlineStroke={gridlineStroke}
            gridlineStrokeWidth={gridlineStrokeWidth}
            gridlineDashed={gridlineDashed}
            gridlines={gridlines}
            centileStroke={centileStroke}
            centileStrokeWidth={centileStrokeWidth}
            axisStroke={axisStroke}
            axisLabelFont={axisLabelFont}
            axisLabelColour={axisLabelColour}
            measurementFill={measurementFill}
            measurementSize={measurementSize}
            measurementShape={measurementShape}
          />
      }
      
      
    </div>




  
    {/* This is an example payload, triggered by the onMouseOver event crossing a child
    data point or a centile data point - this relates to the active flag.
    The first example array is on mouseover of the 99.6th centile

      [
        {
          "name": "Decimal Age",
          "unit": "",
          "value": 3.833333333,
          "payload": {
            "label": 99.6,
            "x": 3.833333333,
            "y": 113.17839846133332
          },
          "dataKey": "x"
        },
        {
          "name": "height",
          "unit": " cm",
          "value": 113.17839846133332,
          "payload": {
            "label": 99.6,
            "x": 3.833333333,
            "y": 113.17839846133332
          },
          "dataKey": "y"
        },
        {
          "name": "Centile",
          "unit": "centile",
          "value": 99.6,
          "payload": {
            "label": 99.6,
            "x": 3.833333333,
            "y": 113.17839846133332
          },
          "dataKey": "label"
        }
      ]

      This example array is of a child measurement

      [
        {
          "name": "Decimal Age",
          "unit": "",
          "value": 3.7180013689253935,
          "payload": {
            "calendar_age": "3 years, 8 months, 2 weeks and 6 days",
            "centile_band": "This height measurement is above the normal range.",
            "centile_value": 100,
            "corrected_gestation_days": null,
            "corrected_gestation_weeks": null,
            "age_type": "chronological_age",
            "x": 3.7180013689253935,
            "y": 125
          },
          "dataKey": "x"
        },
        {
          "name": "height",
          "unit": " cm",
          "value": 125,
          "payload": {
            "calendar_age": "3 years, 8 months, 2 weeks and 6 days",
            "centile_band": "This height measurement is above the normal range.",
            "centile_value": 100,
            "corrected_gestation_days": null,
            "corrected_gestation_weeks": null,
            "age_type": "chronological_age",
            "x": 3.7180013689253935,
            "y": 125
          },
          "dataKey": "y"
        },
        {
          "name": "Centile",
          "unit": "centile",
          "value": "chronological_age",
          "payload": {
            "calendar_age": "3 years, 8 months, 2 weeks and 6 days",
            "centile_band": "This height measurement is above the normal range.",
            "centile_value": 100,
            "corrected_gestation_days": null,
            "corrected_gestation_weeks": null,
            "age_type": "chronological_age",
            "x": 3.7180013689253935,
            "y": 125
          },
          "dataKey": "label"
        }
      ] */}

    </div>
  );

export default RCPCHChart;