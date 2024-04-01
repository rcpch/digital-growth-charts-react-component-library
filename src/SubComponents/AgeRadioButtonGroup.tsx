import * as React from 'react';

export const AgeRadioButtonGroup = (props: any) => {
    return (
        <div onChange={props.handleClick} className={props.className}>
            <input
                data-testid='adjusted'
                type="radio"
                id="adjusted"
                value="adjusted"
                name="adjustments"
                defaultChecked={props.correctedAge && props.chronologicalAge === false}
            />
            <label htmlFor="adjusted">Corrected Age</label>
            <input
                data-testid='unadjusted'
                type="radio"
                id="unadjusted"
                value="unadjusted"
                name="adjustments"
                defaultChecked={props.chronologicalAge && props.correctedAge === false}
            />
            <label htmlFor="unadjusted">Chronological Age</label>
            <input
                data-testid='both'
                type="radio"
                id="both"
                value="both"
                name="adjustments"
                defaultChecked={props.correctedAge === props.chronologicalAge}
            />
            <label htmlFor="both">Both Ages</label>
        </div>
    );
};