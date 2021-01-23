// libraries/frameworks
import React from "react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory'

// props / interfaces
import { TRISOMY21ChartProps } from "./TRISOMY21Chart.types";
import { PlottableMeasurement } from "../interfaces/RCPCHMeasurementObject";
import { ICentile } from '../interfaces/CentilesObject';

// helper functions
import { stndth } from '../functions/suffix';
import { retrieveTrisomy21Data } from '../functions/retrieveTrisomy21Data';

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
        <VictoryLegend
          title={[title, subtitle]}
          centerTitle
          gutter={20}
          titleOrientation="top"
          orientation="horizontal"
          style={{ data: { fill: "transparent" } }}
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
              return ( <VictoryGroup > 
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


        {/* Render the measurements */}
        { <VictoryGroup>
          { allMeasurementPairs.map((measurementPair: PlottableMeasurement[], index) => {
            { measurementPair.length > 1 ? (
              <VictoryGroup
                key={'measurement'+index}
              >
                <VictoryLine
                  name="linkLine"
                  style={{ 
                    data: { 
                      stroke: measurementFill,
                    },
                    parent: {
                      border: "1px solid",
                      color: measurementFill
                    }
                  }}
                  data={measurementPair}
                />
                <VictoryScatter
                  data={measurementPair}
                  symbol={measurementShape}
                  style={{ 
                    data: { 
                      fill: measurementFill 
                    } 
                  }}
                />
              </VictoryGroup>
            ) : (
              <VictoryGroup
                key={'measurement'+index}
              >
                <VictoryScatter
                  data={measurementPair}
                  style={{ 
                    data: { 
                      fill: measurementFill
                    } 
                  }}
                />
              </VictoryGroup>
            )
            }
            return 
          })}
        </VictoryGroup>}

      </VictoryChart>
    </div>
);

export default TRISOMY21Chart;

