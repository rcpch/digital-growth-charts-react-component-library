import type { Meta, StoryObj } from '@storybook/react-webpack5';

import RCPCHChart from './RCPCHChart';
import type { RCPCHChartProps } from './RCPCHChart.types';
import {
    cdcFemaleHeight,
    trisomy21AapMaleWeight,
    trisomy21MaleBmi,
    turnerFemaleHeight,
    ukWhoFemaleBmi,
    ukWhoFemaleHeight,
    ukWhoFemaleHeightBoneAgeEvent,
    ukWhoFemaleHeightDuplicates,
    ukWhoFemaleOfc,
    ukWhoFemaleWeight,
    ukWhoFemaleWeightPreterm22,
    whoMaleOfc,
} from '../testParameters/measurements/generated';

const baseArgs: RCPCHChartProps = {
    title: 'Generated API fixture',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    measurements: { height: ukWhoFemaleHeight },
    midParentalHeightData: {},
    enableZoom: false,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: () => undefined,
    clinicianFocus: false,
    theme: 'monochrome',
};

const meta = {
    title: 'Visual regression/Generated API fixtures',
    component: RCPCHChart,
    args: baseArgs,
    parameters: {
        layout: 'fullscreen',
        controls: { disable: true },
    },
} satisfies Meta<typeof RCPCHChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UkWhoFemaleHeight: Story = {};

export const WhoMaleHeadCircumference: Story = {
    args: {
        title: 'WHO male head circumference',
        measurementMethod: 'ofc',
        reference: 'who',
        sex: 'male',
        measurements: { ofc: whoMaleOfc },
    },
};

export const CdcFemaleHeight: Story = {
    args: {
        title: 'CDC female height',
        reference: 'cdc',
        measurements: { height: cdcFemaleHeight },
    },
};

export const Trisomy21MaleBmi: Story = {
    args: {
        title: 'Trisomy 21 male BMI',
        measurementMethod: 'bmi',
        reference: 'trisomy-21',
        sex: 'male',
        measurements: { bmi: trisomy21MaleBmi },
    },
};

export const Trisomy21AapMaleWeight: Story = {
    args: {
        title: 'Trisomy 21 AAP male weight',
        measurementMethod: 'weight',
        reference: 'trisomy-21-aap',
        sex: 'male',
        measurements: { weight: trisomy21AapMaleWeight },
    },
};

export const TurnerFemaleHeight: Story = {
    args: {
        title: 'Turner female height',
        reference: 'turner',
        measurements: { height: turnerFemaleHeight },
    },
};

export const Preterm22WeekWeight: Story = {
    args: {
        title: '22-week preterm female weight',
        measurementMethod: 'weight',
        measurements: { weight: ukWhoFemaleWeightPreterm22 },
    },
};

export const BoneAgeAndEvent: Story = {
    args: {
        title: 'Bone age and clinical event',
        measurements: { height: ukWhoFemaleHeightBoneAgeEvent },
    },
};

export const AllowedDuplicateMeasurements: Story = {
    args: {
        title: 'Allowed duplicate measurements',
        measurements: { height: ukWhoFemaleHeightDuplicates },
        allowDuplicates: true,
    },
};

export const MultipleMethodSds: Story = {
    args: {
        title: 'UK-WHO multiple-method SDS',
        chartType: 'sds',
        measurements: {
            height: ukWhoFemaleHeight,
            weight: ukWhoFemaleWeight,
            bmi: ukWhoFemaleBmi,
            ofc: ukWhoFemaleOfc,
        },
    },
};
