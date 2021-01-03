// Generated with util/create-component.js
import React from "react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory'
import { TRISOMY21ChartProps } from "./TRISOMY21Chart.types";
import { stndth } from '../functions/suffix';
import { retrieveTrisomy21Data } from '../functions/retrieveTrisomy21Data';
import "./TRISOMY21Chart.scss";
import { retrieveTurnerData } from "../functions/retrieveTurnerData";

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
        
        {allMeasurementPairs.length > 0 && <VictoryGroup>
          { retrieveTrisomy21Data(measurementMethod, sex).map((measurementPair, index) => {
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

const Cross = (props) => {
  return (<svg>
    <line
      x1={props.x - 1.25}
      y1={props.y - 1.25}
      x2={props.x + 1.25}
      y2={props.y + 1.25}
      stroke='red'
      strokeWidth={2}
    />
    <line
      x1={props.x + 1.25}
      y1={props.y - 1.25}
      x2={props.x - 1.25}
      y2={props.y + 1.25}
      stroke='red'
      strokeWidth={2}
    />
  </svg>)
}

export default TRISOMY21Chart;

