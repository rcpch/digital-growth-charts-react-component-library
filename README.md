<p align="center">
    <img width="200px" src="https://github.com/rcpch/digital-growth-charts-documentation/raw/live/docs/_assets/_images/rcpch_logo.png"/>
    <p align="center">Designed and built by the RCPCH, by clinicians for clinicians.</p>
</p>
<p align="center">
    <img align="center" width="100px" src="https://github.com/rcpch/digital-growth-charts-documentation/raw/live/docs/_assets/_images/htn-awards-winner-2020-logo.jpg"/>
    <img align="center" width="100px" src="https://github.com/rcpch/digital-growth-charts-documentation/raw/live/docs/_assets/_images/logo-block-outline-sm.png"/>
    <p align="center">Winner 2020 HTN Health Tech Awards - Best Health Tech Solution</p>
    <p align="center">This project is part of the <a href="https://publicmoneypubliccode.org.uk/">Public Money Public Code</a> community</p>
</p>

# RCPCH Growth Chart React Component Library

## Background

The Royal College of Paediatrics and Child Health were commissioned in early 2020 to build the growth charts for the electronic Red Book, until now a book given to all new parents in the UK to guide them on how to monitor growth, development and to document any interactions or procedures (for example, immunisations). The RCPCH could at that point have commissioned an app to do just this, but instead took the imaginative step of building the charts as an API. The maths behind the charts is complex and by building an API, developers can now focus on rendering charts, rather than engaging with the maths behind them.

