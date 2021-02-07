// packages/libraries
import React, { useState, useEffect } from "react";

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
import { setPretermDomainForMeasurementMethod } from "../functions/setPretermDomainForMeasurementMethod";

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
    
    let premature = false

    const emptyArray: [PlottableMeasurement,PlottableMeasurement][] = []
    const [centileData, setCentileData]=useState([])
    const [measurementPairs, setMeasurementpairs] = useState(emptyArray)
    const [isLoading, setLoading] = useState(true)

    if (measurementsArray){
      // there are plottable measurements - this sets the domains of the chart as it is initially rendered
      // the chart is rendered 2 years above the upper measurements and 2 years below the lowest.
      // this is overridden if zoom is used and the upper limits are set in the chart to updateDomains()
      const pairs = measurementsArray as [PlottableMeasurement, PlottableMeasurement][]   
      if (pairs.length > 0){
        premature = pairs[0][0].x < 0
        lowerAgeX = pairs[0][0].x
        upperAgeX = pairs[pairs.length-1][0].x
        lowerMeasurementY = pairs[0][0].y
        upperMeasurementY = pairs[pairs.length-1][0].y
        if (premature){
          lowerAgeX=0 // in the Prematurity chart x domains are hard coded in the chart to 23 weeks 42 weeks. Switching to childhood 0-20y are shown
          upperAgeX=20
        } else {
          lowerAgeX -= 2
          upperAgeX +=2
          if (lowerAgeX < 0){
            lowerAgeX = 0
          }
          if (upperAgeX > 20){
            upperAgeX = 20
          }
          const yDomains = setTermDomainsForMeasurementMethod(measurementMethod, upperAgeX, reference)
          lowerMeasurementY = yDomains[0]
          upperMeasurementY = yDomains[1]
        }
      }
      
    }
    
    const [domains, setDomains] = useState<Domains | undefined>({x:[lowerAgeX,upperAgeX], y:setTermDomainsForMeasurementMethod(measurementMethod, upperAgeX, reference)}) // set the limits of the chart
    const [isPreterm, setPreterm] = useState(premature) // prematurity flag

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
    setLoading(false)
  },[measurementsArray])

    const updateDomains = ([lowerXDomain, upperXDomain], [lowerYDomain, upperYDomain]) => { // call back from chart.tsx on domain change
      let newUpperY = upperYDomain
      let newLowerY = lowerYDomain
      
      // if (lowerYDomain >= upperMeasurementY){ // the measurement is not visible
      //   newUpperY = upperYDomain
      //   newLowerY = lowerMeasurementY
      // } 
      // if (upperYDomain < upperMeasurementY){
      //   newLowerY=lowerYDomain
      //   newUpperY= upperMeasurementY-10
      // }
      
      let newData
      if (reference==="uk-who"){
        newData = fetchUKWHOData(sex, measurementMethod, {x:[lowerXDomain, upperXDomain], y:[newLowerY, newUpperY]}) //refresh chart data based on new domains
        // update the state with new centile data (tailored to visible area of chart)
        setCentileData(newData)
      }
      if (reference==="turner"){
        newData = fetchTurnerData(sex, measurementMethod, {x:[lowerXDomain, upperXDomain], y:[newUpperY, newLowerY]}) //refresh chart data based on new domains
        setCentileData(newData) // update the state with new centile data (tailored to visible area of chart)
      }
      if (reference==="trisomy-21"){
        newData = fetchTrisomy21Data(sex, measurementMethod, {x:[lowerXDomain, upperXDomain], y:[newLowerY, newUpperY]}) //refresh chart data based on new domains
        setCentileData(newData) // update the state with new centile data (tailored to visible area of chart)
      }

      setDomains({x:[lowerXDomain, upperXDomain], y:setTermDomainsForMeasurementMethod(measurementMethod, upperXDomain, reference)}) // update the state with new domains 
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
      
      { !isLoading && reference === 'trisomy-21' &&
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
      { !isLoading && reference === 'turner' && sex === "female" && measurementMethod === "height" &&
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
      { !isLoading && reference === 'uk-who' &&
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
  )}

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