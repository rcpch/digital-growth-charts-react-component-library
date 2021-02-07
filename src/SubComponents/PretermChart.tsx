// libraries
import React from "react"
import { VictoryChart, VictoryVoronoiContainer, VictoryTooltip,VictoryLabel, VictoryVoronoiContainerProps, VictoryZoomContainerProps, createContainer, VictoryLegend, VictoryAxis, VictoryGroup, VictoryLine, VictoryScatter, } from 'victory';

// props
import { UKWHOChartProps } from "../UKWHOChart/UKWHOChart.types"

// helper functions
import { stndth } from '../functions/suffix';
import { measurementSuffix } from '../functions/measurementSuffix';
import { removeCorrectedAge } from '../functions/removeCorrectedAge';
import { yAxisLabel } from '../functions/yAxisLabel';
import { setPretermDomainForMeasurementMethod } from '../functions/setPretermDomainForMeasurementMethod';

// interfaces
import { ICentile } from '../interfaces/CentilesObject';
import { PlottableMeasurement } from '../interfaces/RCPCHMeasurementObject';

// subcomponents
import { XPoint } from '../SubComponents/XPoint';
import { ChartCircle } from '../SubComponents/ChartCircle';
import { MonthsLabel } from '../SubComponents/MonthsLabel';

const VictoryZoomVoronoiContainer = createContainer<VictoryZoomContainerProps, VictoryVoronoiContainerProps>("zoom","voronoi");// allows two top level containers: zoom and voronoi

