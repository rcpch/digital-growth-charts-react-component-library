// packages/libraries
import React, { useState, useEffect } from "react";

// props and interfaces
import { RCPCHChartProps } from "./RCPCHChart.types";
import { Domains } from "../interfaces/Domains";
import { Measurement } from '../interfaces/RCPCHMeasurementObject';

// style sheets
import "./RCPCHChart.scss";

// components
import UKWHOChart from "../UKWHOChart";
import TurnerChart from '../TURNERChart';
import Trisomy21Chart from '../TRISOMY21Chart';

// helper functions
import { fetchUKWHOData } from '../functions/fetchUKWHOData';
import { setTermDomainsForMeasurementMethod } from "../functions/setTermDomainsForMeasurementMethod";
import { setYDomainsForMeasurement } from "../functions/setYDomainsForMeasurement";
import { fetchTrisomy21Data } from '../functions/fetchTrisomy21Data';
import { fetchTurnerData } from '../functions/fetchTurnerData';
import { loadPartialConfig } from "@babel/core";

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
    
    // set state
    const [childMeasurements, setChildMeasurements] = useState(measurementsArray)
    const yDomains = setTermDomainsForMeasurementMethod(measurementMethod, 0, 20, reference)
    const [isLoading, setLoading] = useState(true)
    const [domains, setDomains] = useState<Domains | undefined>({x:[0,20], y:yDomains}) // set the limits of the chart
    const [isPreterm, setPreterm] = useState(false) 
    const [centileData, setCentileData] = useState([])
    
    // set domain thresholds and flags
    let lowerAgeX = 0
    let upperAgeX = 20
    let upperMeasurementY = yDomains[1]
    let lowerMeasurementY = yDomains[0]
    
    let premature = false
    let termUnderThreeMonths = false;
    console.log(measurementsArray);
    
    if (measurementsArray.length > 0){ // if there are child measurements

      // sort the measuremnents by corrected age
      const measurements: Measurement[] = measurementsArray.sort((a,b)=> a.measurement_dates.corrected_decimal_age < b.measurement_dates.corrected_decimal_age ? 1 : -1)
      
      // if there are child measurements - this sets the domains of the chart as it is initially rendered
      // the chart is rendered 2 years above the upper measurements and 2 years below the lowest.
      // this is overridden if zoom is used and the upper limits are set in the chart to updateDomains()

      
        lowerAgeX = measurements[0].measurement_dates.corrected_decimal_age
        upperAgeX = measurements[measurements.length-1].measurement_dates.corrected_decimal_age
        lowerMeasurementY = measurements[0].child_observation_value.measurement_value
        upperMeasurementY = measurements[measurements.length-1].child_observation_value.measurement_value

        premature = lowerAgeX < (((37 * 7) - (40*7)) / 365.25) // baby is premature as first measurement in array is below 37 weeks gestation
        termUnderThreeMonths = upperAgeX <= 0.25 // infant is under 3 months

      
        if (premature){
          lowerAgeX=0 // in the Prematurity chart x domains are hard coded in the chart to 23 weeks 42 weeks. Switching to childhood 0-20y are shown
          upperAgeX=20
        } else {
          if (lowerAgeX < 1 && lowerAgeX > 0){
            lowerAgeX -=0.5
            upperAgeX += 0.5
          } else {
            lowerAgeX -= 2
            upperAgeX +=2
          }
          if (lowerAgeX < 0){
            lowerAgeX = 0
          }
          if (upperAgeX > 20){
            upperAgeX = 20
          }
        }
        const newYDomains = setYDomainsForMeasurement(reference, measurementMethod, lowerMeasurementY, upperMeasurementY)

        lowerMeasurementY = newYDomains[0]
        upperMeasurementY = newYDomains[1]
      
        setPreterm(premature)
        setDomains({x:[lowerAgeX, upperAgeX], y: [lowerMeasurementY, upperMeasurementY]})

        setChildMeasurements(measurements)
    }


  useEffect(()=>{
    
    let newData //initialise the chart state
    if (reference==="trisomy-21"){
      newData = fetchTrisomy21Data(sex, measurementMethod, domains) //refresh chart data based on new domains
      setCentileData(newData); // update the state with new centile data (tailored to visible area of chart)
    }
    if (reference==="turner"){
      newData = fetchTurnerData(sex, measurementMethod, domains) //refresh chart data based on new domains
      setCentileData(newData) // update the state with new centile data (tailored to visible area of chart)
    }
    if (reference==="uk-who"){
      newData = fetchUKWHOData(sex, measurementMethod, domains) //refresh chart data based on new domains
      setCentileData(newData) // update the state with new centile data (tailored to visible area of chart)
    }
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
      if (reference==="trisomy-21"){
        newData = fetchTrisomy21Data(sex, measurementMethod, {x:[lowerXDomain, upperXDomain], y:[newLowerY, newUpperY]}) //refresh chart data based on new domains
        setCentileData(newData) // update the state with new centile data (tailored to visible area of chart)
      }
      if (reference==="turner"){
        newData = fetchTurnerData(sex, measurementMethod, {x:[lowerXDomain, upperXDomain], y:[newUpperY, newLowerY]}) //refresh chart data based on new domains
        setCentileData(newData) // update the state with new centile data (tailored to visible area of chart)
      }
      if (reference==="uk-who"){
        newData = fetchUKWHOData(sex, measurementMethod, {x:[lowerXDomain, upperXDomain], y:[newLowerY, newUpperY]}) //refresh chart data based on new domains
        // update the state with new centile data (tailored to visible area of chart)
        setCentileData(newData)
      }

      setDomains({x:[lowerXDomain, upperXDomain], y:setTermDomainsForMeasurementMethod(measurementMethod, lowerXDomain, upperXDomain, reference)}) // update the state with new domains 
    }
  
  return (
    <div
      data-testid="RCPCHChart"
    >
      
                  {/*       
                    The RCPCH chart component renders a single chart
                    Props include:
                    reference
                    measurement_method
                    sex
                    measurementsArray (this is an array of measurement objects received from the dGC API)
                    styles - there is one each for the chart, centiles, axes, gridlines and measurement points
                  */}
      
      {/* { !isLoading && centileData != null && reference === 'trisomy-21' &&
          <Trisomy21Chart
            title={title}
            subtitle={subtitle}
            allMeasurementPairs={childMeasurements}
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
          />
      }
      { !isLoading && reference === 'turner' &&  sex === "female" && measurementMethod === "height" &&
           <TurnerChart
              title={title}
              subtitle={subtitle}
              allMeasurementPairs={childMeasurements}
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
          />
      } */}
      { !isLoading && reference === 'uk-who' &&
          <UKWHOChart
            title={title}
            subtitle={subtitle}
            childMeasurements={childMeasurements}
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
            termUnderThreeMonths={termUnderThreeMonths}
          />
      }
      {
        isLoading &&
        <h1> Loading ...</h1>
      }
    </div >
  )}

