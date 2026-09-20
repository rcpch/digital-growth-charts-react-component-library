import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import RCPCHChart from './RCPCHChart';
import type { RCPCHChartProps } from './RCPCHChart.types';
import { ukWhoFemaleBmi, ukWhoMaleBmi, ukWhoMaleWeight } from '../testParameters/measurements/generated';
import { prematureGirlOverThreeHeight } from '../testParameters/measurements/prematureGirlOverThreeHeight';
import { ukwhoBMIBoyHigh } from '../testParameters/measurements/ukwhoBMIBoyHigh';
import { twoToEight } from '../testParameters/measurements/twoToEight';
import { whoToNineteenGirlHeight } from '../testParameters/measurements/whoHeightToNineteenGirl';

const baseArgs: RCPCHChartProps = {
    title: 'UK-WHO female height: aligned curve labels',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    measurements: { height: [] },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: () => undefined,
    clinicianFocus: false,
    theme: 'traditional',
    width: 1000,
    height: 800,
};

const meta = {
    title: 'Visual regression/Curve endpoint labels',
    component: RCPCHChart,
    tags: ['autodocs'],
    args: baseArgs,
    render: (args) => (
        <div style={{ width: args.width, maxWidth: '100%' }}>
            <RCPCHChart {...args} />
        </div>
    ),
    parameters: {
        layout: 'fullscreen',
        controls: { disable: true },
        docs: {
            description: {
                component:
                    'Issue #258: curve labels with transparent backgrounds in two aligned columns near the visible x-ends. Label colour defaults to the axis tick-label colour and can be overridden through centileStyle.centileTextStyle.colour. Each column uses one font size, fitted to the available spacing and recalculated on zoom. No staggering or selective collision suppression. Prefer at least 8 SVG units; if neither complete column fits, allow a smaller right column (down to 3 units) rather than leaving the chart unlabelled. This fallback is important for the closely spaced WHO/CDC extremes. Curves outside the viewport at that x do not receive an off-curve label. On populated stories, exercise zoom, pan, Reset Zoom, Toggle Full Lifespan and Hide/Show Centile Labels. Check that reference joins do not acquire extra labels, and that measurements and curves are unchanged.',
            },
        },
    },
} satisfies Meta<typeof RCPCHChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UkWhoFemaleHeightLifeCourse: Story = {
    name: 'UK-WHO / Female / Height / Life course',
};

export const UkWhoFemaleHeightPreterm: Story = {
    name: 'UK-WHO / Female / Height / Preterm, bottom identity',
    args: {
        measurements: { height: prematureGirlOverThreeHeight },
        theme: 'tanner2',
        logoVariant: 'bottom',
    },
};

export const UkWhoMaleBmiWithSds: Story = {
    name: 'UK-WHO / Male / BMI / Centile and SDS columns',
    args: {
        title: 'UK-WHO male BMI: aligned centile and SDS labels',
        measurementMethod: 'bmi',
        sex: 'male',
        measurements: { bmi: ukWhoMaleBmi },
    },
};

export const UkWhoMaleBmiLabelsFollowTicks: Story = {
    name: 'UK-WHO / Male / BMI / Labels inherit tick colour',
    args: {
        ...UkWhoMaleBmiWithSds.args,
        title: 'Centile and SDS labels inherit the axis tick colour',
        customThemeStyles: {
            axisStyle: { tickLabelTextStyle: { colour: '#334155' } },
        },
    },
};

export const UkWhoMaleBmiLabelColourOverride: Story = {
    name: 'UK-WHO / Male / BMI / Custom label colour',
    args: {
        ...UkWhoMaleBmiLabelsFollowTicks.args,
        title: 'Custom centile and SDS label colour',
        customThemeStyles: {
            ...UkWhoMaleBmiLabelsFollowTicks.args.customThemeStyles,
            centileStyle: { centileTextStyle: { colour: '#6b21a8' } },
        },
    },
};

export const UkWhoMaleHighBmi: Story = {
    name: 'UK-WHO / Male / BMI / High observation',
    args: {
        ...UkWhoMaleBmiWithSds.args,
        measurements: { bmi: ukwhoBMIBoyHigh },
        theme: 'tanner2',
    },
};

export const UkWhoFemaleBmiWithSds: Story = {
    name: 'UK-WHO / Female / BMI / Centile and SDS columns',
    args: {
        title: 'UK-WHO female BMI: aligned centile and SDS labels',
        measurementMethod: 'bmi',
        measurements: { bmi: ukWhoFemaleBmi },
    },
};

export const UkWhoFemaleBmiLifeCourse: Story = {
    name: 'UK-WHO / Female / BMI / Life course',
    args: {
        ...UkWhoFemaleBmiWithSds.args,
        measurements: { bmi: [] },
        theme: 'tanner2',
    },
};

export const UkWhoMaleWeightTermStrip: Story = {
    name: 'UK-WHO / Male / Weight / Term strip',
    args: {
        title: 'UK-WHO male weight: labels over the term strip',
        measurementMethod: 'weight',
        sex: 'male',
        measurements: { weight: [ukWhoMaleWeight[0]] },
        theme: 'tanner1',
    },
};

export const CdcFemaleHeightEndpoints: Story = {
    name: 'CDC / Female / Height / Closely spaced outer centiles',
    args: {
        title: 'CDC female height: aligned curve labels',
        reference: 'cdc',
        measurements: { height: twoToEight },
        theme: 'tanner2',
    },
};

export const WhoFemaleHeightEndpoints: Story = {
    name: 'WHO / Female / Height / Closely spaced outer centiles',
    args: {
        title: 'WHO female height: complete aligned labels',
        reference: 'who',
        measurements: { height: whoToNineteenGirlHeight },
        theme: 'tanner1',
        clinicianFocus: true,
    },
};

export const CdcFemaleBmiLifeCourse: Story = {
    name: 'CDC / Female / BMI / Full extreme-centile set',
    args: {
        title: 'CDC female BMI: complete aligned labels',
        reference: 'cdc',
        measurementMethod: 'bmi',
        measurements: { bmi: [] },
        theme: 'tanner2',
    },
};

export const UkWhoFemaleHeightNarrow: Story = {
    name: 'UK-WHO / Female / Height / Narrow life course',
    args: { width: 420, height: 600 },
};

export const UkWhoMaleBmiWithSdsNarrow: Story = {
    name: 'UK-WHO / Male / BMI / Narrow centile and SDS columns',
    args: { ...UkWhoMaleBmiWithSds.args, width: 420, height: 600 },
};
