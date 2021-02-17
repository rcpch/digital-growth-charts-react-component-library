# RCPCH Growth Chart React Component Library

## Background

The Royal College of Paediatrics and Child Health were commissioned in early 2020 to build the growth charts for the electronic Red Book, until now a book given to all new parents in the UK to guide them on how to monitor growth, development and to document any interactions or procedures (for example, immunisations). The RCPCH could at that point have commissioned an app to do just this, but instead took the imaginative step of building the charts as an API. The maths behind the charts is complex and by building an API, developers can now focus on rendering charts, rather than engaging with the maths behind them.

The digital Growth Charts project can be found [here](https://github.com/rcpch) if you want to know more, or get involved. More information or to sign up with the API visit our site [here](https://dev.rcpch.ac.uk/)

## Why a react library?

In the process of building the API, we realised that it would not be easy for developers not familiar with growth charts to produce them. Even if the API were to send all the values to render centiles and growth measurement points in plottable format (which it does), the challenge of rendering these remains complicated.

For example, charts typically have 9 centiles (though there are other formats), each of which can be rendered as a series. However the UK-WHO chart is made of several growth references, each from different datasets, and it is a stipulation that they must not overlap - this means for the four datasets which make up UK-WHO, the developer must render 36 separate centiles.

Even then, there are certain rules which are key, published by the RCPCH project board. These relate to useability of the charts. For example, the 50th centile should be de-emphasised. These and other rules are listed on the [RCPCH Github](https://github.com/rcpch)

Given the complexity, we decided to create a React component library for developers to use. We designed it to be customisable for those that wanted to use it, but also as a demonstration for developers who wanted to build the charts themselves from the ground up.

If you want to see how the library is implemented, we have built a client for the RCPCHGrowth API in React, which can be found [here](https://github.com/rcpch/digital-growth-charts-react-client).

## Getting started

```javascript
npm i --save digital-growth-charts-react-component-library
```
Victory Charts are a dependency (see below), themselves built on top of D3.js. On build it is likely you will get an error relating to circular dependencies for some files in the d3-interpolate module. The is an issue logged [here](https://github.com/d3/d3-interpolate/issues/58).

## Structure
This library has been written in Typescript. The main component is ```RCPCHChart```, which takes the following ```props```:

```
{
  title: string,
  subtitle: string,
  measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi',
  sex: 'male' | 'female',
  measurementsArray: [PlottableMeasurement][],
  reference: 'uk-who' | 'turner' | 'trisomy-21',
  width: number,
  height: number,
  chartStyle: ChartStyle,
  axisStyle: AxisStyle,
  gridlineStyle: GridlineStyle,
  centileStyle: CentileStyle,
  measurementStyle: MeasurementStyle
}
```
The ```PlottableMeasurement``` interface is structured to reflect the JSON ```PlottableChild``` object which is returned by the API. The ```RCPCHChart``` component uses the ```reference``` prop to determine which chart to render. So far, 3 references are supported: UK-WHO, Turner's Syndrome and Trisomy 21 (Down's Syndrome). The reference data for the centiles are included in the library in plottable format in the ```chartdata``` folder.

The styling components allow the user to customise elements of the chart:
Chart styles control the chart and the tooltips
```
interface ChartStyle{
    backgroundColour: string, 
    width: number, 
    height: number, 
    tooltipBackgroundColour: string,
    tooltipTextColour: string
}
```
Axis styles control axes and axis labels
```
interface AxisStyle{
    axisStroke: string, 
    axisLabelColour: string, 
    axisLabelFont: string, 
    axisLabelSize: number, 
    tickLabelSize: number
}
```
Gridline styles allow/hide gridlines and control line width, presence of dashes, colour.
```
interface GridlineStyle{
    gridlines: boolean, 
    stroke: string, 
    strokeWidth: number, 
    dashed: boolean
}
```
Centile styles control the width and colour.
```
interface CentileStyle{
    centileStroke: string, 
    centileStrokeWidth: number, 
    delayedPubertyAreaFill: string 
}
```
Measurement styles control the plotted data points - colour, size and shape. Corrected ages are always rendered as crosses. Circles for chronological ages are preferred.
```
interface MeasurementStyle{
    measurementFill: string, 
    measurementSize: number, 
    measurementShape: 'circle' | 'cross' | 'triangleUp' | 'triangleDown' | 'square' | 'star' | 'diamond'
}
```

At the moment, only standard centile measurement plots are supported, but in future it is expected SDS charts will be added for all references.

In time more props can be added if users request them. If you have requests, please post issues on our [github](https://github.com/rcpch/digital-growth-charts-react-component-library/issues) or contribute.


### Acknowledgements
This Typescript library was built from the starter created by [Harvey Delaney](https://blog.harveydelaney.com/creating-your-own-react-component-library/)
[![Build status](https://badge.buildkite.com/90ff98db996bb137c5be1bdce666c4b1ce68a25b17af0a6a04.svg?branch=master)](https://buildkite.com/harvey/react-component-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

The charts are built using [Victory Charts](https://formidable.com/open-source/victory/docs/victory-chart/) for React. We tried several different chart packages for React, but we chose Victory because of their documentation and their ability to customise components.

The chart data bundled in is subject to licence. If you wish to use this software, please contact the RCPCH.