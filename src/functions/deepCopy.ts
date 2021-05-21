const deepCopyArray = (arr: any[]) => {
    let copy: any[] = [];
    arr.forEach((elem: any) => {
        if (Array.isArray(elem)) {
            copy.push(deepCopyArray(elem));
        } else {
            if (typeof elem === 'object' && elem !== null) {
                copy.push(deepCopyObject(elem));
            } else {
                copy.push(elem);
            }
        }
    });
    return copy;
};

const deepCopyObject = (obj: { [key: string]: any }) => {
    let tempObj: { [key: string]: any } = {};
    for (let [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
            tempObj[key] = deepCopyArray(value);
        } else {
            if (typeof value === 'object' && value !== null) {
                tempObj[key] = deepCopyObject(value);
            } else {
                tempObj[key] = value;
            }
        }
    }
    return tempObj;
};

const deepCopy = (input: any) => {
    if (Array.isArray(input)) {
        return deepCopyArray(input);
    } else if (typeof input === 'object' && input !== null) {
        return deepCopyObject(input);
    } else {
        return input;
    }
};

export default deepCopy;
