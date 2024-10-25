// input a number and outputs a string with ordinal suffix attached
const addOrdinalSuffix = (inputNumber: number | string): string => {
    let answerNumber: string = inputNumber.toString();
    let workingNumber = Number(inputNumber);
    if (Number.isInteger(workingNumber) === false) {
        workingNumber *= 100;
        if (Number.isInteger(workingNumber) === false) {
            throw Error('Only integers or numbers to 2 decimal places are supported');
        }
    } else {
        answerNumber = answerNumber.split('.')[0]; // this is an integer - remove the decimal point
    }
    const remainder10 = workingNumber % 10;
    const remainder100 = workingNumber % 100;
    if (remainder10 === 1 && remainder100 !== 11) {
        return `${answerNumber}st`;
    }
    if (remainder10 === 2 && remainder100 !== 12) {
        return `${answerNumber}nd`;
    }
    if (remainder10 === 3 && remainder100 !== 13) {
        return `${answerNumber}rd`;
    } else {
        return `${answerNumber}th`;
    }
};

export default addOrdinalSuffix;