export const PretermChart: React.FC<UKWHOChartProps>=(
    { title,
      subtitle,
      measurementMethod,
      sex,
      allMeasurementPairs,
      chartStyle,
      axisStyle,
      gridlineStyle,
      centileStyle,
      measurementStyle,
      domains,
      centileData,
      setUKWHODomains,
      isPreterm}
)=>{
    return (
        <VictoryChart
              domain={setPretermDomainForMeasurementMethod(measurementMethod)}
              style={{
                background: {
                  fill: chartStyle.backgroundColour
                }
              }}
              // domain={{x: ageThresholds(allMeasurementPairs), y: measurementThresholds(allMeasurementPairs, measurementMethod)}}
              containerComponent={
                  <VictoryZoomVoronoiContainer 
                    labels={({ datum }) => { // tooltip labels
                      if (datum.l){
                        return `${stndth(datum.l)} centile`
                      } 
                      if (datum.centile_band) { // these are the measurement points
                        // this is a measurement
                        return datum.corrected_gestation_weeks + "+" + datum.corrected_gestation_days +'weeks gestation\n' + datum.y + measurementSuffix(measurementMethod) + '\n' + datum.centile_band
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
                          fontWeight: 200,
                          // fontSize: 8
                        }}
                      />
                    }
                    onZoomDomainChange={
                      (domain, props)=> {
                        const upperXDomain = domain.x[1] as number
                        const lowerXDomain = domain.x[0] as number
                        const upperYDomain = domain.y[1] as number
                        const lowerYDomain = domain.y[0] as number
                      setUKWHODomains([lowerXDomain, upperXDomain], [lowerYDomain, upperYDomain]) // this is a callback function to the parent RCPCHChart component which holds state
                      }
                    }
                    voronoiBlacklist={["linkLine"]}
                    // voronoiBlacklist hides the duplicate tooltip text from the line joining the dots
                  />
              }
              >
              {/* the legend postion must be hard coded. It automatically reproduces and labels each series - this is hidden with data: fill: "transparent" */}
              <VictoryLegend
                title={[title + "(prematurity)", subtitle]}
                centerTitle
                titleOrientation="top"
                orientation="horizontal"
                style={{ data: { fill: "transparent" } }}
                x={175}
                y={0}
                data={[]}
              />

              {/* Render the x axes - there are 4: one for years, one for months, one for weeks, and one for weeks of gestation  */}
              {/* Gestation weeks are only rendered for children born preterm */}
              {/* From 2 weeks to 2 years, weeks and months (as lollipops) are rendered */}
              {/* From 2 years onwards only years are plotted */}
              {/* If no measurements are plotted, the preterm data is ignored and only centiles from 2 weeks */}
              {/* to 20 years are rendered. */}
              {/* Some space either side of a measurement is calculated to create domains for the chart (upper and lower ages) */}
              {/* If more than one measurement is plotted the domain is some space below the lower measurement and some space above the upper measurement*/}
              {/* This is calculated in the function ageThresholds and ageTicks */}

              {/* X axis in Months - rendered if child measurements exist and the max age < 2 but > 2 weeks */}

              {  
                  <VictoryAxis
                      label="months"
                      axisLabelComponent={<MonthsLabel />}
                      domain={{x:[0.0383, 0.25]}}
                      style={{
                        axis: {
                          stroke: axisStyle.axisStroke,
                        },
                        ticks: {
                          stroke: axisStyle.axisStroke 
                        },
                        grid: { 
                          stroke: ()=> gridlineStyle.gridlines ? gridlineStyle.stroke : null,
                          strokeWidth: ({t})=> t % 5 === 0 ? gridlineStyle.strokeWidth + 0.5 : gridlineStyle.strokeWidth,
                        }
                      }}
                      tickLabelComponent={
                        <ChartCircle style={{
                            stroke: axisStyle.axisStroke
                          }}/>
                      }
                      tickFormat={(t)=> t > 0.0383 ? Math.round(t * 12) : ''}
                  /> }

              {/* X axis in Weeks only - preterm focus: rendered if there are child measurements and the first decimal age < 2 weeks */}
              { 
                <VictoryAxis
                  domain={{x:[-0.383, 0.0383]}}
                  label="Gestation or postnatal weeks"
                  style={{
                    axis: {
                      stroke: axisStyle.axisStroke,
                    },
                    axisLabel: {
                      fontSize: axisStyle.axisLabelSize, 
                      padding: 20,
                      color: axisStyle.axisLabelColour,
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
                      strokeWidth: ({t})=> t % 5 === 0 ? gridlineStyle.strokeWidth + 0.5 : gridlineStyle.strokeWidth,
                    }
                  }}
                  tickLabelComponent={
                    <VictoryLabel 
                      dy={0}
                      style={[
                        { fill: axisStyle.axisLabelColour, 
                          fontSize: axisStyle.axisLabelSize,
                          font: axisStyle.axisLabelFont
                        },
                      ]}
                    />
                  }
                  tickCount={32}
                  tickFormat={(t)=> t < 0.0383 ? Math.round(t*52+40) : Math.round(t*52)}
              />
              }

              
              {/* render the y axis  */}

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
                      font: axisStyle.axisLabelFont
                    },
                    ticks: {
                      stroke: axisStyle.axisLabelColour
                    },
                    tickLabels: {
                      fontSize: axisStyle.tickLabelSize, 
                      padding: 5,
                      color: axisStyle.axisStroke,
                      font: axisStyle.axisLabelFont
                    },
                    grid: { 
                      stroke: gridlineStyle.gridlines ? gridlineStyle.stroke : null, 
                      strokeWidth: ({t})=> t % 5 === 0 ? gridlineStyle.strokeWidth + 0.5 : gridlineStyle.strokeWidth,
                      strokeDasharray: gridlineStyle.dashed ? '5 5' : ''
                    }}}
                  dependentAxis />   
              }

              {/* Render the centiles - loop through the data set, create a line for each centile */}  
              {/* On the old charts the 50th centile was thicker and darker and this lead parents to believe it was therefore */}
              {/* the line their children should follow. This was a design mistake, since it does not matter which line the child is on  */}
              {/* so long as they follow it. The middle line was therefore 'deemphasised' on the newer charts. */}
              {/* For each reference data set, there are 9 centiles. The 0.4th, 9th, 50th, 91st, 99.6th are all dashed. */}
              {/* The 2nd, 25th, 75th, 98th are all continuous lines. As there are 4 datasets, this means 36 separate line series to render. */}
              {/* It is essential each centile from each reference is plotted as a series to prevent interpolation between centiles of one reference  */}
              {/* and centiles of another. The discontinuos lines reflect the transition between references and are essential */}
              {/* One final line is the VictoryArea, which represents the shaded area at the onset of puberty. Children that plot here */}
              {/* will have delayed puberty. */}
              {/* Tooltips are found in the parent element (VictoryChart). Tooltips included: */}
              {/* 1 for each centile, 1 for the shaded area, 1 at 2years to indicate children are measured standing leading */}
              {/* to a step down in height weight and bmi in the data set. There is another tool tip at 4 years to indicate transition from datasets. */}

              { centileData.map((reference, index)=>{ 
                if (reference.length > 0){
                  return (<VictoryGroup key={index}>
                    {reference.map((centile:ICentile, centileIndex: number)=>{
                      if (centileIndex % 2 === 0) { // even index - centile is dashed
                        return (
                        <VictoryLine
                            key={centile.centile + '-' + centileIndex}
                            padding={{ top: 20, bottom: 60 } }
                            data={centile.data}
                            style={{
                            data: {
                                stroke: centileStyle.centileStroke,
                                strokeWidth: centileStyle.centileStrokeWidth,
                                strokeLinecap: 'round',
                                strokeDasharray: '5 5'
                            }
                            }}
                        />
                        )
                      } else { // uneven index - centile is continuous
                          return (
                          <VictoryLine
                              key={centile.centile + '-' + centileIndex}
                              padding={{ top: 20, bottom: 60 }}
                              data={centile.data}
                              style={{
                              data: {
                                stroke: centileStyle.centileStroke,
                                strokeWidth: centileStyle.centileStrokeWidth,
                                strokeLinecap: 'round',
                              }
                              }}
                          />
                          )
                      }
                    })
                  }
                  </VictoryGroup>
                  )
                }})
              }

              {/* create a series for each child measurements datapoint: a circle for chronological age, a cross for corrected - if the chronological and corrected age are the same, */}
              {/* the removeCorrectedAge function removes the corrected age to prevent plotting a circle on a cross, and having duplicate */}
              {/* text in the tool tip */}
              { allMeasurementPairs.map((measurementPair: [PlottableMeasurement, PlottableMeasurement], index) => {
                
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
    )
}