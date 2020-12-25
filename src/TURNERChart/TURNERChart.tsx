// Generated with util/create-component.js
import React from "react";

import { TURNERChartProps } from "./TURNERChart.types";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryLegend, VictoryAxis, VictoryLabel } from 'victory'
import { stndth } from '../functions/suffix'

import "./TURNERChart.scss";
import { retrieveTurnerData } from "../functions/retrieveTurnerData";

const TURNERChart: React.FC<TURNERChartProps> = ({
    title,
    subtitle,
    measurementMethod,
    sex,
    allMeasurementPairs,
    allSDSMeasurementPairs,
    height,
    width,
    chartBackground,
    measurementDataPointColour,
    centileColour,
  }) => (
    <div data-testid="TURNERChart" className="foo-bar">
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
      <VictoryAxis dependentAxis />
      <VictoryAxis
        label="Age (y)"
        tickLabelComponent={
          <VictoryLabel 
            dy={0}
            style={[
              { fill: "black", fontSize: 8 },
            ]}
          />
        }
        style={{
          axis: {stroke: "#756f6a"},
          axisLabel: {fontSize: 10, padding: 20},
          grid: {stroke: ({ tick }) => "grey"},
          ticks: {stroke: "grey"},
          tickLabels: {fontSize: 15, padding: 5}
        }}
      />
        {/* Render the centiles - loop through the data set, create a line for each centile */}  
        
        <VictoryGroup>
          {retrieveTurnerData(measurementMethod, sex).map((centile, index) => {
            if (index % 2 === 0) {
              return (
                <VictoryLine
                key={centile.data[0].l + '-' + index}
                padding={{ top: 20, bottom: 60 }}
                data={centile.data}
                style={{
                  data: {
                    stroke: centileColour,
                    strokeWidth: 1,
                    strokeLinecap: 'round',
                    strokeDasharray: '5 5'
                  }
                }}
                />
                )
              } else {
                return (
                  <VictoryLine
                  key={centile.data[0].l + '-' + index}
                  padding={{ top: 20, bottom: 60 }}
                  data={centile.data}
                  style={{
                    data: {
                      stroke: centileColour,
                      strokeWidth: 1,
                      strokeLinecap: 'round'
                    }
                  }}
                  />
                  )
                }
              })}
        </VictoryGroup>
        {/* create a series for each datapoint */}
        {allMeasurementPairs.length > 0 && <VictoryGroup>
          { retrieveTurnerData(measurementMethod, sex).map((measurementPair, index) => {
            { measurementPair.length > 1 ? (
              <VictoryGroup
                key={'measurement'+index}
              >
                <VictoryLine
                  name="linkLine"
                  style={{ 
                    data: { stroke: measurementDataPointColour },
                    parent: { border: "1px solid red"}
                  }}
                  data={measurementPair}
                />
                <VictoryScatter
                  data={measurementPair}
                  dataComponent={<Cross />}
                  style={{ data: { fill: measurementDataPointColour } }}
                />
              </VictoryGroup>
            ) : (
              <VictoryGroup
                key={'measurement'+index}
              >
                <VictoryScatter
                  data={measurementPair}
                  dataComponent={<Circle/>}
                  style={{ data: { fill: measurementDataPointColour } }}
                />
              </VictoryGroup>
            )
            }
            return 
          })}
        </VictoryGroup>}
        <VictoryLegend
          title={[title, subtitle]}
          centerTitle
          gutter={20}
          titleOrientation="top"
          orientation="horizontal"
          style={{ data: { fill: "transparent" } }}
          data={[]}
        />

      </VictoryChart>
    
    </div>
);

const Circle = (props) =>{
  return (<svg>
    <circle cx={props.x} cy={props.y} r={1.25} stroke='red' />
  </svg>)
}

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

export default TURNERChart;

