// libraries/frameworks
import React, {useState} from "react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel, createContainer, VictoryZoomContainerProps, VictoryVoronoiContainerProps } from 'victory'

// props / interfaces
import { TRISOMY21ChartProps } from "./TRISOMY21Chart.types";
import { PlottableMeasurement } from "../interfaces/RCPCHMeasurementObject";
import { ICentile } from '../interfaces/CentilesObject';

// components
import { XPoint } from '../SubComponents/XPoint';
import PRETERMChart from '../PRETERMChart/PRETERMChart';
// helper functions
import { stndth } from '../functions/suffix';
import { removeCorrectedAge } from '../functions/removeCorrectedAge';
import { yAxisLabel } from '../functions/yAxisLabel';
import { measurementSuffix } from '../functions/measurementSuffix';
import { setTermDomainsForMeasurementMethod } from '../functions/setTermDomainsForMeasurementMethod';
import { setTermXDomainsByMeasurementAges } from '../functions/setTermXDomainsByMeasurementAges';

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
                domains,
                isPreterm,
                termUnderThreeMonths
 }) => {

  const getEntireYDomain = setTermDomainsForMeasurementMethod(measurementMethod, domains.x[1], 'trisomy-21')

  const [showPretermChart, setShowPretermChart] = useState(termUnderThreeMonths || isPreterm);
  let label = "Show Preterm Chart";
  if (termUnderThreeMonths || isPreterm){
    label = "Show Child Chart"
  }
  const [pretermLabel, setPretermLabel] = useState(label)
  
  const onClickShowPretermChartHandler=(event)=>{
    setShowPretermChart(!showPretermChart)
    if (showPretermChart){
      setPretermLabel("Show Preterm Chart")
    } else {
      setPretermLabel("Show Child Chart")
    }

  }
   return (
    <div data-testid="TRISOMY21Chart" className="foo-bar">
      {showPretermChart ?
          <PRETERMChart
              title={title}
              subtitle={subtitle}
              measurementMethod={measurementMethod}
              sex={sex}
              allMeasurementPairs={allMeasurementPairs}
              chartStyle={chartStyle}
              axisStyle={axisStyle}
              gridlineStyle={gridlineStyle}
              centileStyle={centileStyle}
              measurementStyle={measurementStyle}
              domains={domains}
              centileData={centileData}
              termUnderThreeMonths={termUnderThreeMonths}
          />
      :

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
            }
              
            { isPreterm &&
              <button onClick={onClickShowPretermChartHandler}>{pretermLabel}</button>
            }
    </div>)};

export default TRISOMY21Chart;

