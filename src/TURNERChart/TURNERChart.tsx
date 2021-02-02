// libraries/frameworks
import React from "react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel, createContainer, VictoryZoomContainerProps, VictoryVoronoiContainerProps } from 'victory';

// props/interfaces
import { TURNERChartProps } from "./TURNERChart.types";
import { PlottableMeasurement } from '../interfaces/RCPCHMeasurementObject';
import { ICentile } from '../interfaces/CentilesObject';

// components
import { XPoint } from '../SubComponents/XPoint';
import { ChartCircle } from '../SubComponents/ChartCircle';
 
// helper functions
import { stndth } from '../functions/suffix'
import { removeCorrectedAge } from '../functions/removeCorrectedAge';

// style sheets
import "./TURNERChart.scss";
import { yAxisLabel } from "../functions/yAxisLabel";
import { measurementSuffix } from '../functions/measurementSuffix';
import { setTermDomainsForMeasurementMethod } from '../functions/setTermDomainsForMeasurementMethod';
import { setTermXDomainsByMeasurementAges } from '../functions/setTermXDomainsByMeasurementAges';

const VictoryZoomVoronoiContainer = createContainer<VictoryZoomContainerProps, VictoryVoronoiContainerProps>("zoom","voronoi");// allows two top level containers: zoom and voronoi

const TURNERChart: React.FC<TURNERChartProps> = ({
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
                domains,
                centileData,
                setTurnerDomains
  }) => { 

  const getEntireYDomain = setTermDomainsForMeasurementMethod(measurementMethod, domains.x[1], 'trisomy-21')

  const getEntireXDomain= setTermXDomainsByMeasurementAges(allMeasurementPairs)

    return(

    <div data-testid="TURNERChart" className="foo-bar">
      <VictoryChart
        width={chartStyle.width}
        height={chartStyle.height}
        style={{
          background: {
            fill: chartStyle.backgroundColour
          }
        }}
        domain={{x:getEntireXDomain, y:getEntireYDomain}}
        containerComponent={
            <VictoryZoomVoronoiContainer 
              labels={({ datum }) => { // tooltip labels
                if (datum.l){
                  return `${stndth(datum.l)} centile`
                } 
                if (datum.centile_band) { // these are the measurement points
                  // this is a measurement
                  return datum.calendar_age +'\n' + datum.y + measurementSuffix(measurementMethod) + '\n' + datum.centile_band
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
              voronoiBlacklist={['linkLine']}
              // voronoiBlacklist hides the duplicate tooltip text from the line joining the dots
              onZoomDomainChange={
                (domain, props)=> {
                  const upperXDomain = domain.x[1] as number
                  const lowerXDomain = domain.x[0] as number
                  const upperYDomain = domain.y[1] as number
                  const lowerYDomain = domain.y[0] as number
                  setTurnerDomains([lowerXDomain, upperXDomain], [lowerYDomain, upperYDomain]) // this is a callback function to the parent RCPCHChart component which holds state
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
      <VictoryAxis
        label={yAxisLabel(measurementMethod)}
        tickLabelComponent={
          <VictoryLabel 
            dy={0}
            style={[
              { fill: axisStyle.axisLabelColour, fontSize: axisStyle.axisLabelSize },
            ]}
          />
        }
        style={{
          axis: {stroke: axisStyle.axisStroke},
          axisLabel: {fontSize: 10, padding: 20},
          grid: {stroke: ({ tick }) => gridlineStyle.gridlines ? gridlineStyle.stroke : 'transparent'},
          ticks: {stroke: axisStyle.axisLabelColour},
          tickLabels: {fontSize: axisStyle.tickLabelSize, padding: 5}
        }}
        dependentAxis 
      />
      <VictoryAxis
        label="Age (y)"
        tickLabelComponent={
          <VictoryLabel 
            dy={0}
            style={[
              { fill: axisStyle.axisLabelColour, fontSize: axisStyle.axisLabelSize },
            ]}
          />
        }
        style={{
          axis: {stroke: axisStyle.axisStroke},
          axisLabel: {fontSize: 10, padding: 20},
          grid: {stroke: ({ tick }) => gridlineStyle.gridlines ? gridlineStyle.stroke : 'transparent'},
          ticks: {stroke: axisStyle.axisLabelColour},
          tickLabels: {fontSize: axisStyle.tickLabelSize, padding: 5}
        }}
      />
        {/* Render the centiles - loop through the data set, create a line for each centile */}  
        
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
                                  strokeLinecap: 'round'
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
              { allMeasurementPairs !== null && allMeasurementPairs.map((measurementPair: [PlottableMeasurement, PlottableMeasurement], index) => {
                
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
    
    </div>
)};

export default TURNERChart;

