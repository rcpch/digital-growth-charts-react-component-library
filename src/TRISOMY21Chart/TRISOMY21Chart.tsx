// libraries/frameworks
import React from "react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory'

// props / interfaces
import { TRISOMY21ChartProps } from "./TRISOMY21Chart.types";
import { PlottableMeasurement } from "../interfaces/RCPCHMeasurementObject";
import { ICentile } from '../interfaces/CentilesObject';

// components
import { XPoint } from '../SubComponents/XPoint';
import { ChartCircle } from '../SubComponents/ChartCircle';

// helper functions
import { stndth } from '../functions/suffix';
import { retrieveTrisomy21Data } from '../functions/retrieveTrisomy21Data';
import { removeCorrectedAge } from '../functions/removeCorrectedAge';

// style sheets
import "./TRISOMY21Chart.scss";


const TRISOMY21Chart: React.FC<TRISOMY21ChartProps> = ({ 
                title,
                subtitle,
                measurementMethod,
                sex,
                allMeasurementPairs,
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
    <div data-testid="TRISOMY21Chart" className="foo-bar">
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer 
            labels={({ datum }) => {
              if (datum.l){
               return `${stndth(datum.l)} centile`
              } 
              if (datum.centile_band) {
                return datum.centile_band
              }
            }
          }
            labelComponent={<VictoryTooltip cornerRadius={0} constrainToVisibleArea/>}
            voronoiBlacklist={["linkLine"]}
            // voronoiBlacklist hides the duplicate tooltip text from the line joining the dots
          />
        }
        style={{
          background: { fill: chartBackground }
        }}
      >
        {/* the legend postion must be hard coded. It automatically reproduces and labels each series - this is hidden with data: fill: "transparent" */}
        <VictoryLegend
                title={[title, subtitle]}
                centerTitle
                titleOrientation="top"
                orientation="horizontal"
                style={{ data: { fill: "transparent" } }}
                x={175}
                y={0}
                data={[]}
        />
        <VictoryAxis dependentAxis />
        <VictoryAxis
          label="Age (y)"
          tickLabelComponent={
            <VictoryLabel 
              dy={0}
              style={[
                { fill: axisLabelColour, fontSize: 8 },
              ]}
            />
          }
          style={{
            axis: {stroke: "#756f6a"},
            axisLabel: {fontSize: 10, padding: 20},
            grid: {
              stroke: ({ tick }) => gridlines ? gridlineStroke : 'transparent',
              strokeWidth: gridlineStrokeWidth,
              strokeDasharray: gridlineDashed ? '5 5' : ''
            },
            ticks: {stroke: axisStroke},
            tickLabels: {
              fontSize: 15, 
              padding: 5,
              color: axisLabelColour,
              font: axisLabelFont
            }
          }}
        />
        {/* Render the centiles - loop through the data set, create a line for each centile */}  
          {
            retrieveTrisomy21Data(measurementMethod, sex).map((centile:ICentile, centileIndex: number) =>{
              return ( <VictoryGroup key={centile.centile+"-"+centileIndex}> 
                { centileIndex % 2 === 0 ? // even index - centile is dashed
                     (
                    <VictoryLine
                        key={centile.centile + '-' + centileIndex}
                        padding={{ top: 20, bottom: 60 } }
                        data={centile.data}
                        style={{
                        data: {
                            stroke: centileStroke,
                            strokeWidth: centileStrokeWidth,
                            strokeLinecap: 'round',
                            strokeDasharray: '5 5'
                        }
                        }}
                    />
                    )
                  : // uneven index - centile is continuous
                       (
                      <VictoryLine
                          key={centile.centile + '-' + centileIndex}
                          padding={{ top: 20, bottom: 60 }}
                          data={centile.data}
                          style={{
                          data: {
                              stroke: centileStroke,
                              strokeWidth: centileStrokeWidth,
                              strokeLinecap: 'round'
                          }
                          }}
                      />
                      )
                  }
                
              </VictoryGroup>
              )
            })
          }


        {/* create a series for each child measurements datapoint: a circle for chronological age, a cross for corrected - if the chronological and corrected age are the same, */}
              {/* the removeCorrectedAge function removes the corrected age to prevent plotting a circle on a cross, and having duplicate */}
              {/* text in the tool tip */}
              { allMeasurementPairs.map((measurementPair: PlottableMeasurement[], index) => {
                
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
                            symbol={ measurementShape}
                            style={{ data: { fill: measurementFill } }}
                            name='same_age' 
                          />

                        :

                        <VictoryScatter 
                            data={measurementPair}
                            dataComponent={<XPoint/>}
                          style={{ data: 
                            { fill: measurementFill } 
                          }}
                          name= 'split_age'
                        />
                          }

                      <VictoryLine
                        name="linkLine"
                        style={{ 
                          data: { stroke: measurementFill, strokeWidth: 1.25 },
                        }}
                        data={measurementPair}
                      />
                    </VictoryGroup>
                  )
              })}

      </VictoryChart>
    </div>
);

export default TRISOMY21Chart;

