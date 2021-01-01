// Generated with util/create-component.js
import React from "react";
import RCPCHChart from "./RCPCHChart";

export default {
    title: "RCPCHChart"
};

export const WithBar = () => <RCPCHChart
                                title="UK-WHO"
                                subtitle="Length/Height - Boys"
                                measurementMethod="height"
                                reference='uk-who'
                                sex='male'
                                width={60}
                                height={70}
                                measurementsArray={[]}
                                measurementsSDSArray={[]}
                                chartBackground='white'
                                centileColour='blue'
                                measurementDataPointColour='red'
                            />;

export const WithBaz = () => <RCPCHChart 
                                title="UK-WHO"
                                subtitle="Length/Height - Boys"
                                measurementMethod="height"
                                reference='uk-who'
                                sex='female'
                                width={60}
                                height={70}
                                measurementsArray={[]}
                                measurementsSDSArray={[]}
                                chartBackground='white'
                                centileColour='pink'
                                measurementDataPointColour='red'
                            />;
