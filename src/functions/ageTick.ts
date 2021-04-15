import { ageThresholds } from './ageThresholds'

export function ageTickNumber(measurementsArray, interval: string): number[] {
    const ageLimits = ageThresholds(measurementsArray)
    let ageDifference = ageLimits[1] - ageLimits[0] //difference in years
    if (interval === "months") {
        const monthsUpper = ageLimits[1] * 12
        const monthsLower = ageLimits[0] * 12
        ageDifference = monthsUpper - monthsLower
        return createValues(monthsLower, monthsUpper, interval)
    }
    if (interval == "weeks") {
        const weeksUpper = ageLimits[1] * 52
        const weeksLower = ageLimits[0] * 52
        ageDifference = weeksUpper - weeksLower

        return createValues(weeksLower, weeksUpper, interval)
    }
    if (interval == "pretermWeeks") {
        const weeksLower = ageLimits[0]
        const weeksUpper = ageLimits[1]
        ageDifference = weeksUpper - weeksLower
        return createValues(weeksLower, weeksUpper, interval)
    }
    if (interval == "years") {
        const yearsUpper = ageLimits[1]
        const yearsLower = ageLimits[0]
        ageDifference = yearsUpper - yearsLower

        return createValues(yearsLower, yearsUpper, interval)
    }

    // return Math.round(ageDifference)
}

function createValues(lowerValue, upperValue, interval): number[] {

    let finalArray: number[] = []

    let i = lowerValue
    while (i <= upperValue) {
        if (interval === "months") {
            if (i % 6 === 0) {
                finalArray.push(i / 12)
            }
            i++
        }
        if (interval === "weeks") {
            if (i % 2 === 0) {
                finalArray.push(i / 52)
            }
            i++
        }
        if (interval === "years") {
            finalArray.push(i)
            i++
        }
        if (interval === "pretermWeeks") {
            finalArray.push(i)
            i++
        }
    }
    return finalArray

}