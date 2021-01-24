// libraries/frameworks
import React from "react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryLegend, VictoryAxis, VictoryLabel } from 'victory'

// props/interfaces
import { TURNERChartProps } from "./TURNERChart.types";
import { PlottableMeasurement } from '../interfaces/RCPCHMeasurementObject';

// components
import { XPoint } from '../SubComponents/XPoint';
import { ChartCircle } from '../SubComponents/ChartCircle';
 
// helper functions
import { stndth } from '../functions/suffix'
import { removeCorrectedAge } from '../functions/removeCorrectedAge';
import { retrieveTurnerData } from "../functions/retrieveTurnerData";

// style sheets
import "./TURNERChart.scss";
import { yAxisLabel } from "../functions/yAxisLabel";

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
          background: { fill: chartStyle.backgroundColour }
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
                    stroke: centileStyle.centileStroke,
                    strokeWidth: centileStyle.centileStrokeWidth,
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
                      stroke: centileStyle.centileStroke,
                    strokeWidth: centileStyle.centileStrokeWidth,
                      strokeLinecap: 'round'
                    }
                  }}
                  />
                  )
                }
              })}
        </VictoryGroup>
        
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
);

export default TURNERChart;

