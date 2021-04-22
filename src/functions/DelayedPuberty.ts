// these are the thresholds on the UK90 child chart displaying delayed puberty lines with labels.
// the delayedpuberthresholds function generates data for the shaded area.

import {Domains} from '../interfaces/Domains';
import {delayedPubertyData} from './getDomainsAndData';

export const pubertyThresholds = {
  male: [
    {
      x: 9,
      label: 'Puberty starting before 9 years is precocious.',
    },
    {
      x: 14,
      label: 'Puberty is delayed if no signs are present by 14y.',
    },
    {
      x: 17,
      label: 'Puberty completing after 17y is delayed.',
    },
  ],
  female: [
    {
      x: 8,
      label: 'Puberty starting before 8 years is precocious.',
    },
    {
      x: 13,
      label: 'Puberty is delayed if no signs are present by 13y.',
    },
    {
      x: 16,
      label: 'Puberty completing after 16y is delayed.',
    },
  ],
};

export function makePubertyThresholds(
  domains: Domains | null,
  sex: 'male' | 'female',
) {
  if (!domains) {
    return [];
  }
  const newPubertyThresholds: any[] = [];
  for (const element of pubertyThresholds[sex]) {
    const dataSubArray = [];
    dataSubArray.push({x: element.x, y: domains.y[0], label: element.label});
    dataSubArray.push({x: element.x, y: domains.y[1], label: element.label});
    newPubertyThresholds.push(dataSubArray);
  }
  return newPubertyThresholds;
}

export const delayedPubertyThreshold = (sex: 'male' | 'female') => {
  // generates the data for the shaded area (VictoryArea) where puberty is delayed, and adds information for the tool tip
  const data = delayedPubertyData[sex];
  return data.map((dataItem: any) => {
    if (sex === 'male') {
      if (dataItem.x >= 9 && dataItem.x <= 14) {
        return {
          ...dataItem,
          y0: 117 + 3 * (dataItem.x - 9),
          l: 'For all Children plotted in this shaded area see instructions.',
        };
      }
      return dataItem;
    } else {
      if (dataItem.x >= 8.6 && dataItem.x <= 13) {
        return {
          ...dataItem,
          y0: 116 + 3 * (dataItem.x - 8.6),
          l: 'For all Children plotted in this shaded area see instructions.',
        };
      }
      return dataItem;
    }
  });
};

// export const pubertyThresholdBoys = [
//   {
//     x: 9,
//     label: 'Puberty starting before 9 years is precocious.',
//   },
//   {
//     x: 14,
//     label: 'Puberty is delayed if no signs are present by 14y.',
//   },
//   {
//     x: 17,
//     label: 'Puberty completing after 17y is delayed.',
//   },
// ];

// export const pubertyThresholdGirls = [
//   {
//     x: 8,
//     label: 'Puberty starting before 8 years is precocious.',
//   },
//   {
//     x: 13,
//     label: 'Puberty is delayed if no signs are present by 13y.',
//   },
//   {
//     x: 16,
//     label: 'Puberty completing after 16y is delayed.',
//   },
// ];