export default RCPCHChart;

/*

    return object structure from API
    [
      {
    "birth_data": {
        "birth_date": "Sun, 12 Apr 2020 00:00:00 GMT",
        "estimated_date_delivery": "Sat, 06 Jun 2020 00:00:00 GMT",
        "estimated_date_delivery_string": "Sat 06 June, 2020",
        "gestation_days": 1,
        "gestation_weeks": 32,
        "sex": "male"
    },
    "child_observation_value": {
        "measurement_method": "height",
        "observation_value": 59.0,
        "observation_value_error": null
    },
    "measurement_calculated_values": {
        "chronological_centile": 61,
        "chronological_centile_band": "This height measurement is between the 50th and 75th centiles.",
        "chronological_measurement_error": null,
        "chronological_sds": 0.28069095352196843,
        "corrected_centile": 100.0,
        "corrected_centile_band": "This height measurement is above the normal range.",
        "corrected_measurement_error": null,
        "corrected_sds": 3.5133513940394825
    },
    "measurement_dates": {
        "chronological_calendar_age": "2 months",
        "chronological_decimal_age": 0.16700889801505817,
        "chronological_decimal_age_error": null,
        "comments": {
            "clinician_chronological_decimal_age_comment": "No correction has been made for gestational age.",
            "clinician_corrected_decimal_age_comment": "Correction for gestational age has been made.",
            "lay_chronological_decimal_age_comment": "This is your child's age without taking into account their gestation at birth.",
            "lay_corrected_decimal_age_comment": "Because your child was born at 32+1 weeks gestation, an adjustment has been made to take this into account."
        },
        "corrected_calendar_age": "6 days",
        "corrected_decimal_age": 0.01642710472279261,
        "corrected_decimal_age_error": null,
        "corrected_gestational_age": {
            "corrected_gestation_days": 6,
            "corrected_gestation_weeks": 40
        },
        "observation_date": "Fri, 12 Jun 2020 00:00:00 GMT"
    },
    "plottable_data": {
        "centile_data": {
            "chronological_decimal_age_data": {
                "x": 0.16700889801505817,
                "y": 59.0
            },
            "corrected_decimal_age_data": {
                "x": 0.01642710472279261,
                "y": 59.0
            }
        },
        "sds_data": {
            "chronological_decimal_age_data": {
                "x": 0.16700889801505817,
                "y": 0.28069095352196843
            },
            "corrected_decimal_age_data": {
                "x": 0.01642710472279261,
                "y": 3.5133513940394825
            }
        }
    }
}
    ]
    

*/