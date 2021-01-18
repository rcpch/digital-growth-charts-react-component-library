// Generated with util/create-component.js
import React, { useState } from "react";

import { RCPCHChartProps } from "./RCPCHChart.types";
import { Domains } from "../interfaces/Domains";

import "./RCPCHChart.scss";
import UKWHOChart from "../UKWHOChart";
import TurnerChart from '../TURNERChart';
import Trisomy21Chart from '../TRISOMY21Chart';
import { fetchData } from '../functions/fetchData'

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
}) => {
    const [domains, setDomains] = useState<Domains | undefined>({x:[0,20], y:[0,200]})
    const [ukwhoCentileData, setUKWHOCentileData] = useState(fetchData(sex, measurementMethod, domains))
    const setUKWHODomains = ([lowerXDomain, upperXDomain], [lowerYDomain, upperYDomain]) => {
      setDomains({x:[lowerXDomain, upperXDomain], y:[lowerYDomain, upperYDomain]})
      const newData = fetchData(sex, measurementMethod, {x:[lowerXDomain, upperXDomain], y:[lowerYDomain, upperYDomain]})
      setUKWHOCentileData(newData)
    }
    
    
  return (
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
            centileData={ukwhoCentileData}
            setUKWHODomains={setUKWHODomains}
            domains={domains}
          />
      }
      
      
    </div>

    </div>
  )};

export default RCPCHChart;

/*
measurementPair
[
age_type: "corrected_age"
calendar_age: "2 months, 2 weeks and 5 days"
centile_band: "This height measurement is between the 25th and 50th centiles."
centile_value: 42
corrected_gestation_days: null
corrected_gestation_weeks: null
x: 0.2190280629705681
y: 60

age_type: "chronological_age"
calendar_age: "4 months and 4 weeks"
centile_band: "This height measurement is between the 25th and 50th centiles."
centile_value: 42
corrected_gestation_days: null
corrected_gestation_weeks: null
x: 0.4106776180698152
y: 60
]

*/