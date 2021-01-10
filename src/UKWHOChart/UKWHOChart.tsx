// Generated with util/create-component.js
import React from "react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel, VictoryTheme, VictoryArea, Point, LineSegment } from 'victory'
import ukwhoData from '../../chartdata/uk_who_chart_data'
import { stndth } from '../functions/suffix'

import { UKWHOChartProps } from "./UKWHOChart.types";
import { showChart} from '../functions/showChart'
import { showAxis} from '../functions/showAxis'

import "./UKWHOChart.scss";
import { equalIntervals, returnAxis } from "../functions/axis";
import { getWeeks } from '../functions/getWeeks'
import { removeCorrectedAge } from "../functions/removeCorrectedAge";
import { measurementSuffix } from "../functions/measurementSuffix";
import { LightenDarkenColour } from "../functions/lightenDarken";
import { testParam } from "../functions/test";
import { addAlpha } from "../functions/addAlpha";
import { yAxisTickNumber } from "../functions/yAxisTickNumber";
import { yAxisLabel } from "../functions/yAxisLabel";
import { ageThresholds } from "../functions/ageThresholds";
import { ageTickNumber } from '../functions/ageTick'

const pubertyThresholdBoys = [
  {
    x: 9,
    label: "Puberty starting before 9 years is precocious."
  },
  {
    x: 14,
    label: "Puberty is delayed if no signs are present by 14y."
  },
  {
    x: 17,
    label: "Puberty completing after 17y is delayed."
  }
]
const pubertyThresholdGirls = [
  {
    x: 8,
    label: "Puberty starting before 8 years is precocious."
  },
  {
    x: 13,
    label: "Puberty is delayed if no signs are present by 13y."
  },
  {
    x: 16,
    label: "Puberty completing after 16y is delayed."
  }
]

const delayedPubertyThreshold = (data, sex) => {
  // generates the shaded area where puberty is delayed, and adds information for the tool tip
  return data.map(dataItem =>{
    if (sex==="male"){
      if(dataItem.x >=9 && dataItem.x <=14){
        return ({...dataItem, y0: 117+(3*(dataItem.x-9)), l: "For all Children plotted in this shaded area see instructions."})
      }
      return dataItem
  } else {
    if(dataItem.x >=8.6 && dataItem.x <=13){
      return ({...dataItem, y0: 116+(3*(dataItem.x-8.6)), l: "For all Children plotted in this shaded area see instructions."})
    }
    return dataItem
  }
  });
}

