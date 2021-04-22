const allXTickValues = [
  -0.32580424366872,
  -0.3066392881587953,
  -0.2874743326488706,
  -0.2683093771389459,
  -0.2491444216290212,
  -0.2299794661190965,
  -0.21081451060917178,
  -0.19164955509924708,
  -0.17248459958932238,
  -0.15331964407939766,
  -0.13415468856947296,
  -0.11498973305954825,
  -0.09582477754962354,
  -0.07665982203969883,
  -0.057494866529774126,
  -0.038329911019849415,
  -0.019164955509924708,
  0,
  0.019164955509924708,
  0.038329911019849415,
  0.07665982203969883,
  0.08333333333333333,
  0.11498973305954825,
  0.15331964407939766,
  0.16666666666666666,
  0.19164955509924708,
  0.2299794661190965,
  0.25,
  0.2683093771389459,
  0.3066392881587953,
  0.3333333333333333,
  0.34496919917864477,
  0.38329911019849416,
  0.4166666666666667,
  0.42162902121834356,
  0.459958932238193,
  0.4982888432580424,
  0.5,
  0.5366187542778919,
  0.5749486652977412,
  0.5833333333333334,
  0.6132785763175906,
  0.65160848733744,
  0.6666666666666666,
  0.6899383983572895,
  0.7282683093771389,
  0.75,
  0.7665982203969883,
  0.8049281314168377,
  0.8333333333333334,
  0.8432580424366871,
  0.8815879534565366,
  0.9166666666666666,
  0.919917864476386,
  0.9582477754962354,
  1,
  1.08333333333333333,
  1.15331964407939766,
  1.16666666666666666,
  1.25,
  1.3333333333333333,
  1.5,
  1.75,
  2,
  2.25,
  2.5,
  2.75,
  3,
  3.25,
  3.5,
  3.75,
  4,
  4.5,
  5,
  5.5,
  6,
  6.5,
  7,
  7.5,
  8,
  8.5,
  9,
  9.5,
  10,
  10.5,
  11,
  11.5,
  12,
  12.5,
  13,
  13.5,
  14,
  14.5,
  15,
  15.5,
  16,
  16.5,
  17,
  17.5,
  18,
  18.5,
  19,
  19.5,
  20,
];

export function getTickValuesForChartScaling(
  chartScaleType: 'prem' | 'infant' | 'smallChild' | 'biggerChild',
) {
  const tickValuesForChartScaling = [];
  for (const element of allXTickValues) {
    switch (chartScaleType) {
      case 'prem':
        tickValuesForChartScaling.push(element);
        break;
      case 'infant':
        if (element < 1) {
          if (
            Number.isInteger(element) ||
            Number.isInteger(Number((element * 12).toFixed(2))) === false
          ) {
            tickValuesForChartScaling.push(element);
          }
        } else {
          tickValuesForChartScaling.push(element);
        }
        break;
      case 'smallChild':
        if (
          Number.isInteger(element) ||
          element === -0.32580424366872 ||
          Number.isInteger(Number((element * 3).toFixed(2)))
        ) {
          tickValuesForChartScaling.push(element);
        }
        break;
      case 'biggerChild':
        if (
          Number.isInteger(element) ||
          element === -0.32580424366872 ||
          Number.isInteger(element * 2)
        ) {
          tickValuesForChartScaling.push(element);
        }
        break;
      default:
        console.error(
          'getTickValuesForChartScaling did not pick up a valid chartScaleType',
        );
    }
  }
  return tickValuesForChartScaling;
}

const premXTickValues = [];

for (const element of allXTickValues) {
  if (element < 0.4) {
    premXTickValues.push(element);
  } else {
    break;
  }
}

const infantXTickValues = [];

for (const element of allXTickValues) {
  if (element < 2) {
    if (
      (element < 0 && Math.round(element * 52) % 2 === 0) ||
      element > 0.02 ||
      element === 0
    ) {
      infantXTickValues.push(element);
    }
  } else {
    break;
  }
}

const smallChildXTickValues = [];

for (const element of allXTickValues) {
  if (element <= 5.5) {
    if (Number.isInteger(Number((element * 4).toFixed(4)))) {
      smallChildXTickValues.push(element);
    }
  } else {
    break;
  }
}

const biggerChildXTickValues = [];

for (const element of allXTickValues) {
  if (Number.isInteger(Number((element * 2).toFixed(4)))) {
    biggerChildXTickValues.push(element);
  }
}

const tailoredXTickValues = {
  prem: premXTickValues,
  infant: infantXTickValues,
  smallChild: smallChildXTickValues,
  biggerChild: biggerChildXTickValues,
};

export default tailoredXTickValues;
