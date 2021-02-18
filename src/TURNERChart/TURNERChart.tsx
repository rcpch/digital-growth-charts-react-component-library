// libraries/frameworks
import React from "react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel, createContainer, VictoryZoomContainerProps, VictoryVoronoiContainerProps } from 'victory';

// props/interfaces
import { TURNERChartProps } from "./TURNERChart.types";
import { PlottableMeasurement } from '../interfaces/RCPCHMeasurementObject';
import { ICentile } from '../interfaces/CentilesObject';

// components
import { XPoint } from '../SubComponents/XPoint';
 
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
                centileData,
                setTurnerDomains,
                domains
  }) => { 

  const getEntireYDomain = setTermDomainsForMeasurementMethod(measurementMethod, domains.x[1], 'turner')

  return(
    <div data-testid="TURNERChart" >
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
        <VictoryAxis // y axis
          dependentAxis
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
              color: axisStyle.axisLabelColour,
              font: axisStyle.axisLabelColour
            },
            grid: { 
              stroke: gridlineStyle.gridlines ? gridlineStyle.stroke : null, 
              strokeWidth: ({t})=> t % 5 === 0 ? gridlineStyle.strokeWidth + 0.5 : gridlineStyle.strokeWidth,
              strokeDasharray: gridlineStyle.dashed ? '5 5' : ''
            }}}
        />
        <VictoryAxis // x axis (years)
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
            axis: {stroke: "#756f6a"},
            axisLabel: {fontSize: 10, padding: 20},
            grid: {
              stroke: ({ tick }) => gridlineStyle.gridlines ? gridlineStyle.stroke : 'transparent',
              strokeWidth: gridlineStyle.strokeWidth,
              strokeDasharray: gridlineStyle.dashed ? '5 5' : ''
            },
            ticks: {stroke: axisStyle.axisStroke},
            tickLabels: {
              fontSize: 15, 
              padding: 5,
              color: axisStyle.axisLabelColour,
              font: axisStyle.axisLabelFont
            }
          }}
        />

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
    
    </div>
)};

export default TURNERChart;