const UKWHOChart: React.FC<UKWHOChartProps> = ({ 
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
    <div data-testid="UKWHOChart" className="centred">
      <VictoryChart
        animate={{
          duration: 500,
          onLoad: { duration: 500 }
        }}
        domain={ageThresholds(allMeasurementPairs)}
        containerComponent={
          <VictoryVoronoiContainer 
            labels={({ datum }) => {
              if (datum.l){
                if (datum.x === 4 && (measurementMethod==="height" || measurementMethod==="ofc")){
                  return "Transit point from UK-WHO to UK90 data."
                }
                if (datum.x === 2 && measurementMethod==="height"){
                  return "Measure length until age 2;\nMeasure height after age 2.\nA child’s height is usually slightly less than their length.\n"
                }
                if(datum.l === "For all Children plotted in this shaded area see instructions."){
                  return datum.l
                } else return `${stndth(datum.l)} centile`
              } 
              if (datum.centile_band) {
                // this is a measurement
                return datum.calendar_age +'\n' + datum.y + measurementSuffix(measurementMethod) + '\n' + datum.centile_band
              }
            }
          }
            labelComponent={
              <VictoryTooltip
                cornerRadius={0} 
                constrainToVisibleArea
                labelComponent={
                  <VictoryLabel
                    style={{
                      fontSize: 10,
                      font: axisLabelFont
                    }}
                  />
                }
              />
            }
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
        titleOrientation="top"
        orientation="horizontal"
        style={{ data: { fill: "transparent" } }}
        x={175}
        y={0}
        data={[]}
      />
      
      {/* Render the x axes */}
          {/* X axis in Years  - rendered if there are  plotted child measurements and the max value is > 2y, or no measurements supplied */}
          { ((allMeasurementPairs.length > 0 && ageThresholds(allMeasurementPairs).x[1] > 2) || (allMeasurementPairs.length< 1)) && 
              <VictoryAxis
                label="Age (years)"
                style={{
                  axis: {
                    stroke: axisStroke,
                  },
                  axisLabel: {
                    fontSize: 10, 
                    padding: 20,
                    color: axisLabelColour,
                    font: axisLabelFont
                  },
                  ticks: {
                    stroke: axisStroke 
                  },
                  tickLabels: {
                    fontSize: 6, 
                    padding: 5,
                    color: axisLabelColour
                  },
                  grid: { 
                    stroke: ()=> gridlines ? gridlineStroke : null,
                  }
                }}
                tickLabelComponent={
                  <VictoryLabel 
                    dy={0}
                    style={[
                      { fill: axisLabelColour, 
                        fontSize: 6,
                        font: axisLabelFont
                      },
                    ]}
                  />
                }
                tickValues={ageTickNumber(allMeasurementPairs, "years")}
                tickFormat={(t)=> `${returnAxis(t, "years")}`}
              /> 
        }

      {/* X axis in Months - rendered if child measurements exist and the max age < 2 but > 2 weeks */}

      { (allMeasurementPairs.length > 0 && (ageThresholds(allMeasurementPairs).x[1] <= 2 && ageThresholds(allMeasurementPairs).x[1] > 0.0383)) &&
            <VictoryAxis
                label="months"
                axisLabelComponent={<MonthsLabel />}
                style={{
                  axis: {
                    stroke: axisStroke,
                  },
                  axisLabel: { 
                    fontSize: 10, 
                    padding: 20,
                    color: axisLabelColour,
                    font: axisLabelFont
                  },
                  ticks: {
                    stroke: axisStroke 
                  },
                  tickLabels: {
                    fontSize: 6, 
                    padding: 5,
                    color: axisLabelColour
                  },
                  grid: { 
                    stroke: ()=> gridlines ? gridlineStroke : null,
                  }
                }}
                tickLabelComponent={
                  <ChartCircle style={{
                    stroke: axisStroke
                  }}/>
                }
                tickValues={ageTickNumber(allMeasurementPairs, "months")}
                tickFormat={(t)=> t * 12}
              /> }

      {/* X axis in Weeks only: rendered if there are child measurements and  < 2 years and > 2 weeks */}
          { allMeasurementPairs.length > 0 && (ageThresholds(allMeasurementPairs).x[1] < 2 && ageThresholds(allMeasurementPairs).x[1] > 0.0383) &&
              <VictoryAxis
                label="Age (weeks)"
                minDomain={0}
                style={{
                  axis: {
                    stroke: axisStroke,
                  },
                  axisLabel: {
                    fontSize: 10, 
                    padding: 20,
                    color: axisLabelColour,
                    font: axisLabelFont
                  },
                  ticks: {
                    stroke: axisStroke 
                  },
                  tickLabels: {
                    fontSize: 6, 
                    padding: 5,
                    color: axisLabelColour
                  },
                  grid: { 
                    stroke: ()=> gridlines ? gridlineStroke : null,
                  }
                }}
                tickLabelComponent={
                  <VictoryLabel 
                    dy={0}
                    style={[
                      { fill: axisLabelColour, 
                        fontSize: 6,
                        font: axisLabelFont
                      },
                    ]}
                  />
                }
                tickValues={ageTickNumber(allMeasurementPairs, "weeks")}
                tickFormat={(t)=> `${returnAxis(t, "weeks")}`}
              /> 
          }
        {/* X axis in Weeks only - preterm focus: rendered if there are child measurements and the first decimal age < 2 weeks */}
      { allMeasurementPairs.length > 0 && (ageThresholds(allMeasurementPairs).x[0] < 0.0383) && 

          <VictoryAxis
            label="Gestation (weeks)"
            style={{
              axis: {
                stroke: axisStroke,
              },
              axisLabel: {
                fontSize: 10, 
                padding: 20,
                color: axisLabelColour,
                font: axisLabelFont
              },
              ticks: {
                stroke: axisStroke 
              },
              tickLabels: {
                fontSize: 6, 
                padding: 5,
                color: axisLabelColour
              },
              grid: { 
                stroke: ()=> gridlines ? gridlineStroke : null,
              }
            }}
            tickLabelComponent={
              <VictoryLabel 
                dy={0}
                style={[
                  { fill: axisLabelColour, 
                    fontSize: 6,
                    font: axisLabelFont
                  },
                ]}
              />
            }
            tickValues={ageTickNumber(allMeasurementPairs, "pretermWeeks")}
            tickFormat={(t)=> `${returnAxis(t, "pretermWeeks")}`}
        />
      }
        
     {/* { showAxis(allMeasurementPairs, "uk90Preterm") && // preterm x axis reporting gestation
              <VictoryAxis
                label="Age (weeks)"
                style={{
                  axis: {
                    stroke: axisStroke,
                  },
                  axisLabel: {
                    fontSize: 10, 
                    padding: 20,
                    color: axisLabelColour,
                    font: axisLabelFont
                  },
                  ticks: {
                    stroke: axisStroke 
                  },
                  tickLabels: {
                    fontSize: 6, 
                    padding: 5,
                    color: axisLabelColour
                  },
                  grid: { 
                    stroke: ()=> gridlines ? gridlineStroke : null,
                  }
                }}
                tickLabelComponent={
                  <VictoryLabel 
                    dy={0}
                    style={[
                      { fill: axisLabelColour, 
                        fontSize: 6,
                        font: axisLabelFont
                      },
                    ]}
                  />
                }
                tickCount={19}
                tickFormat={(t)=> `${returnAxis(t, "pretermWeeks")}`}
              /> 
      }

      { showAxis(allMeasurementPairs, "ukwhoInfant") && // uk-who infants x axis reporting months
          <VictoryAxis
              theme={VictoryTheme.material}
              tickLabelComponent={
                  <ChartCircle style={{
                    stroke: axisStroke
                  }}/>
          
              }
              tickCount={ageTickNumber(allMeasurementPairs, "months")}
              tickFormat={(t)=> `${returnAxis(t, "months")}`}
              style={{
                axis: {stroke: axisStroke},
                ticks: {stroke: axisStroke},
                tickLabels: {
                  fontSize: 6, 
                  padding: 5,
                  color: axisLabelColour,
                  font: axisLabelFont
                },
                grid: { 
                  stroke: gridlines ? gridlineStroke : null
                }
              }}
              
            /> 
      }

      { showAxis(allMeasurementPairs, "ukwhoInfant") && // uk-who infants x axis reporting weeks
           <VictoryAxis
           label="Age (weeks)"
           theme={VictoryTheme.material}
           tickValues={getWeeks()}
           tickLabelComponent={
             <VictoryLabel 
               dy={0}
               style={[
                 { 
                   fill: axisLabelColour, 
                   fontSize: 5 
                  },
               ]}
             />
           }
           tickCount={ageTickNumber(allMeasurementPairs, "weeks")}
           tickFormat={(t)=> returnAxis(t, "weeks")} 
           style={{
             axis: {
               stroke: axisStroke
              },
             axisLabel: {
               fontSize: 10, 
               padding: 20,
               color: axisLabelColour,
               font: axisLabelFont
              },
            
             tickLabels: {fontSize: 6, padding: 5},
             grid: {
              stroke: gridlines ? gridlineStroke : null
             }
           }}
         /> 
      }

      { showAxis(allMeasurementPairs, "ukwhoChild") && // uk-who child x axis reporting months
            <VictoryAxis
            // label="Age (years)"
              theme={VictoryTheme.material}
              tickLabelComponent={
                <ChartCircle style={{
                  stroke: axisStroke
                }}/>
              }
              fixLabelOverlap
              tickFormat={(t)=> `${returnAxis(t, "years")}`}
              axisLabelComponent={
                  <VictoryLabel 
                    style={{
                      fontSize: 10,
                      padding: 20, 
                      color: axisLabelColour,
                      font: axisLabelFont
                    }}
                  />
              }
              style={{
                axis: {stroke: axisStroke},
                ticks: {
                  stroke: axisStroke
                },
                tickLabels: {
                  fontSize: 6, 
                  padding: 5, 
                  color: axisLabelColour
                },
                grid: { 
                  stroke: gridlines ? gridlineStroke : null
                }
              }}
            />
      }

      { showAxis(allMeasurementPairs, "ukwhoChild") && // uk-who child x axis reporting months
          <VictoryAxis
          label="Age (mths)"
          theme={VictoryTheme.material}
          orientation="bottom"
          tickLabelComponent={
            <VictoryLabel 
              dy={0}
              style={[
                { fill: axisLabelColour, 
                  fontSize: 10,
                  font: axisLabelFont
                },
              ]}
            />
          }
          tickCount={ageTickNumber(allMeasurementPairs, "months")}
          tickFormat={(t)=> `${returnAxis(t, "months")}`}
          style={{
            axis: {
              stroke: axisStroke
            },
            axisLabel: {
              fontSize: 10, 
              padding: 20,
              color: axisLabelColour,
              font: axisLabelFont
            },
            ticks: {
              stroke: axisStroke
            },
            tickLabels: {
              fontSize: 6, 
              padding: 5,
              color: axisLabelColour,
              font: axisLabelColour
            },
            grid: { 
              stroke: gridlines ? gridlineStroke : null
            }
          }}
        />
      }

      { showAxis(allMeasurementPairs, "uk90Child") && // uk90 child axis reporting years
            <VictoryAxis
              label="Age (years)"
              theme={VictoryTheme.material}
              tickLabelComponent={
                <VictoryLabel 
                  dy={0}
                  style={[
                    { fill: axisLabelColour, 
                      fontSize: 6,
                      font: axisLabelFont
                    },
                  ]}
                />
              }
              tickCount = {ageTickNumber(allMeasurementPairs, "years")} //alway have yearly intervals
              style={{
                axis: {
                  stroke: axisStroke
                },
                axisLabel: {
                  fontSize: 10, 
                  padding: 20,
                  color: axisLabelColour,
                  font: axisLabelFont
                },
                ticks: {
                  stroke: axisStroke
                },
                tickLabels: {
                  fontSize: 6, 
                  padding: 5,
                  color: axisLabelColour,
                  font: axisLabelFont
                },
                grid: {
                  stroke: ({tick})=> {
                    if(!gridlines){
                      return null
                    }
                    if (tick % 5 === 0) {
                      return LightenDarkenColour(gridlineStroke, -10)
                    }
                    return gridlineStroke
                  }
                  // strokeWidth: ({t})=> t % 5 === 0 ? gridlineStrokeWidth + 0.5 : gridlineStrokeWidth
                }
              }}
            /> 
      } */ }

      { showAxis(allMeasurementPairs, "uk90Child") && sex==="male" && measurementMethod==="height" && // puberty threshold lines boys UK90
          pubertyThresholdBoys.map((data, index)=> {
            return (
              <VictoryAxis dependentAxis
                key={index}
                label={data.label}
                axisLabelComponent = {
                  <VictoryLabel 
                    dy={30} 
                    dx={-50}
                    textAnchor="start"
                  />}
                style={{ 
                  axis: {
                    stroke: 'black',
                    strokeWidth: 1.0
                  },
                  tickLabels: 
                  { 
                    fill: "none", 
                  },
                  axisLabel: {
                    fontSize: 4,
                    color: axisLabelColour,
                    font: axisLabelFont
                  }
                }}
                axisValue={data.x}
              />
            );
          })
      }

      { showAxis(allMeasurementPairs, "uk90Child") && sex==="female" && measurementMethod==="height" && // puberty threshold lines uk90 girls
        pubertyThresholdGirls.map((data, index)=> {
          return (
            <VictoryAxis dependentAxis
              key={index}
              label={data.label}
              axisLabelComponent = {<VictoryLabel dy={30} dx={-60}/>}
              style={{ 
                axis: {
                  stroke: 'black',
                  strokeWidth: 1.0
                },
                tickLabels: 
                { 
                  fill: "none", 
                },
                axisLabel: {
                  fontSize: 4,
                  color: axisLabelColour,
                  font: axisLabelFont
                }
              }}
              axisValue={data.x}
            />
          );
        })
      }

      {/* render the y axis  - there is one for each reference*/}

     { showAxis(allMeasurementPairs, "uk90Preterm") && // y axis for uk90 preterm
        <VictoryAxis // this is the y axis
          label={yAxisLabel(measurementMethod)}
          tickCount={yAxisTickNumber("ukwhoPreterm", measurementMethod)}
          tickFormat={(t)=> t%5==0? t : null}
          style= {{
            axis: {
              stroke: axisStroke,
              strokeWidth: 1.0
            },
            axisLabel: {
              fontSize: 10, 
              padding: 20,
              color: axisLabelColour,
              font: axisLabelFont
            },
            ticks: {
              stroke: axisStroke
            },
            tickLabels: {
              fontSize: 6, 
              padding: 5,
              color: axisLabelColour,
              font: axisLabelFont
            },
            grid: { 
              stroke: gridlines ? gridlineStroke : null, 
              strokeWidth: ({t})=> t % 5 === 0 ? gridlineStrokeWidth + 0.5 : gridlineStrokeWidth,
              strokeDasharray: gridlineDashed ? '5 5' : ''
            }}}
          dependentAxis />   
      }
     { showAxis(allMeasurementPairs, "ukwhoInfant") && // y axis for uk-who infant
        <VictoryAxis // this is the y axis
          label={yAxisLabel(measurementMethod)}
          tickCount={yAxisTickNumber("ukwhoInfant", measurementMethod)}
          tickFormat={(t)=> t%5==0? t : null}
          style= {{
            axis: {
              stroke: axisStroke
            },
            axisLabel: {
              fontSize: 10, 
              padding: 20,
              color: axisLabelColour,
              font: axisLabelFont
            },
            ticks: {
              stroke: axisStroke
            },
            tickLabels: {
              fontSize: 6, 
              padding: 5,
              color: axisLabelColour,
              font: axisLabelFont
            },
            grid: { 
              stroke: ({tick})=> {
                if(!gridlines){
                  return null
                }
                if (tick % 10 === 0) {
                  return LightenDarkenColour(gridlineStroke, -10)
                }
                return gridlineStroke
              }
            }}}
          dependentAxis />   
      }

     { showAxis(allMeasurementPairs, "ukwhoChild") && // y axis for uk-who child
        <VictoryAxis // this is the y axis
          label={yAxisLabel(measurementMethod)}
          tickCount={yAxisTickNumber("ukwhoChild", measurementMethod)}
          tickFormat={(t)=> t%5==0? t : null}
          style= {{
            axis: {
              stroke: axisStroke
            },
            axisLabel: {
              fontSize: 10, 
              padding: 20,
              color: axisLabelColour,
              font: axisLabelFont
            },
            ticks: {
              stroke: axisStroke
            },
            tickLabels: {
              fontSize: 6, 
              padding: 5,
              color: axisLabelColour,
              font: axisLabelFont
            },
            grid: { 
              stroke: gridlines ? gridlineStroke : null, 
              strokeWidth: ({t})=> t % 5 === 0 ? gridlineStrokeWidth + 0.5 : gridlineStrokeWidth,
              strokeDasharray: gridlineDashed ? '5 5' : ''
            }}}
          dependentAxis />   
      }

     { showAxis(allMeasurementPairs, "uk90Child") && // y axis for uk90 child
        <VictoryAxis // this is the y axis
          label={yAxisLabel(measurementMethod)}
          tickCount={yAxisTickNumber("uk90Child", measurementMethod)}
          tickFormat={(t)=> t%5==0? t : null}
          style= {{
            axis: {
              stroke: axisStroke
            },
            axisLabel: {
              fontSize: 10, 
              padding: 20,
              color: axisLabelColour,
              font: axisLabelFont
            },
            ticks: {
              stroke: axisStroke
            },
            tickLabels: {
              fontSize: 6, 
              padding: 5,
              color: axisLabelColour,
              font: axisLabelFont
            },
            grid: { 
              stroke: (t)=> gridlines ? gridlineStroke : null,
              strokeWidth: (t)=> t % 5 === 0 ? gridlineStrokeWidth + 0.5 : gridlineStrokeWidth,
            }
          }}
          dependentAxis />   
      }

      {/* Render the centiles - loop through the data set, create a line for each centile */}  


      { showChart(allMeasurementPairs, "uk90Preterm") && // only renders if preterm

          <VictoryGroup
            name="uk90_preterm"
          >
            { measurementMethod!=="bmi" && ukwhoData.uk90_preterm[sex][measurementMethod].map((centile, index) => {
              if (index % 2 === 0) {
                return (
                  <VictoryLine
                    key={centile.data[0].l + '-' + index}
                    padding={{ top: 20, bottom: 60 }}
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
              } else {
                return (
                  <VictoryLine
                    key={centile.data[0].l + '-' + index}
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
            })}
            
          </VictoryGroup>
      }

      { showChart(allMeasurementPairs, "ukwhoInfant") &&
        <VictoryGroup
          name="uk_who_infant"
        >
          {ukwhoData.uk_who_infant[sex][measurementMethod].map((centile, index) => {
            if (index % 2 === 0) {
              return (
                <VictoryLine
                  key={centile.data[0].l + '-' + index}
                  padding={{ top: 20, bottom: 60 }}
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
            } else {
              return (
                <VictoryLine
                  key={centile.data[0].l + '-' + index}
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
          })}

        </VictoryGroup>
      }

      { showChart(allMeasurementPairs, "ukwhoChild") && 
        <VictoryGroup
          name="uk_who_child"
        >
          {ukwhoData.uk_who_child[sex][measurementMethod].map((centile, index) => {
            if (index % 2 === 0) {
              return (
                <VictoryLine
                  key={centile.data[0].l + '-' + index}
                  padding={{ top: 20, bottom: 60 }}
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
            } else {
              return (
                <VictoryLine
                  key={centile.data[0].l + '-' + index}
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
          })}

        </VictoryGroup>
      }

      { showChart(allMeasurementPairs, "uk90Child") && 
        <VictoryGroup
          name="uk90_child"
        >
          {ukwhoData.uk90_child[sex][measurementMethod].map((centile, index) => {
            if (index % 2 === 0) {
              return (
                <VictoryLine
                  key={centile.data[0].l + '-' + index}
                  padding={{ top: 20, bottom: 60 }}
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
            } else {
              return (
                <VictoryLine
                  key={centile.data[0].l + '-' + index}
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
          })}
          
        </VictoryGroup>
      }

      { showChart(allMeasurementPairs, "uk90Child") && sex==="male" && measurementMethod=="height" && //puberty delay shaded area boys

        <VictoryArea          
          data={delayedPubertyThreshold(ukwhoData.uk90_child[sex][measurementMethod][0].data, sex)}
          y0={(d)=> (d.x >= 9 && d.x <=14) ? d.y0 : null}
          style={{
            data: {
              stroke: addAlpha(centileStroke, 0.25),
              fill: addAlpha(centileStroke, 0.25),
              strokeWidth: centileStrokeWidth
            }
          }}
          name="delayed"
        />

      }

      { showChart(allMeasurementPairs, "uk90Child") && sex==="female" && measurementMethod=="height" && //puberty delay shaded area girls

        <VictoryArea          
          data={delayedPubertyThreshold(ukwhoData.uk90_child[sex][measurementMethod][0].data, sex)}
          y0={(d)=> (d.x >= 8.6 && d.x <=13) ? d.y0 : null}
          style={{
            data: {
              stroke: addAlpha(centileStroke, 0.25),
              fill: addAlpha(centileStroke, 0.25),
              strokeWidth: centileStrokeWidth
            }
          }}
          name="delayed"
        />

      }

        {/* create a series for each child measurements datapoint */}
      { allMeasurementPairs.map((measurementPair, index) => {
        const first = measurementPair[0]
        const second = measurementPair[1]
        const match = first['x']===second['x']
        
           return (
              <VictoryGroup
                key={'measurement'+index}
              >
                { match  ?
                
                    <VictoryScatter
                      data={removeCorrectedAge(measurementPair)}
                      symbol={ measurementShape}
                      // dataComponent={<XPoint/>}
                      style={{ data: { fill: measurementFill } }}
                      name='same_age' 
                    />

                  :
      
                   <VictoryScatter 
                      data={measurementPair}
                    //  symbol={({datum})=>datum.age_type==="chronological_age" ? measurementShape : 'plus'}
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

const MonthsLabel = (props) => { // lollipop tick for months as axis label
  const {x, y, text, style} = props
  return (<svg>
    <text x={x+50} y={y+7.5} textAnchor="left" fontSize={10}>{text}</text>
    <circle cx={x+40} cy={y+5} r={5} stroke="black" fill="transparent" />
    <line x1={x+40} x2={x+40} y1={y+17.5} y2={y+10} stroke="black" />
  </svg>)
}

const XPoint = (props) => { // the x for the corrected age, circle for the chronological age
  const transform = `rotate(45, ${props.x}, ${props.y})`;
  if(props.datum.age_type==="chronological_age"){
    return <Point {...props} symbol="circle" />
  } else {
    return <Point {...props} symbol="plus" transform={transform} />
  }
  
};

const ChartCircle = (props) =>{
  const {x, y, style, text} = props
  return (<svg>
    <text x={x} y={y-12.5} textAnchor="middle" fill={style.stroke} fontSize={6}>{text}</text>
    <circle cx={props.x} cy={y-15} r={5} stroke={style.stroke} fill="transparent" />
    <line x1={props.x} x2={x} y1={y} y2={y-10} stroke={style.stroke}/>
  </svg>)
}

export default UKWHOChart;