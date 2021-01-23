// packages/libraries
import React, { useState } from "react";

// props and interfaces
import { RCPCHChartProps } from "./RCPCHChart.types";
import { Domains } from "../interfaces/Domains";
import { PlottableMeasurement } from '../interfaces/RCPCHMeasurementObject';

// style sheets
import "./RCPCHChart.scss";

// components
import UKWHOChart from "../UKWHOChart";
import TurnerChart from '../TURNERChart';
import Trisomy21Chart from '../TRISOMY21Chart';

// helper functions
import { fetchData } from '../functions/fetchData';
import { measurementThresholds } from '../functions/measurementThreshold';

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
    const measurementScope = measurementThresholds(measurementMethod) // fetch the y axis limits baed on measurement method
    
    let upperMeasurementY = measurementScope[1] // this is the chart y upper domain
    let lowerMeasurementY = measurementScope[0] // this is the chart y lower domain
    let lowerAgeX = 0
    let upperAgeX = 20
    const pairs = measurementsArray as PlottableMeasurement[]
    let premature = false
    
    if (pairs.length > 0){
      premature = pairs[0][0].x < 0
      lowerMeasurementY = pairs[0][0].y
      upperMeasurementY = pairs[pairs.length-1][0].y
      lowerAgeX = pairs[0][0].x
      upperAgeX = pairs[pairs.length-1][0].x

      if (lowerAgeX < 0){
        lowerAgeX = -0.383
        upperAgeX = 0.25
      }
      if (lowerAgeX >= 0 && lowerAgeX < 2){
        lowerAgeX = 0
      }
      if (lowerAgeX >= 2 && lowerAgeX <4){
        lowerAgeX = 2
      }
      if(upperAgeX >=4){
        upperAgeX = upperAgeX + 4
        if (upperAgeX > 20){
          upperAgeX=20
        }
      }
      if (upperAgeX >=2 && upperAgeX< 4){
        upperAgeX= 4
      }
      if (upperAgeX>=0 && upperAgeX <2){
        upperAgeX = 2
      }
    }
    const [isPreterm, setPreterm] = useState(premature) // prematurity flag
    const [domains, setDomains] = useState<Domains | undefined>({x:[lowerAgeX,upperAgeX], y:measurementScope}) // set the limits of the chart
    const [ukwhoCentileData, setUKWHOCentileData] = useState(fetchData(sex, measurementMethod, domains)) //fetch the centille data
    
    const setUKWHODomains = ([lowerXDomain, upperXDomain], [lowerYDomain, upperYDomain]) => { // call back from chart.tsx on domain change
      let newUpperY = upperYDomain
      let newLowerY = lowerYDomain
      
      if (lowerYDomain >= upperMeasurementY){ // the measurement is not visible
        newUpperY = upperYDomain
        newLowerY = lowerMeasurementY
      } 
      if (upperYDomain < upperMeasurementY){
        newLowerY=lowerYDomain
        newUpperY= upperMeasurementY-10
      }

      setDomains({x:[lowerXDomain, upperXDomain], y:[newLowerY, newUpperY]}) // update the state with new domains

      const newData = fetchData(sex, measurementMethod, {x:[lowerXDomain, upperXDomain], y:[newLowerY, newUpperY]}) //refresh chart data based on new domains
      setUKWHOCentileData(newData) // update the state with new centile data (tailored to visible area of chart)
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
            isPreterm={isPreterm}
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