The digital Growth Charts project can be found [here](https://github.com/rcpch) if you want to know more, or get involved. More information or to sign up with the API visit our site [here](https://dev.rcpch.ac.uk/)

## Why a Chart library?

In the process of building the API, we realised that it would not be easy for developers not familiar with growth charts to produce them. Even if the API were to send all the values to render centiles and growth measurement points in plottable format (which it does), the challenge of rendering these remains complicated.

For example, charts typically have 9 main centile lines (though there are other formats), each of which can be rendered as a series. However the UK-WHO chart is made of several growth references, each from different datasets, and it is a stipulation that they must not overlap - this means for the four datasets which make up UK-WHO, the developer must render 36 separate 'sections' of centile lines correctly.

Even then, there are certain rules which are key, published by the RCPCH project board. These relate to usability of the charts. For example, the 50th centile should be de-emphasised. These and other rules are listed on the [RCPCH Github](https://github.com/rcpch)

Given the complexity, we decided to create a React component library for developers to use. We designed it to be customisable for those that wanted to use it, but also as a demonstration for developers who wanted to build the charts themselves from the ground up.

If you want to see how the library is implemented, we have built a client for the RCPCHGrowth API in React, which can be found [here](https://github.com/rcpch/digital-growth-charts-react-client).

## Why React?

React is a popular UI library for Javascript. It has endured well and seems like a popular choice for developers. Importantly, unlike some other Javascript frameworks which are primarily designed for Single Page Applications, React doesn't expect to have the entire webpage to itself. It can be used as a small component in any other web page, even if the main framework being used is something completely different.

We're happy to consider building components in other languages/frameworks, or to assist developers in managing the complexity of centile charting in whatever language you are implementing in. (The RCPCH may need to ask for funding for the time taken to support extra development like this)

## Getting started

```console
foobar:~foo$ npm i --save @rcpch/digital-growth-charts-react-component-library
```

Victory Charts are a dependency (see below), themselves built on top of D3.js. On build it is likely you will get an error relating to circular dependencies for some files in the d3-interpolate module. The is an issue logged [here](https://github.com/d3/d3-interpolate/issues/58).

If you want to run the package locally alongside the react client, there are some extra steps to go through. Since the chart library and the react client both use react, the charts will throw an error if you import them in the `package.json` of your app from a folder on your local machine. For example in your react app:

```json
"dependencies": {
    "@rcpch/digital-growth-charts-react-component-library": "file:/Users/FooBar/Development/react/component-libraries/digital-growth-charts-react-component-library",
}
```

The problem with this is that there are then 2 versions of react running. To overcome this, in your application:

```console
foobar:~foo$ cd node_modules/react
foobar:~foo$ npm link
```

In the root folder of your chart library:

```console
foobar:~foo$ npm link react
```

Repeat the same for `react-dom` ensuring all the package versions are the same for your app and the library.
In this way, you can make changes to the chart package and they will appear in your app after `npm run build` and refresh your app.

If the invalid hooks error persists inspite of this, a further fix involves deleting the `node_modules` folder in the`@rcpch/digital-growth-charts-react-component-library` folder within `node_modules` in the client.

## Structure

This library has been written in Typescript. The main component is `RCPCHChart`, which takes the following `props`:

```js
interface ChartProps {
    title: string;
    subtitle: string;
    measurementMethod: 'height' | 'weight' | 'ofc' | 'bmi';
    sex: 'male' | 'female';
    measurementsArray: [Measurement];
    reference: 'uk-who' | 'turner' | 'trisomy-21';
    enableZoom: boolean;
    chartStyle: ChartStyle;
    axisStyle: AxisStyle;
    gridlineStyle: GridlineStyle;
    centileStyle: CentileStyle;
    measurementStyle: MeasurementStyle;
}
```

The `Measurement` interface is structured to reflect the JSON `Measurement` object which is returned by the API. The `RCPCHChart` component uses the `reference` prop to determine which chart to render. So far, 3 references are supported: UK-WHO, Turner's Syndrome and Trisomy 21 (Down's Syndrome). The reference data for the centiles are included in the library in plottable format in the `chartdata` folder.

The `Measurement` interface structure is:

```js
interface Measurement {
    birth_data: {
        birth_date: string,
        estimated_date_delivery: string,
        estimated_date_delivery_string: string,
        gestation_weeks: number,
        gestation_days: number,
        sex: 'male' | 'female',
    };
    child_observation_value: {
        measurement_method: 'height' | 'weight' | 'bmi' | 'ofc',
        observation_value: number,
        observation_value_error: string,
    };
    measurement_dates: {
        chronological_calendar_age: string,
        chronological_decimal_age: number,
        clinician_decimal_age_comment: string,
        corrected_calendar_age: string,
        corrected_decimal_age: number,
        corrected_gestational_age: {
            corrected_gestation_weeks: number,
            corrected_gestation_days: number,
        },
        lay_decimal_age_comment: string,
        observation_date: string,
    };
    measurement_calculated_values: {
        chronological_centile: number,
        chronological_centile_band: string,
        chronological_measurement_error: string,
        chronological_sds: number,
        corrected_centile: number,
        corrected_centile_band: string,
        corrected_measurement_error: string,
        corrected_sds: number,
        measurement_method: 'height' | 'weight' | 'bmi' | 'ofc',
    };
    plottable_data: {
        centile_data: {
            chronological_decimal_age_data: {
                age_error: null,
                age_type: 'chronological_age' | 'corrected_age',
                calendar_age: string,
                centile_band: string,
                clinician_comment: string,
                lay_comment: string,
                observation_error: null,
                observation_value_error: null,
                x: number,
                y: number,
            },
            corrected_decimal_age_data: {
                age_error: null,
                age_type: 'chronological_age' | 'corrected_age',
                calendar_age: string,
                centile_band: string,
                clinician_comment: string,
                lay_comment: string,
                observation_error: null,
                observation_value_error: null,
                x: number,
                y: number,
            },
        },
        sds_data: {
            chronological_decimal_age_data: {
                age_error: null,
                age_type: 'chronological_age' | 'corrected_age',
                calendar_age: string,
                centile_band: string,
                clinician_comment: string,
                lay_comment: string,
                observation_error: null,
                observation_value_error: null,
                x: number,
                y: number,
            },
            corrected_decimal_age_data: {
                age_error: null,
                age_type: 'chronological_age' | 'corrected_age',
                calendar_age: string,
                centile_band: string,
                clinician_comment: string,
                lay_comment: string,
                observation_error: null,
                observation_value_error: null,
                x: number,
                y: number,
            },
        },
    };
}
```

The styling props allow the user to customise elements of the chart:
Chart styles control the chart and the tooltips. All style props are optional.

```js
interface ChartStyle {
    backgroundColour?: string;
    width?: number;
    height?: number;
    padding?: requires { left?: number; right?: number; top?: number; bottom?: number:};
    titleStyle?: requires {name?: string; colour?: string; size?: number; weight?: 'bold' | 'italic' | 'normal':};
    subTitleStyle?: requires {name?: string; colour?: string; size?: number; weight?: 'bold' | 'italic' | 'normal':};
    tooltipBackgroundColour?: string;
    tooltipStroke?: string;
    tooltipTextStyle?: requires {name?: string; colour?: string; size?: number; weight?: 'bold' | 'italic' | 'normal':}; // the text size is not in pts, but is a strokeWidth as text is an svg
    termFill?: string;
    termStroke?: string;
    toggleButtonInactiveColour: string;
    toggleButtonActiveColour: string;
    toggleButtonTextStyle: requires {name?: string; colour?: string; size?: number; weight?: 'bold' | 'italic' | 'normal':};
};
```

Note for the tooltips text sizes, these are strokeWidths, not point sizes as the text here is svg.

Axis styles control axes and axis labels:

```js
interface AxisStyle {
    axisStroke?: string,
    axisLabelTextStyle?: requires {name?: string, colour?: string, size?: number, weight?: 'bold' | 'italic' | 'normal';};
    tickLabelTextStyle?: requires {name?: string, colour?: string, size?: number, weight?: 'bold' | 'italic' | 'normal';};
};
```

Gridline styles allow/hide gridlines and control line width, presence of dashes, colour.

```js
interface GridlineStyle {
    gridlines?: boolean;
    stroke?: string;
    strokeWidth?: number;
    dashed?: boolean;
}
```

Centile styles control the width and colour.

```js
interface CentileStyle {
    centileStroke?: string;
    centileStrokeWidth?: number;
    delayedPubertyAreaFill?: string;
}
```

Measurement styles control the plotted data points - colour, size and shape. Corrected ages are always rendered as crosses and circles for chronological ages.

```js
interface MeasurementStyle {
    measurementFill?: string;
    measurementSize?: number; // this is an svg size
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

## Contributing

We're a friendly bunch and we're happy to chat. You can get in touch with the primary developers to talk about the project using our forum at <https://openhealthhub.org/c/rcpch-digital-growth-charts> which is the community hub around the dGC project.

### How to contribute

- Fork the repository to your own GitHub account
- Set up your development environment (ideally using our instructions here for maximum compatibility with our own development environments)
- Note that running the chart package and react client locally will cause a conflict within react if multiple versions are running. A fix for this can be found in the [react client readme.MD](https://github.com/rcpch/digital-growth-charts-react-client)
- Ideally, you should have discussed with our team what you are proposing to change, because we can only accept pull requests where there is an accepted need for that new feature or fix.
- We can discuss with you how we would recommend to implement the new feature, for maximum potential 'mergeability' of your PR.
- Once the work is ready to show us, create a pull request on our repo, detailing what the change is and details about the fix or feature. PRs that affect any 'mission critical' part of the code will need suitable tests which we can run.
- We will endeavour to review and merge in a reasonable time frame, but will usually not merge straight into master, rather we will merge into an upcoming release branch.
