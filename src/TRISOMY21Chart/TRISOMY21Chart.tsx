// libraries/frameworks
import React, {useState} from "react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel, createContainer, VictoryZoomContainerProps, VictoryVoronoiContainerProps } from 'victory'

// props / interfaces
import { TRISOMY21ChartProps } from "./TRISOMY21Chart.types";
import { PlottableMeasurement } from "../interfaces/RCPCHMeasurementObject";
import { ICentile } from '../interfaces/CentilesObject';

// components
import { XPoint } from '../SubComponents/XPoint';
import { ChartCircle } from '../SubComponents/ChartCircle';
import { MonthsLabel } from '../SubComponents/MonthsLabel'

// helper functions
import { stndth } from '../functions/suffix';
import { removeCorrectedAge } from '../functions/removeCorrectedAge';
import { yAxisLabel } from '../functions/yAxisLabel';
import { measurementSuffix } from '../functions/measurementSuffix';
import { setTermDomainsForMeasurementMethod } from '../functions/setTermDomainsForMeasurementMethod';
import { xTickCount } from '../functions/xTickCount';

// style sheets
import "./TRISOMY21Chart.scss";

const VictoryZoomVoronoiContainer = createContainer<VictoryZoomContainerProps, VictoryVoronoiContainerProps>("zoom","voronoi");// allows two top level containers: zoom and voronoi

