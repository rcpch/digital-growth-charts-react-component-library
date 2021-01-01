// Generated with util/create-component.js
import React from "react";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip, VictoryAxis, VictoryLegend, VictoryLabel, VictoryTheme } from 'victory'
import ukwhoData from '../../chartdata/uk_who_chart_data'
// import PlotPoint from '../PlotPoint'
import { stndth } from '../functions/suffix'
// import { trial } from '../functions/measurements'

import { UKWHOChartProps } from "./UKWHOChart.types";
import { showChart} from '../functions/showChart'
import { showAxis} from '../functions/showAxis'

import "./UKWHOChart.scss";
import { returnAxis } from "../functions/axis";
import { getWeeks } from '../functions/getWeeks'
import { removeCorrectedAge } from "../functions/removeCorrectedAge";
import { measurementSuffix } from "../functions/measurementSuffix";

const UKWHOChart: React.FC<UKWHOChartProps> = ({ 
    title,
    subtitle,
    measurementMethod,
    sex,
    height,
    width,
    allMeasurementPairs,
    allSDSMeasurementPairs,
    chartBackground,
    centileColour,
    measurementDataPointColour,
 }) => (
    <div data-testid="UKWHOChart" className="centred">
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer 
            labels={({ datum }) => {
              if (datum.l){
               return `${stndth(datum.l)} centile`
              } 
              if (datum.centile_band) {
                // this is a measurement
                return datum.calendar_age +'\n' + datum.y + measurementSuffix(measurementMethod) + '\n' + datum.centile_band
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
        titleOrientation="top"
        orientation="horizontal"
        style={{ data: { fill: "transparent" } }}
        x={175}
        y={0}
        data={[]}
      />
      
      {/* Render the x axes */}

      { showAxis(allMeasurementPairs, "uk90Preterm") && // preterm x axis reporting gestation
              <VictoryAxis
                label="Age (weeks)"
                style={{
                  axis: {stroke: "#756f6a"},
                  axisLabel: {fontSize: 5, padding: 20},
                  ticks: {stroke: "#818e99" },
                  tickLabels: {fontSize: 15, padding: 5},
                  grid: { stroke: ({ticks})=> "#756f6a" }
                }}
                tickLabelComponent={
                  <VictoryLabel 
                    dy={-10}
                    style={[
                      { fill: "black", fontSize: 15 },
                    ]}
                  />
                }
                tickCount={19}
                tickFormat={(t)=> `${returnAxis(t, "pretermWeeks")}`}
              /> 
      }

      { showAxis(allMeasurementPairs, "ukwhoInfant") && // x axis reporting months
          <VictoryAxis
              label="Age (mths)"
              theme={VictoryTheme.material}
              tickLabelComponent={
                // <VictoryLabel 
                //   dy={0}
                //   style={[
                //     { fill: "black", fontSize: 15 },
                //   ]}
                // />
          
                  <ChartCircle style={{
                    stroke: centileColour
                  }}/>
          
              }
              tickCount={5}
              tickFormat={(t)=> `${returnAxis(t, "months")}`}
              style={{
                axis: {stroke: "#756f6a"},
                axisLabel: {fontSize: 10, padding: 20},
                ticks: {stroke: "#818e99"},
                tickLabels: {fontSize: 15, padding: 5},
                grid: { 
                  stroke: t => (t.tickValue*12)%6===0 && "#818e99",
                  strokeWidth: 0.25 
                }
              }}
              
            /> 
      }

      { showAxis(allMeasurementPairs, "ukwhoInfant") && //x axis reporting weeks
           <VictoryAxis
           theme={VictoryTheme.material}
           tickValues={getWeeks()}
           tickLabelComponent={
             <VictoryLabel 
               dy={0}
               style={[
                 { fill: "black", fontSize: 5 },
               ]}
             />
            
           }
           tickFormat={(t)=> returnAxis(t, "weeks")} //`${returnAxis(t, "weeks")}`
           style={{
             axis: {stroke: "#756f6a"},
             axisLabel: {fontSize: 10, padding: 20},
            
             tickLabels: {fontSize: 10, padding: 5},
             grid: {
               stroke: t=>Math.round(t.tickValue*52)%2===0 && "#c8cacc",
               strokeWidth: 0.25
             }
           }}
         /> 
      }

      { showAxis(allMeasurementPairs, "ukwhoChild") && //x axis reporting months
            <VictoryAxis
              theme={VictoryTheme.material}
              tickLabelComponent={
                <ChartCircle style={{
                  stroke: centileColour
                }}/>
              }
              fixLabelOverlap
              tickFormat={(t)=> `${returnAxis(t, "years")}`}
              style={{
                axis: {stroke: "#756f6a"},
                axisLabel: {fontSize: 10, padding: 20},
                ticks: {stroke: "grey"},
                tickLabels: {fontSize: 15, padding: 5},
                grid: { stroke: "#818e99", strokeWidth: 0.25 }
              }}
            />
      }

      { showAxis(allMeasurementPairs, "ukwhoChild") && //x axis reporting months
          <VictoryAxis
          label="Age (mths)"
          theme={VictoryTheme.material}
          orientation="bottom"
          tickLabelComponent={
            <VictoryLabel 
              dy={0}
              style={[
                { fill: "black", fontSize: 15 },
              ]}
            />
          }
          tickCount={16}
          tickFormat={(t)=> `${returnAxis(t, "months")}`}
          style={{
            axis: {stroke: "#756f6a"},
            axisLabel: {fontSize: 10, padding: 20},
            ticks: {stroke: "grey"},
            tickLabels: {fontSize: 15, padding: 5},
            grid: { stroke: "#c8cacc", strokeWidth: 0.25 }
          }}
        />
      }

      { showAxis(allMeasurementPairs, "uk90Child") &&
            <VictoryAxis
              label="Age (y)"
              theme={VictoryTheme.material}
              tickLabelComponent={
                <VictoryLabel 
                  dy={0}
                  style={[
                    { fill: centileColour, fontSize: 15 },
                  ]}
                />
              }
              // tickFormat={(t)=> `${returnAxis(t, "years")}`}
              tickCount = {20}

              style={{
                axis: {stroke: "#756f6a"},
                axisLabel: {fontSize: 10, padding: 20},
                ticks: {stroke: "#818e99"},
                tickLabels: {fontSize: 10, padding: 5},
                grid: { 
                  stroke: t => t.tickValue%5===0 ? '#818e99' : "#c8cacc",
                  strokeWidth: 0.25,
                }
              }}
            /> 
      }

      <VictoryAxis
        style= {{
          axis: {stroke: "#756f6a"},
          axisLabel: {fontSize: 10, padding: 20},
          ticks: {stroke: "grey"},
          tickLabels: {fontSize: 15, padding: 5},
          grid: { stroke: "#818e99", strokeWidth: 0.25 }}}
        dependentAxis />   

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
                        stroke: centileColour,
                        strokeWidth: 0.5,
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
                        strokeWidth: 0.5,
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
                      stroke: centileColour,
                      strokeWidth: 0.5,
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
                      strokeWidth: 0.5,
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
                      stroke: centileColour,
                      strokeWidth: 0.5,
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
                      strokeWidth: 0.5,
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
                      stroke: centileColour,
                      strokeWidth: 0.5,
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
                      strokeWidth: 0.5,
                      strokeLinecap: 'round'
                    }
                  }}
                />
              )
            }
          })}
          
        </VictoryGroup>
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
                      symbol={"circle"}
                      style={{ data: { fill: measurementDataPointColour } }}
                      name='same_age' 
                    />
                :
                     <VictoryScatter
                      data={measurementPair}
                      symbol={({datum})=> datum.age_type==="chronological_age" ? 'circle' : "plus"}
                      style={{ data: { fill: measurementDataPointColour } }}
                      name= 'split_age'
                    />
                }

                <VictoryLine
                  name="linkLine"
                  style={{ 
                    data: { stroke: measurementDataPointColour },
                    parent: { border: "1px solid red"}
                  }}
                  data={measurementPair}
                />
              </VictoryGroup>
            )
        })}
      </VictoryChart>
    </div>

);

const ChartCircle = (props) =>{
  const {x, y, style, text} = props
  return (<svg>
    <text x={props.text.length < 2 ?x-5 : x-10} y={y-25} fill={style.stroke}>{text}</text>
    <circle cx={props.x} cy={y-30} r={10} stroke={style.stroke} fill="transparent" />
    <line x1={props.x} x2={x} y1={y} y2={y-20} stroke={style.stroke}/>
  </svg>)
}

// const Cross = (props) => {
//   return (<svg>
//     <line
//       x1={props.x - 1.25}
//       y1={props.y - 1.25}
//       x2={props.x + 1.25}
//       y2={props.y + 1.25}
//       stroke='red'
//       strokeWidth={2}
//     />
//     <line
//       x1={props.x + 1.25}
//       y1={props.y - 1.25}
//       x2={props.x - 1.25}
//       y2={props.y + 1.25}
//       stroke='red'
//       strokeWidth={2}
//     />
//   </svg>)
// }

export default UKWHOChart;