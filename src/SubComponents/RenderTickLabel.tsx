import * as React from 'react';

function RenderTickLabel(props: any) {
    const x = props.x;
    const y = props.y;
    const text = props.text;
    const style = props.specificStyle;
    const chartScaleType = props.chartScaleType;
    const lowerX = props.domains.x[0];

    const tickColour = style.fill === '000000' ? 'black' : style.fill;

    // Creates a dashed tick to be used to increment the timespan along the x axis
    const Dash = () => {
        return (
            <svg>
                <line x1={x} x2={x} y1={y - 6} y2={y - 3} stroke={tickColour} />
            </svg>
        );
    };
    // Creates a lollipop to display the number of months along the x axis
    const LolliPop = ({ textLabel }: { textLabel: number }) => {
        if (text !== lowerX) {
            return (
                <svg>
                    <g>
                        <title>
                            {textLabel} month{textLabel > 1 ? `s` : null}{' '}
                        </title>
                        <text
                            x={x}
                            y={y - 18}
                            textAnchor="middle"
                            fill={tickColour}
                            fontSize={style.fontSize}
                            fontFamily={style.fontFamily}
                        >
                            {textLabel}
                        </text>
                        <circle cx={x} cy={y - 21} r={7} stroke={tickColour} fill="transparent" />
                        <line x1={x} x2={x} y1={y - 3} y2={y - 14} stroke={tickColour} />
                    </g>
                </svg>
            );
        } else {
            return null;
        }
    };
    const PlainAxisLabel = ({ textLabel }: { textLabel: number }) => {
        return (
            <svg>
                <g>
                    <line x1={x} x2={x} y1={y - 6} y2={y - 3} stroke={tickColour} />
                    <text
                        x={x}
                        y={y + 8}
                        textAnchor="middle"
                        fill={tickColour}
                        fontSize={style.fontSize}
                        fontFamily={style.fontFamily}
                    >
                        {textLabel}
                    </text>
                </g>
            </svg>
        );
    };

    const gestWeeks = 40 + Math.round(text * 52.18);
    const weeks = Math.round(text * 52.18);
    const months = Math.round(text * 12);

    const isAllGestWeeks = (arrayNumber: number) => arrayNumber < 0.0384 && arrayNumber !== -0.33;
    const isEvenGestWeeks = (arrayNumber: number) => {
        const rounded = Number((text * 52.18).toFixed(2));
        return arrayNumber < 0 && Number.isInteger(rounded) && rounded % 2 === 0;
    };
    const isEvenWeeks = (arrayNumber: number) => Number.isInteger(Number((arrayNumber * 52.18).toFixed(2)));
    const isMonths = (arrayNumber: number) => Number.isInteger(Number((arrayNumber * 12).toFixed(2)));
    const isYears = (arrayNumber: number) => Number.isInteger(arrayNumber);

    switch (chartScaleType) {
        case 'prem':
            if (isAllGestWeeks(text)) {
                return <PlainAxisLabel textLabel={gestWeeks} />;
            } else if (isEvenWeeks(text)) {
                return <PlainAxisLabel textLabel={weeks} />;
            } else if (isMonths(text)) {
                return <LolliPop textLabel={months} />;
            } else {
                return null;
            }
        case 'infant':
            if (isMonths(text) && text !== 0 && text !== 1) {
                return <LolliPop textLabel={months} />;
            } else if (isEvenGestWeeks(text)) {
                return <PlainAxisLabel textLabel={gestWeeks} />;
            } else if (text === 1) {
                return (
                    <>
                        <LolliPop textLabel={months} />
                        <PlainAxisLabel textLabel={52} />
                    </>
                );
            } else if (isEvenWeeks(text)) {
                return <PlainAxisLabel textLabel={weeks} />;
            } else {
                return null;
            }
        case 'smallChild':
            if (text <= 4 && isMonths(text) && isYears(text)) {
                return (
                    <>
                        <LolliPop textLabel={months} />
                        <PlainAxisLabel textLabel={text} />
                    </>
                );
            } else if (text <= 4 && isMonths(text)) {
                return <LolliPop textLabel={months} />;
            } else if (isYears(text)) {
                return <PlainAxisLabel textLabel={text} />;
            } else if (Number.isInteger(text * 2)) {
                return <Dash />;
            } else {
                return null;
            }
        case 'biggerChild':
            if (isYears(text)) {
                return <PlainAxisLabel textLabel={text} />;
            } else if (Number.isInteger(text * 2)) {
                return <Dash />;
            } else {
                return null;
            }
        default:
            console.error('No valid chartScaleType picked up by RenderTickLabel ');
            return null;
    }
}

export default RenderTickLabel;