const TRISOMY21Chart: React.FC<TRISOMY21ChartProps> = ({ 
                title,
                subtitle,
                measurementMethod,
                sex,
                allMeasurementPairs,
                chartStyle,
                axisStyle,
                gridlineStyle,
                centileStyle,
                measurementStyle,
                centileData,
                setTrisomy21Domains,
                domains
 }) => {

  const getEntireYDomain = setTermDomainsForMeasurementMethod(measurementMethod, domains.x[1], 'trisomy-21')

   return (
    <div data-testid="TRISOMY21Chart" className="foo-bar">
      
      <VictoryChart
        width={chartStyle.width}
        height={chartStyle.height}
        style={{
          background: {
            fill: chartStyle.backgroundColour
          }
        }}
        domain={{x: [domains.x[0]-1,domains.x[1]+1], y: getEntireYDomain}}
        minDomain={0}
        maxDomain={20}
        containerComponent={
            <VictoryZoomVoronoiContainer 
              labels={({ datum }) => { // tooltip labels
                if (datum.l){
                  return `${stndth(datum.l)} centile`
                } 
                if (datum.centile_band || datum.observation_value_error || datum.measurement_error) { // these are the measurement points
                  // this is a measurement

                  /// errors 
                if (datum.measurement_error !== null){
                  
                  // usually requests where there is no reference data
                  if (datum.age_type==="corrected_age"){
                    const finalCorrectedString = datum.lay_corrected_decimal_age_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n')
                    return "Corrected age: " + datum.corrected_gestation_weeks + "+" + datum.corrected_gestation_days +' weeks gestation\n' + finalCorrectedString + "\n" + datum.y + measurementSuffix(measurementMethod) + '\n' + datum.measurement_error
                  } else {
                    let finalChronologicalString = datum.lay_chronological_decimal_age_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n')
                      return "Actual age: " + datum.calendar_age + "\n" + finalChronologicalString + "\n" + datum.y + measurementSuffix(measurementMethod) + '\n' + datum.measurement_error
                  }
                }

                if (datum.observation_value_error !== null){
                  // usually errors where impossible weights/heights etc
                  if (datum.age_type==="corrected_age"){
                    const finalCorrectedString = datum.lay_corrected_decimal_age_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n')
                    return "Corrected age: " + datum.corrected_gestation_weeks + "+" + datum.corrected_gestation_days +' weeks gestation\n' + finalCorrectedString + "\n" + datum.y + measurementSuffix(measurementMethod) + '\n' + datum.observation_value_error
                  } else {
                    let finalChronologicalString = datum.lay_chronological_decimal_age_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n')
                      return "Actual age: " + datum.calendar_age + "\n" + finalChronologicalString + "\n" + datum.y + measurementSuffix(measurementMethod) + '\n' + datum.observation_value_error
                  }
                }
                  // measurement data points
                  if (datum.x <= 0.0383){ // <= 42 weeks
                    
                    // the datum.lay_decimal_age_comment and datum.clinician_decimal_age_comment are long strings
                    // this adds new lines to ends of sentences or commas.
                    
                    if (datum.age_type==="corrected_age"){
                      
                      if (datum.measurement_error != null){
                        return `${datum.corrected_measurement_error}`
                      }

                      const finalCorrectedString = datum.lay_corrected_decimal_age_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n')
                      return "Corrected age: " + datum.corrected_gestation_weeks + "+" + datum.corrected_gestation_days +' weeks gestation\n' + finalCorrectedString + "\n" + datum.y + measurementSuffix(measurementMethod) + '\n' + datum.centile_band
                    } else {

                      if (datum.measurement_error != null){
                        return `${datum.chronological_measurement_error}`
                      }

                      let finalChronologicalString = datum.lay_chronological_decimal_age_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n')
                      return "Actual age: " + datum.calendar_age + "\n" + finalChronologicalString + "\n" + datum.y + measurementSuffix(measurementMethod) + '\n' + datum.centile_band
                    }
                  } else {

                    if (datum.corrected_measurement_error){
                      return `${datum.chronological_measurement_error}`
                    }

                    if (datum.age_type==="corrected_age"){
                      const finalCorrectedString = datum.lay_corrected_decimal_age_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n')
                      return "Corrected age: " + datum.calendar_age +'\n' + finalCorrectedString + '\n' + datum.y + measurementSuffix(measurementMethod) + '\n' + datum.centile_band
                    }
                    let finalChronologicalString = datum.lay_chronological_decimal_age_comment.replaceAll(', ', ',\n').replaceAll('. ', '.\n')
                    return "Actual age: " + datum.calendar_age +'\n' + finalChronologicalString + "\n" + datum.y + measurementSuffix(measurementMethod) + '\n' + datum.centile_band
                  }
                }
                if (datum.l){ // these are the centile lines
                  return `${stndth(datum.l)} centile`
                } 
              }}
              labelComponent={
                <VictoryTooltip
                  constrainToVisibleArea
                  
                  pointerLength={5}
                  cornerRadius={0}
                  flyoutStyle={{
                    stroke: chartStyle.tooltipBackgroundColour,
                    fill: chartStyle.tooltipBackgroundColour,
                  }}
                  style={{
                    textAnchor:"start",
                    stroke: chartStyle.tooltipTextColour,
                    fill: chartStyle.tooltipTextColour,
                    fontFamily: 'Montserrat',
                    fontSize:10,
                    strokeWidth: 0.25
                  }}
                />
              }
              voronoiBlacklist={['linkLine']}
              // voronoiBlacklist hides the duplicate tooltip text from the line joining the dots
              onZoomDomainChange={
                (domain, props)=> {
                  let upperXDomain = domain.x[1] as number
                          let lowerXDomain = domain.x[0] as number
                          let upperYDomain = domain.y[1] as number
                          let lowerYDomain = domain.y[0] as number
                          if (lowerXDomain < 0){
                            lowerXDomain=0
                          }
                          if (upperXDomain > 20){
                            upperXDomain = 20
                          }
                        setTrisomy21Domains([lowerXDomain, upperXDomain], [lowerYDomain, upperYDomain]) // this is a callback function to the parent RCPCHChart component which holds state
                }
              }
              allowPan={true}
            />
        }
        >
        {/* the legend postion must be hard coded. It automatically reproduces and labels each series - this is hidden with data: fill: "transparent" */}
        <VictoryLegend
                title={[title, subtitle]}
                centerTitle
                titleOrientation="top"
                orientation="horizontal"
                style={{ data: { fill: "transparent" } }}
                x={chartStyle.width/2-50}
                y={0}
                data={[]}
        />
        {  
          <VictoryAxis // this is the y axis
            label={yAxisLabel(measurementMethod)}
            style= {{
              axis: {
                stroke: axisStyle.axisStroke,
                strokeWidth: 1.0
              },
              axisLabel: {
                fontSize: axisStyle.axisLabelSize, 
                padding: 20,
                color: axisStyle.axisLabelColour,
                fontFamily: axisStyle.axisLabelFont
              },
              ticks: {
                stroke: axisStyle.axisLabelColour
              },
              tickLabels: {
                fontSize: axisStyle.tickLabelSize, 
                padding: 5,
                color: axisStyle.axisLabelColour,
                fontFamily: axisStyle.axisLabelColour
              },
              grid: { 
                stroke: gridlineStyle.gridlines ? gridlineStyle.stroke : null, 
                strokeWidth: ({t})=> t % 5 === 0 ? gridlineStyle.strokeWidth + 0.5 : gridlineStyle.strokeWidth,
                strokeDasharray: gridlineStyle.dashed ? '5 5' : ''
              }}}
            dependentAxis />   
        }

        {/* Render the x axes - there are 3: one for years, one for months, one for weeks*/}
              {/* Preterm babies are plotted in a separate chart. */}
              {/* Months are rendered with lollipop ticks, a custom component */}

                {/* X axis in Years  - rendered if there are  plotted child measurements and the max value is > 2y, or no measurements supplied */}
                {  (domains.x[1] > 2 || (allMeasurementPairs.length > 0 ? allMeasurementPairs[allMeasurementPairs.length-1][0]["x"]> 2 : false)) && //render years x axis only if upper domain > 2 or highest supplied measurement > 2y
                    <VictoryAxis
                      minDomain={0}
                      label="Age (years)"
                      style={{
                        axis: {
                          stroke: axisStyle.axisStroke,
                        },
                        axisLabel: {
                          fontSize: axisStyle.axisLabelSize, 
                          padding: 20,
                          color: axisStyle.axisStroke,
                          fontFamily: axisStyle.axisLabelFont
                        },
                        ticks: {
                          stroke: axisStyle.axisStroke 
                        },
                        tickLabels: {
                          fontSize: axisStyle.tickLabelSize, 
                          padding: 5,
                          color: axisStyle.axisLabelColour
                        },
                        grid: { 
                          stroke: ()=> gridlineStyle.gridlines ? gridlineStyle.stroke : null,
                          strokeWidth: gridlineStyle.strokeWidth,
                          strokeDasharray: gridlineStyle.dashed ? '5 5' : null
                        }
                      }}
                      tickLabelComponent={
                        <VictoryLabel 
                          dy={0}
                          style={[
                            { fill: axisStyle.axisStroke, 
                              fontSize: axisStyle.axisLabelSize,
                              fontFamily: axisStyle.axisLabelFont
                            },
                          ]}
                        />
                      }
                      tickCount={xTickCount(domains.x[0], domains.x[1], "years")}
                      tickFormat={(t)=> Math.round(t)}
                    /> 
              }

              {/* X axis in Months - rendered if child measurements exist and the max age < 2 but > 2 weeks */}

              {  (domains.x[1] <= 2) &&
                  <VictoryAxis
                      minDomain={0}
                      label="months"
                      axisLabelComponent={
                        <MonthsLabel 
                          style={{
                            fontFamily: axisStyle.axisLabelFont,
                            fontSize: axisStyle.axisLabelSize
                          }}
                        />
                      }
                      style={{
                        axis: {
                          stroke: axisStyle.axisStroke,
                        },
                        axisLabel: {
                          fontSize: axisStyle.axisLabelSize, 
                          padding: 20,
                          color: axisStyle.axisStroke,
                          fontFamily: axisStyle.axisLabelFont
                        },
                        ticks: {
                          stroke: axisStyle.axisStroke,
                        },
                        tickLabels: {
                          fontSize: axisStyle.tickLabelSize, 
                          padding: 5,
                          color: axisStyle.axisLabelColour
                        },
                        grid: { 
                          stroke: ()=> gridlineStyle.gridlines ? gridlineStyle.stroke : null,
                          strokeWidth: gridlineStyle.strokeWidth,
                          strokeDasharray: gridlineStyle.dashed ? '5 5' : null
                        }
                      }}
                      tickLabelComponent={
                        <ChartCircle style={{
                          stroke: axisStyle.axisLabelColour
                        }}/>
                      }
                      tickValues={[0, 0.083333, 0.166666, 0.249999, 0.333332, 0.416665, 0.499998, 0.583331, 0.666664, 0.749997, 0.83333, 0.916663, 0.999996, 1.083329, 1.166662, 1.249995, 1.333328, 1.416661, 1.499994, 1.583327, 1.66666, 1.749993, 1.833326, 1.916659, 1.999992]}
                      tickCount={12}
                      tickFormat={(t)=> {
                        if(Math.round(t*12)%2===0){
                          return Math.round(t*12)
                        } else {
                          return ''
                        } }}
                  /> }

              {/* X axis in Weeks only: rendered if upper x domain of chart is <=2y */}
                {  (domains.x[0] >= 0 && domains.x[1] <= 2) &&
                    <VictoryAxis
                      label="Age (weeks)"
                      minDomain={0}
                      style={{
                        axis: {
                          stroke: axisStyle.axisStroke,
                        },
                        axisLabel: {
                          fontSize: axisStyle.axisLabelSize, 
                          padding: 20,
                          color: axisStyle.axisStroke,
                          fontFamily: axisStyle.axisLabelFont
                        },
                        ticks: {
                          stroke: axisStyle.axisStroke 
                        },
                        tickLabels: {
                          fontSize: axisStyle.tickLabelSize, 
                          padding: 5,
                          color: axisStyle.axisLabelColour
                        },
                        grid: { 
                          stroke: ()=> gridlineStyle.gridlines ? gridlineStyle.stroke : null,
                          strokeWidth: gridlineStyle.strokeWidth,
                          strokeDasharray: gridlineStyle.dashed ? '5 5' : null
                        }
                      }}
                      tickLabelComponent={
                        <VictoryLabel 
                          dy={0}
                          style={[
                            { fill: axisStyle.axisLabelColour, 
                              fontSize: axisStyle.tickLabelSize,
                              fontFamily: axisStyle.axisLabelFont
                            },
                          ]}
                        />
                      }
                      tickValues={[0, 0.03846, 0.07692, 0.11538, 0.15384, 0.1923, 0.23076, 0.26922, 0.30768, 0.34614, 0.3846, 0.42306, 0.46152, 0.49998, 0.53844, 0.5769, 0.61536, 0.65382, 0.69228, 0.73074, 0.7692, 0.80766, 0.84612, 0.88458, 0.92304, 0.9615, 0.99996, 1.03842, 1.07688, 1.11534, 1.1538, 1.19226, 1.23072, 1.26918, 1.30764, 1.3461, 1.38456, 1.42302, 1.46148, 1.49994, 1.5384, 1.57686, 1.61532, 1.65378, 1.69224, 1.7307, 1.76916, 1.80762, 1.84608, 1.88454, 1.923, 1.96146, 1.99992]}
                      tickFormat={(t)=> Math.round(t*52)%2===0 ? Math.round(t*52) : ''}
                    /> 
                }

        {/* Render the centiles - loop through the data set, create a line for each centile */}  
        { centileData.map((centile:ICentile, centileIndex: number)=>{
          if (centileIndex %2 === 0){
            return ( //even centile index - dashed centile
                <VictoryLine
                  key={centile.centile + '-' + centileIndex}
                  data={centile.data}
                  style={{
                    data: {
                        stroke: centileStyle.centileStroke,
                        strokeWidth: centileStyle.centileStrokeWidth,
                        strokeLinecap: 'round',
                        strokeDasharray: '5 5'
                    }
                  }}
                />)
              
          } else { // uneven index - centile is continuous
              return  (
                
                <VictoryLine
                    key={centile.centile + '-' + centileIndex}
                    data={centile.data}
                    style={{
                      data: {
                          stroke: centileStyle.centileStroke,
                          strokeWidth: centileStyle.centileStrokeWidth,
                          strokeLinecap: 'round'
                      }
                    }}
                />)
          }
        })}

              {/* create a series for each child measurements datapoint: a circle for chronological age, a cross for corrected - if the chronological and corrected age are the same, */}
              {/* the removeCorrectedAge function removes the corrected age to prevent plotting a circle on a cross, and having duplicate */}
              {/* text in the tool tip */}
              { allMeasurementPairs.map((measurementPair: [PlottableMeasurement,PlottableMeasurement], index) => {
                
                let match=false
                if(measurementPair.length > 1){
                  
                  const first = measurementPair[0]
                  const second = measurementPair[1]
                  match = first.x===second.x
                } else {
                  match=true
                }
                return (
                    <VictoryGroup
                      key={'measurement'+index}
                    >
                      { match  ?
                      
                          <VictoryScatter
                            data={measurementPair.length > 1 ? removeCorrectedAge(measurementPair) : measurementPair}
                            symbol={ measurementStyle.measurementShape }
                            style={{ data: { fill: measurementStyle.measurementFill } }}
                            name='same_age' 
                          />

                        :

                        <VictoryScatter 
                            data={measurementPair}
                            dataComponent={<XPoint/>}
                          style={{ data: 
                            { fill: measurementStyle.measurementFill } 
                          }}
                          name= 'split_age'
                        />
                          }

                      <VictoryLine
                        name="linkLine"
                        style={{ 
                          data: { stroke: measurementStyle.measurementFill, strokeWidth: 1.25 },
                        }}
                        data={measurementPair}
                      />
                    </VictoryGroup>
                  )
              })}
              </VictoryChart>
    </div>)};

export default TRISOMY21Chart;

