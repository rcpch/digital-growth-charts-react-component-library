import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import RCPCHChart from './RCPCHChart';
import { RCPCHChartProps } from './RCPCHChart/RCPCHChart.types';

// This function is used to render the RCPCHChart component into a target element
// in the DOM. It takes an object with the target element ID and chart properties.
// It is designed to be used in a non-React environment, such as a static HTML page
// or a server-rendered page where React is not the main framework.
// The function first checks if the target element exists in the DOM. If it does,
// it creates a React root and renders the RCPCHChart component into that element.
// If the target element is not found, it logs an error message to the console.
interface RenderChartOptions extends Omit<RCPCHChartProps, 'children'> {
    targetElementId: string;
}

const renderRCPCHChart = (options: RenderChartOptions): void => {
    const { targetElementId, ...chartProps } = options;
    const targetElement = document.getElementById(targetElementId);

    if (!targetElement) {
        console.error(`Target element with ID '${targetElementId}' not found.`);
        return;
    }

    const root = createRoot(targetElement);
    root.render(createElement(RCPCHChart, { ...chartProps }));
};

const RCPCHGrowthCharts = {
    render: renderRCPCHChart,
};

export { RCPCHChart, RCPCHGrowthCharts, renderRCPCHChart };
