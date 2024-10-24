import * as React from 'react';

export const AgeRadioButtonGroup = (props: any) => {
    const uniqueId = Math.random().toString(36);

    return (
        <div onChange={props.handleClickAgeRadio} className={props.className}>
            <input
                data-testid="adjusted"
                type="radio"
                id={`adjusted-${uniqueId}`}
                value="adjusted"
                name={`adjustments${uniqueId}`}
                defaultChecked={props.correctedAge && props.chronologicalAge === false}
            />
            <label htmlFor={`adjusted-${uniqueId}`}>Corrected Age</label>
            <input
                data-testid="unadjusted"
                type="radio"
                id={`unadjusted-${uniqueId}`}
                value="unadjusted"
                name={`adjustments${uniqueId}`}
                defaultChecked={props.chronologicalAge && props.correctedAge === false}
            />
            <label htmlFor={`unadjusted-${uniqueId}`}>Chronological Age</label>
            <input
                data-testid="both"
                type="radio"
                id={`both-${uniqueId}`}
                value="both"
                name={`adjustments${uniqueId}`}
                defaultChecked={props.correctedAge === props.chronologicalAge}
            />
            <label htmlFor={`both-${uniqueId}`}>Both Ages</label>
        </div>
    );
};
