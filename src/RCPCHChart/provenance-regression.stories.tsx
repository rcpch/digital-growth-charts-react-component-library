import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { userEvent, within } from 'storybook/test';

import RCPCHChart from './RCPCHChart';
import type { RCPCHChartProps } from './RCPCHChart.types';
import {
    provenanceLegacyHeight,
    provenanceMatchHeight,
    provenanceMismatchHeight,
    provenanceMixedHeight,
    provenanceUnknownHeight,
} from '../testParameters/measurements/provenanceDemo';

const baseArgs: RCPCHChartProps = {
    title: 'Growth-reference provenance',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    measurements: { height: provenanceMatchHeight },
    midParentalHeightData: {},
    enableZoom: false,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: () => undefined,
    clinicianFocus: false,
    theme: 'monochrome',
};

const meta = {
    title: 'Visual regression/Provenance',
    component: RCPCHChart,
    args: baseArgs,
    parameters: {
        layout: 'fullscreen',
        controls: { disable: true },
    },
} satisfies Meta<typeof RCPCHChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Matching: Story = {};

export const LegacyWithoutProvenance: Story = {
    args: {
        measurements: { height: provenanceLegacyHeight },
    },
};

export const UnknownFutureReference: Story = {
    args: {
        measurements: { height: provenanceUnknownHeight },
    },
};

export const RecognisedMismatch: Story = {
    args: {
        measurements: { height: provenanceMismatchHeight },
    },
};

export const MixedWithDetailsExpanded: Story = {
    args: {
        measurements: { height: provenanceMixedHeight },
    },
    play: async ({ canvasElement }) => {
        await userEvent.click(within(canvasElement).getByRole('button', { name: /show technical details/i }));
    },
};
