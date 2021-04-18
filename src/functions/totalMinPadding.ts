/* 
Age padding is in years, so guides the x axis scale used to calculate the optimum x domains
For the purposes of working out age padding around points on a chart:
    - prem is <= 0.03832991 years (2 weeks corrected or 42 weeks gestation)
    - infant is <=1 years
    - small child is <= 4 years
    - bigger child is > 4
*/

const totalMinPadding = {
    prem: 0.2,
    infant: 0.5,
    smallChild: 2.4,
    biggerChild: 5.4,
};

export default totalMinPadding;
