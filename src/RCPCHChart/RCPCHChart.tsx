// packages/libraries
import React, { useState, useRef, useEffect } from "react";

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
import { fetchUKWHOData } from '../functions/fetchUKWHOData';
import { setTermDomainsForMeasurementMethod } from "../functions/setTermDomainsForMeasurementMethod";
import { fetchTrisomy21Data } from '../functions/fetchTrisomy21Data';
import { fetchTurnerData } from '../functions/fetchTurnerData';

const RCPCHChart: React.FC<RCPCHChartProps> = ({ 
        title,
        subtitle,
        measurementMethod,
        reference,
        sex,
        measurementsArray,
        chartStyle,
        axisStyle,
        gridlineStyle,
        centileStyle,
        measurementStyle
}) => {
  
    let lowerAgeX = 0
    let upperAgeX = 20
    let upperMeasurementY
    let lowerMeasurementY
    let measurementScope
    if (reference==="uk-who"){
      measurementScope = setTermDomainsForMeasurementMethod(measurementMethod,upperAgeX, "uk-who") // fetch the y axis limits baed on measurement method
    }
    if (reference==="trisomy-21"){
      measurementScope = setTermDomainsForMeasurementMethod(measurementMethod,upperAgeX, "trisomy-21") // fetch the y axis limits baed on measurement method
    }
    if (reference==="turner"){
      measurementScope = setTermDomainsForMeasurementMethod(measurementMethod,upperAgeX, "turner") // fetch the y axis limits baed on measurement method
    }
    
    let premature = false
    
    upperMeasurementY = measurementScope[1] // this is the chart y upper domain
    lowerMeasurementY = measurementScope[0] // this is the chart y lower domain
    const pairs = measurementsArray as PlottableMeasurement[]
    
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
    
    const emptyArray: [PlottableMeasurement,PlottableMeasurement][] = []
    const [isPreterm, setPreterm] = useState(premature) // prematurity flag
    const [domains, setDomains] = useState<Domains | undefined>({x:[lowerAgeX,upperAgeX], y:measurementScope}) // set the limits of the chart
    const [centileData, setCentileData]=useState([])
    const [measurementPairs, setMeasurementpairs] = useState(emptyArray)

  useEffect(()=>{
    let newData //initialise the chart state
    if (reference==="uk-who"){
      newData = fetchUKWHOData(sex, measurementMethod, domains) //refresh chart data based on new domains
      setCentileData(newData) // update the state with new centile data (tailored to visible area of chart)
      
    }
    if (reference==="turner"){
      newData = fetchTurnerData(sex, measurementMethod, domains) //refresh chart data based on new domains
      setCentileData(newData) // update the state with new centile data (tailored to visible area of chart)
    }
    if (reference==="trisomy-21"){
      newData = fetchTrisomy21Data(sex, measurementMethod, domains) //refresh chart data based on new domains
      setCentileData(newData) // update the state with new centile data (tailored to visible area of chart)
    }
    setMeasurementpairs(measurementsArray)
  },[measurementsArray])

    const updateDomains = ([lowerXDomain, upperXDomain], [lowerYDomain, upperYDomain]) => { // call back from chart.tsx on domain change
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
      
      let newData
      if (reference==="uk-who"){
        newData = fetchUKWHOData(sex, measurementMethod, {x:[lowerXDomain, upperXDomain], y:[newLowerY, newUpperY]}) //refresh chart data based on new domains
        // update the state with new centile data (tailored to visible area of chart)
        setCentileData(newData)
      }
      if (reference==="turner"){
        newData = fetchTurnerData(sex, measurementMethod, {x:[lowerXDomain, upperXDomain], y:[newLowerY, newUpperY]}) //refresh chart data based on new domains
        console.log(newData[0]);
        
        setCentileData(newData) // update the state with new centile data (tailored to visible area of chart)
      }
      if (reference==="trisomy-21"){
        newData = fetchTrisomy21Data(sex, measurementMethod, {x:[lowerXDomain, upperXDomain], y:[newLowerY, newUpperY]}) //refresh chart data based on new domains
        setCentileData(newData) // update the state with new centile data (tailored to visible area of chart)
      }

      setDomains({x:[lowerXDomain, upperXDomain], y:[newLowerY, newUpperY]}) // update the state with new domains

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
      
      { reference === 'trisomy-21' &&
          <Trisomy21Chart
            title={title}
            subtitle={subtitle}
            allMeasurementPairs={measurementPairs}
            measurementMethod={measurementMethod}
            sex={sex}
            chartStyle={chartStyle}
            axisStyle={axisStyle}
            gridlineStyle={gridlineStyle}
            centileStyle={centileStyle}
            measurementStyle={measurementStyle}
            centileData={centileData}
            setTrisomy21Domains={updateDomains}
            domains={domains}
            isPreterm={isPreterm}
          />
      }
      { reference === 'turner' && sex === "female" && measurementMethod === "height" &&
           (<TurnerChart
              title={title}
              subtitle={subtitle}
              allMeasurementPairs={measurementPairs}
              measurementMethod={measurementMethod}
              sex={sex}
              chartStyle={chartStyle}
              axisStyle={axisStyle}
              gridlineStyle={gridlineStyle}
              centileStyle={centileStyle}
              measurementStyle={measurementStyle}
              centileData={centileData}
              setTurnerDomains={updateDomains}
              domains={domains}
          />) 
      }
      { reference === 'uk-who' &&
          <UKWHOChart
            title={title}
            subtitle={subtitle}
            allMeasurementPairs={measurementPairs}
            measurementMethod={measurementMethod}
            sex={sex}
            chartStyle={chartStyle}
            axisStyle={axisStyle}
            gridlineStyle={gridlineStyle}
            centileStyle={centileStyle}
            measurementStyle={measurementStyle}
            centileData={centileData}
            setUKWHODomains={updateDomains}
            domains={domains}
            isPreterm={isPreterm}
          />
      }
    </div >
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