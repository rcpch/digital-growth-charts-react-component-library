import * as React from 'react';
import { useState, useLayoutEffect, useMemo, MouseEvent, useRef } from 'react';
import {
    // libraries
    createContainer,
    VictoryChart,
    VictoryGroup,
    VictoryLine,
    VictoryScatter,
    VictoryVoronoiContainerProps,
    VictoryZoomContainerProps,
    VictoryTooltip,
    VictoryAxis,
    VictoryLabel,
    VictoryArea,
    Rect,
    DomainPropType,
} from 'victory';

// helper functions
import { getDomainsAndData, getVisibleData } from '../functions/getDomainsAndData';
import { yAxisLabel } from '../functions/yAxisLabel';
import xAxisLabel from '../functions/xAxisLabel';
import tailoredXTickValues from '../functions/tailoredXTickValues';
import defaultToggles from '../functions/defaultToggles';
import { tooltipText } from '../functions/tooltips';
import { delayedPubertyThreshold, makePubertyThresholds, lowerPubertyBorder } from '../functions/DelayedPuberty';
import { getFilteredMidParentalHeightData } from '../functions/getFilteredMidParentalHeightData';

// interfaces & props
import { CentileChartProps } from './CentileChart.types';
import { ICentile } from '../interfaces/CentilesObject';
import { Measurement } from '../interfaces/RCPCHMeasurementObject';

// components/subcomponents
import { XPoint } from '../SubComponents/XPoint';
import CustomGridComponent from '../SubComponents/CustomGridComponent';
import RenderTickLabel from '../SubComponents/RenderTickLabel';
import { TitleContainer } from '../SubComponents/TitleContainer';
import { StyledRadioButtonGroup } from '../SubComponents/StyledRadioButtonGroup';
import { StyledResetZoomButton } from '../SubComponents/StyledResetZoomButton';
import { StyledButtonTooltip } from '../SubComponents/StyledButtonTooltip';
import { ButtonContainer } from '../SubComponents/ButtonContainer';
import { TwoButtonContainer } from '../SubComponents/TwoButtonContainer';
import { ChartTitle } from '../SubComponents/ChartTitle';
import { LogoContainer } from '../SubComponents/LogoContainer';
import { VersionLabel } from '../SubComponents/VersionLabel';
import { MainContainer } from '../SubComponents/MainContainer';

// RCPCH Icon:
import icon from '../images/icon.png';
import ukca from '../images/ukca.png';
import { isCrowded } from '../functions/isCrowded';
import { EventCaret } from '../SubComponents/EventCaret';
import { StyledShareButton } from '../SubComponents/StyledShareButton';
import { StyledFullScreenButton } from '../SubComponents/StyledFullScreenButton';
import { ShareButtonWrapper } from '../SubComponents/ShareButtonWrapper';
import { FullScreenButtonWrapper } from '../SubComponents/FullScreenButtonWrapper';
import { ShareIcon } from '../SubComponents/ShareIcon';
import { CopiedLabel } from '../SubComponents/CopiedLabel';
import { ChartContainer } from '../SubComponents/ChartContainer';
import { FullScreenIcon } from '../SubComponents/FullScreenIcon';
import { CloseFullScreenIcon } from '../SubComponents/CloseFullScreenIcon';
import { ResetZoomContainer } from '../SubComponents/ResetZoomContainer';
import { labelAngle } from '../functions/labelAngle';
import addOrdinalSuffix from '../functions/addOrdinalSuffix';
import { labelIndexInterval } from '../functions/labelIndexInterval';
import { referenceText } from '../functions/referenceText';

// allows two top level containers: zoom and voronoi
const VictoryZoomVoronoiContainer = createContainer<VictoryZoomContainerProps, VictoryVoronoiContainerProps>(
    'zoom',
    'voronoi',
);

const shadedTermAreaText =
    'Babies born in this shaded area\nare term. It is normal for\nbabies to lose weight over\nthe first two weeks of life.\nMedical review should be sought\nif weight has dropped by more\nthan 10% of birth weight or\nweight is still below birth weight\nthree weeks after birth.';

function CentileChart({
    chartsVersion,
    reference,
    title,
    subtitle,
    measurementMethod,
    sex,
    childMeasurements,
    midParentalHeightData,
    enableZoom,
    styles,
    enableExport,
    exportChartCallback,
    clinicianFocus,
    showCentileLabels,
    showSDSLabels
}: CentileChartProps) {
    const [userDomains, setUserDomains] = useState(null);

    const [storedChildMeasurements, setStoredChildMeasurements] = useState(childMeasurements)
    const { defaultShowCorrected, defaultShowChronological, showToggle } = defaultToggles(childMeasurements);
    const [showChronologicalAge, setShowChronologicalAge] = useState(defaultShowChronological);
    const [showCorrectedAge, setShowCorrectedAge] = useState(defaultShowCorrected);
    const chartRef=useRef<any>();
    const [active, setActive] = useState(false);
    const [fullScreen, setFullScreen]=useState(true);

    let { bmiSDSData, centileData, computedDomains, chartScaleType } = useMemo(
        () =>
            getDomainsAndData(
                storedChildMeasurements,
                sex,
                measurementMethod,
                reference,
                showCorrectedAge,
                showChronologicalAge
            ),
        [storedChildMeasurements, sex, measurementMethod, reference, showCorrectedAge, showChronologicalAge],
    );


    const updatedData = useMemo(() => getVisibleData(sex, measurementMethod, reference, userDomains), [
        sex,
        measurementMethod,
        reference,
        userDomains,
    ]);

    // get the highest reference index of visible centile data
    let maxVisibleReferenceIndex: number = null;
    let minimumArrayLength;
    centileData.forEach((item,index)=>{
        switch (index) {
            case 0:
                minimumArrayLength = 3; // neonates label gap
                break;
            case 1:
                minimumArrayLength = 4; // infants label gap
                break;
            case 2:
                minimumArrayLength = 6; // small child label gap
                break;
            case 3:
                minimumArrayLength = 15; // large child label gap
                break;
            default:
                minimumArrayLength = 6;
                break;
        }
        if (item[0].data.length > minimumArrayLength){
            maxVisibleReferenceIndex = index;
        }
    });

    const allowZooming = storedChildMeasurements.length > 0 && enableZoom ? true : false;

    const domains = userDomains || computedDomains;

    const isChartCrowded = isCrowded(domains, childMeasurements);

    let pubertyThresholds: null | any[] = null;

    if (reference === 'uk-who' && measurementMethod === 'height') {
        pubertyThresholds = makePubertyThresholds(domains, sex);
    }

    const filteredMidParentalHeightData = useMemo(() => getFilteredMidParentalHeightData(reference, childMeasurements, midParentalHeightData, sex),[
        reference,
        childMeasurements,
        midParentalHeightData,
        sex
    ]);

    // Create the shaded area at term
    let termAreaData: null | any[] = null;

    if (
        childMeasurements[0]?.birth_data.gestation_weeks >= 37 &&
        measurementMethod === 'weight' &&
        reference === 'uk-who' &&
        domains?.x[0] < 0.038329911019849415 && // 2 weeks postnatal
        domains?.x[1] >= -0.057494866529774126 // 37 weeks gest
    ) {
        termAreaData = [
            {
                x: -0.057494866529774126,
                y: domains.y[1],
                y0: domains.y[0],
                l: shadedTermAreaText,
            },
            {
                x: 0.038329911019849415,
                y: domains.y[1],
                y0: domains.y[0],
                l: shadedTermAreaText,
            },
        ];
    }

    // cut and paste action
    const exportPressed = () => {
        if (enableExport) {
            setActive(true);
            exportChartCallback(chartRef.current.firstChild) // this passes the raw SVG back to the client for converting
        }
    }

    // label fade on cut
    const labelFadeEnd = () => {
        setActive(false);
    }

    // full screen button action
    const fullScreenPressed = () => {
        setFullScreen(!fullScreen);
        fullScreen ? setStoredChildMeasurements([]) : setStoredChildMeasurements(childMeasurements);
    }

    // toggle between corrected/uncorrected/both
    const onSelectRadioButton = (event: MouseEvent<HTMLButtonElement>) => {
        switch ((event.target as HTMLInputElement).value) {
            case 'unadjusted':
                setShowChronologicalAge(true);
                setShowCorrectedAge(false);
                break;
            case 'adjusted':
                setShowChronologicalAge(false);
                setShowCorrectedAge(true);
                break;
            case 'both':
                setShowChronologicalAge(true);
                setShowCorrectedAge(true);
                break;
            default:
                console.warn('Fall through case on toggle adjusted age function');
        }
        setUserDomains(null);
    };

    const handleZoomChange = (domain: DomainPropType) => {
        setUserDomains(domain);
    };


    // always reset zoom to default when measurements array changes
    useLayoutEffect(() => {
        setUserDomains(null);
    }, [storedChildMeasurements]);

    return (
        <MainContainer>
            <LogoContainer>
                <div>
                    <img src={icon} width={24} height={24} />
                    <VersionLabel
                        fontFamily={styles.chartTitle.fontFamily}
                    >{chartsVersion}</VersionLabel>
                </div>
                <img src={ukca} width={18} height={18}/>
            </LogoContainer>

            <TitleContainer>
                <ChartTitle {...styles.chartTitle}>{title}</ChartTitle>
                <ChartTitle {...styles.chartSubTitle}>{subtitle}</ChartTitle>
            </TitleContainer>

            <ChartContainer>

                {/* The VictoryChart is the parent component. It contains a Voronoi container, which groups data sets together for the purposes of tooltips */}
                {/* It has an animation object and the domains are the thresholds of ages rendered. This is calculated from the child data supplied by the user. */}
                {/* Tooltips are here as it is the parent component. More information of tooltips in centiles below. */}

                <VictoryChart
                    width={styles.chartWidth}
                    height={styles.chartHeight-35}
                    padding={styles.chartPadding}
                    style={styles.chartMisc}
                    domain={computedDomains}
                    containerComponent={
                        <VictoryZoomVoronoiContainer
                            containerRef={ref => { chartRef.current=ref} }
                            allowZoom={allowZooming}
                            allowPan={allowZooming}
                            onZoomDomainChange={handleZoomChange}
                            zoomDomain={domains}
                            labelComponent={
                                <VictoryTooltip
                                    data-testid='tooltip'
                                    constrainToVisibleArea
                                    pointerLength={5}
                                    cornerRadius={0}
                                    flyoutStyle={styles.toolTipFlyout}
                                    style={styles.toolTipMain}
                                />
                            }
                            labels={({ datum }) => {
                                // This the tool tip text, and accepts a large number of arguments
                                // tool tips return contextual information for each datapoint, as well as the centile
                                // and SDS lines, as well as bone ages, events and midparental heights
                                    return tooltipText(
                                        reference,
                                        measurementMethod,
                                        datum,
                                        midParentalHeightData,
                                        clinicianFocus,
                                        sex
                                    )
                                }
                            }
                            voronoiBlacklist={['linkLine', 'chronologicalboneagelinkline', 'correctedboneagelinkline', 'areaMPH']}
                        />
                    }
                >

                    {
                        /* Term child shaded area: */
                        termAreaData !== null && <VictoryArea style={styles.termArea} data={termAreaData} />
                    }

                    {/* X axis: */}
                    <VictoryAxis
                        label={xAxisLabel(chartScaleType, domains)}
                        style={styles.xAxis}
                        tickValues={tailoredXTickValues[chartScaleType]}
                        tickLabelComponent={
                            <RenderTickLabel
                                specificStyle={styles.xTicklabel}
                                chartScaleType={chartScaleType}
                                domains={domains}
                            />
                        }
                        gridComponent={<CustomGridComponent chartScaleType={chartScaleType} />}
                    />

                    {
                        /* render the y axis */
                        <VictoryAxis
                            minDomain={0}
                            label={yAxisLabel(measurementMethod, false)}
                            style={styles.yAxis}
                            dependentAxis
                        />
                    }

                    {/* This is the shaded area below the 0.4th centile in late childhood/early adolescence */}
                    {/* Any measurements plotting here are likely due to delayed puberty */}
                    {/* The upper border is the 0.4th centile so this must come before the centiles */}

                    {
                        // delayed puberty area:
                        pubertyThresholds !== null && (
                            <VictoryArea
                                data={delayedPubertyThreshold(sex)}
                                y0={(d: any) => lowerPubertyBorder(d, sex)}
                                style={styles.delayedPubertyArea}
                                name="delayed"
                            />
                        )
                    }

                    {/*
                    midparental height centiles
                    These are three lines, the MPH centile, a centile 2SD above it, and another 2SD below
                    There is an area fill between the highest and lowest
                    */
                    }

                    { reference==="uk-who" && measurementMethod==="height" &&  filteredMidParentalHeightData &&

                        filteredMidParentalHeightData.map((reference, index)=>{

                            // this function filters the midparental height centile data to only those values
                            // one month either side of the most recent measurement, or 20 y if no measurements
                            // supplied.

                            const lowerData = reference.lowerParentalCentile;
                            const midData = reference.midParentalCentile;
                            const upperData = reference.upperParentalCentile;

                            return (
                                <VictoryGroup key={'midparentalCentileDataBlock' + index}>
                                    {   upperData.map((centile: ICentile, centileIndex: number)=>{
                                        // area lower and and upper boundaries
                                        const newData: any = centile.data.map((data, index) => {
                                            let o: any = Object.assign({}, data)
                                            o.y0 = lowerData[centileIndex].data[index].y
                                            return o;
                                        })
                                            return (
                                                <VictoryArea
                                                    name="areaMPH"
                                                    key={centile.centile+'-area-'+centileIndex}
                                                    data={newData}
                                                    style={{...styles.midParentalArea}}
                                                />
                                            )
                                        })
                                    }
                                    {   lowerData.map((lowercentile: ICentile, centileIndex: number) => {
                                            return (
                                                <VictoryLine
                                                    name="lowerCentileMPH"
                                                    key={lowercentile.centile + '-' + centileIndex}
                                                    padding={{ top: 20, bottom: 20 }}
                                                    data={lowercentile.data}
                                                    style={styles.midParentalCentile}
                                                />
                                            );
                                    })}
                                    {midData.map((centile: ICentile, centileIndex: number) => {
                                            return (
                                                <VictoryLine
                                                    name="centileMPH"
                                                    key={centile.centile + '-' + centileIndex}
                                                    padding={{ top: 20, bottom: 20 }}
                                                    data={centile.data}
                                                    style={styles.midParentalCentile}
                                                />
                                            );
                                    })}
                                    {upperData.map((uppercentile: ICentile, centileIndex: number) => {
                                            return (
                                                <VictoryLine
                                                    name="upperCentileMPH"
                                                    key={uppercentile.centile + '-' + centileIndex}
                                                    padding={{ top: 20, bottom: 20 }}
                                                    data={uppercentile.data}
                                                    style={styles.midParentalCentile}
                                                />
                                            );
                                    })}

                                </VictoryGroup>
                            );
                        })
                    }

                    {/* Render the centiles - loop through the data set, create a line for each centile */}
                    {/* On the old charts the 50th centile was thicker and darker and this lead parents to believe it was therefore */}
                    {/* the line their children should follow. This was a design mistake, since it does not matter which line the child is on  */}
                    {/* so long as they follow it. The middle line was therefore 'de-emphasised' on the newer charts. */}
                    {/* For each reference data set, there are 9 centiles. The 0.4th, 9th, 50th, 91st, 99.6th are all dashed. */}
                    {/* The 2nd, 25th, 75th, 98th are all continuous lines. As there are 4 datasets, this means 36 separate line series to render. */}
                    {/* It is essential each centile from each reference is plotted as a series to prevent interpolation between centiles of one reference  */}
                    {/* and centiles of another. The discontinuous lines reflect the transition between references and are essential */}
                    {/* One final line is the VictoryArea, which represents the shaded area at the onset of puberty. Children that plot here */}
                    {/* will have delayed puberty. */}
                    {/* Tooltips are found in the parent element (VictoryChart). Tooltips included: */}
                    {/* 1 for each centile, 1 for the shaded area, 1 at 2years to indicate children are measured standing leading */}
                    {/* to a step down in height weight and bmi in the data set. There is another tool tip at 4 years to indicate transition from datasets. */}

                    {centileData &&
                        centileData.map((referenceData, referenceIndex) => {

                            return (
                                <VictoryGroup
                                    key={'centileDataBlock' + referenceIndex}
                                    name='centileLineGroup'
                                >
                                    {referenceData.map((centile: ICentile, centileIndex: number) => {

                                        // BMI charts also have SDS lines at -5, -4, -3, -2, 2, 3, 4, 5

                                        if (centileIndex % 2 === 0) {
                                            // even index - centile is dashed

                                            return (
                                                <VictoryLine
                                                    data-testid='evenCentileLine'
                                                    name={'centileLine-'+ centileIndex}
                                                    key={centile.centile + '-' + centileIndex}
                                                    padding={{ top: 20, bottom: 20 }}
                                                    data={centile.data}
                                                    style={styles.dashedCentile}
                                                    labels={ (props: { index: number; }) => showCentileLabels && labelIndexInterval(chartScaleType, props.index) && props.index > 0 ? [addOrdinalSuffix(centile.centile)]: null}
                                                    labelComponent={
                                                        <VictoryLabel
                                                            angle={
                                                                ({index})=>{
                                                                    return labelAngle(centile.data, index, chartScaleType);
                                                                }
                                                            }
                                                            style={styles.centileLabel}
                                                            backgroundStyle={{fill:'white'}}
                                                            backgroundPadding={{top: 0, bottom: 0, left: 3, right:3}}
                                                            textAnchor={'middle'}
                                                            verticalAnchor={'middle'}
                                                            dy={0}
                                                        />
                                                    }
                                                />
                                            );
                                        } else {
                                            // uneven index - centile is continuous
                                            return (
                                                <VictoryLine
                                                    data-testid='unevenCentileLine'
                                                    name={'centileLine-'+ centileIndex}
                                                    key={centile.centile + '-' + centileIndex}
                                                    padding={{ top: 20, bottom: 20 }}
                                                    data={centile.data}
                                                    style={styles.continuousCentile}
                                                    labels={ (props: { index: number; })=> showCentileLabels && labelIndexInterval(chartScaleType, props.index) && props.index > 0 ? [addOrdinalSuffix(centile.centile)]: null}
                                                    labelComponent={
                                                        <VictoryLabel
                                                            angle={
                                                                ({index})=>{
                                                                    return labelAngle(centile.data, index, chartScaleType);
                                                                }
                                                            }
                                                            style={styles.centileLabel}
                                                            backgroundStyle={{fill:'white'}}
                                                            backgroundPadding={{top: 0, bottom: 0, left: 3, right:3}}
                                                            textAnchor={'middle'}
                                                            verticalAnchor={'middle'}
                                                            dy={0}
                                                        />
                                                    }
                                                />
                                            );
                                        }
                                    })}
                                </VictoryGroup>
                            );
                        })
                    }

                    {
                        /* BMI SDS lines */
                        measurementMethod === "bmi" && bmiSDSData &&
                            bmiSDSData.map((sdsReferenceData, index) => {
                                return (
                                    <VictoryGroup
                                        key={'sdsDataBlock' + index}
                                        name='sdsLineGroup'
                                    >
                                        {sdsReferenceData.map((sdsLine: ICentile, sdsIndex: number) => {

                                            // BMI charts have SDS lines at -5, -4, -3, 3, 3.33, 3.67, 4

                                                // sds line is dashed
                                                return (
                                                    <VictoryLine
                                                        name={'sdsLine-'+ sdsIndex}
                                                        key={sdsLine.sds + '-' + sdsIndex}
                                                        padding={{ top: 20, bottom: 20 }}
                                                        data={sdsLine.data}
                                                        style={styles.sdsLine}
                                                        labels={ (props: { index: number; })=> showSDSLabels && labelIndexInterval(chartScaleType, props.index) && props.index > 0 ? [sdsLine.sds]: null}
                                                        labelComponent={
                                                            <VictoryLabel
                                                                angle={
                                                                    ({index})=>{
                                                                        return labelAngle(sdsLine.data, index, chartScaleType);
                                                                    }
                                                                }
                                                                style={{fill: styles.sdsLine.data.stroke, fontSize: 10.0}}
                                                                backgroundStyle={{fill:'white'}}
                                                                textAnchor={'end'}
                                                                dy={5}
                                                            />
                                                        }
                                                    />
                                                );

                                        })}
                                    </VictoryGroup>
                                )
                            })
                    }


                    {
                        // puberty threshold lines uk90:
                        pubertyThresholds !== null &&
                            pubertyThresholds.map((dataArray) => {
                                if (dataArray[0].x > domains.x[0] && dataArray[1].x < domains.x[1]) {
                                    return (
                                        <VictoryLine
                                            key={dataArray[0].x}
                                            name={`puberty-${dataArray[0].x}`}
                                            style={styles.delayedPubertyThresholdLine}
                                            data={dataArray}
                                            labelComponent={
                                                <VictoryLabel
                                                    textAnchor="start"
                                                    angle={-90}
                                                    dx={5}
                                                    dy={10}
                                                    style={styles.delayedPubertyThresholdLabel}
                                                />
                                            }
                                        />
                                    );
                                } else {
                                    return null;
                                }
                            })
                    }

                    {/* create a series for each child measurements data point: a circle for chronological age, a cross for corrected */}
                    {/* If data points are close together, reduce the size of the point */}

                    {childMeasurements.map((childMeasurement: Measurement, index) => {
                        if (
                            childMeasurement.measurement_calculated_values.corrected_measurement_error ||
                            childMeasurement.measurement_calculated_values.chronological_measurement_error
                        ) {
                            return null;
                        }

                        const chronData: any = {
                            age_type: 'chronological_age',
                            age_error: childMeasurement.measurement_dates.chronological_decimal_age_error,
                            b: childMeasurement.bone_age.bone_age,
                            bone_age_label: childMeasurement.bone_age.bone_age_text,
                            bone_age_sds: childMeasurement.bone_age.bone_age_sds,
                            bone_age_centile: childMeasurement.bone_age.bone_age_centile,
                            bone_age_type: childMeasurement.bone_age.bone_age_type,
                            calendar_age: childMeasurement.measurement_dates.chronological_calendar_age,
                            gestational_age: childMeasurement.measurement_dates.corrected_gestational_age,
                            centile: childMeasurement.measurement_calculated_values.chronological_centile,
                            centile_band: childMeasurement.measurement_calculated_values.chronological_centile_band,
                            clinician_comment: childMeasurement.measurement_dates.comments.clinician_chronological_decimal_age_comment,
                            lay_comment: childMeasurement.measurement_dates.comments.lay_chronological_decimal_age_comment,
                            observation_date: new Date(childMeasurement.measurement_dates.observation_date).toLocaleDateString('en-UK'),
                            observation_value_error: childMeasurement.child_observation_value.observation_value_error,
                            x: childMeasurement.measurement_dates.chronological_decimal_age,
                            y: childMeasurement.child_observation_value.observation_value,
                            sds: childMeasurement.measurement_calculated_values.chronological_sds
                        };
                        const correctData: any = {
                            age_type: 'corrected_age',
                            age_error: childMeasurement.measurement_dates.corrected_decimal_age_error,
                            b: childMeasurement.bone_age.bone_age,
                            bone_age_label: childMeasurement.bone_age.bone_age_text,
                            bone_age_sds: childMeasurement.bone_age.bone_age_sds,
                            bone_age_centile: childMeasurement.bone_age.bone_age_centile,
                            bone_age_type: childMeasurement.bone_age.bone_age_type,
                            calendar_age: childMeasurement.measurement_dates.corrected_decimal_age < 0.0383 ? childMeasurement.measurement_dates.chronological_calendar_age : childMeasurement.measurement_dates.corrected_calendar_age, // calendar age not corrected if < EDD
                            gestational_age: childMeasurement.measurement_dates.corrected_gestational_age,
                            centile: childMeasurement.measurement_calculated_values.corrected_centile,
                            centile_band: childMeasurement.measurement_calculated_values.corrected_centile_band,
                            clinician_comment: childMeasurement.measurement_dates.comments.clinician_corrected_decimal_age_comment,
                            lay_comment: childMeasurement.measurement_dates.comments.lay_corrected_decimal_age_comment,
                            observation_date: new Date(childMeasurement.measurement_dates.observation_date).toLocaleDateString('en-UK'),
                            observation_value_error: childMeasurement.child_observation_value.observation_value_error,
                            x: childMeasurement.measurement_dates.corrected_decimal_age,
                            y: childMeasurement.child_observation_value.observation_value,
                            sds: childMeasurement.measurement_calculated_values.corrected_sds
                        };


                        if (isChartCrowded) {
                            chronData.size = 1.5;
                            correctData.size = 1.5;
                        } else {
                            chronData.size = 3;
                            correctData.size = 3;
                        }

                        return (
                            <VictoryGroup key={'measurement' + index}>

                                { childMeasurement.events_data.events_text && childMeasurement.events_data.events_text.length > 0 && (

                                        showChronologicalAge && !showCorrectedAge ?
                                        // Events against chronological age only if corrected age not showing
                                        <VictoryScatter
                                            name="eventcaret"
                                            data={[{x: childMeasurement.measurement_dates.chronological_decimal_age, y: childMeasurement.child_observation_value.observation_value}]}
                                            dataComponent={
                                                <EventCaret
                                                    eventsText={childMeasurement.events_data.events_text}
                                                />
                                            }
                                        />
                                        :
                                        // Events against corrected age
                                        <VictoryScatter
                                            name="eventcaret"
                                            data={[{x: childMeasurement.measurement_dates.corrected_decimal_age, y: childMeasurement.child_observation_value.observation_value}]}
                                            dataComponent={
                                                <EventCaret
                                                    eventsText={childMeasurement.events_data.events_text}
                                                />
                                            }
                                        />
                                    )
                                }

                                { showChronologicalAge && childMeasurement.bone_age.bone_age && ( showChronologicalAge || showCorrectedAge ) && !( showCorrectedAge && showChronologicalAge ) && // bone age linked to chronological age
                                    <VictoryScatter // bone age
                                        name="chronologicalboneage"
                                        data={[chronData]}
                                        x={"b"}
                                        y={"y"}
                                        size={15}
                                        dataComponent={
                                            <XPoint
                                                isBoneAge={true}
                                                colour={styles.measurementPoint.data.fill}
                                            />
                                        }
                                    />
                                }

                                { showCorrectedAge && childMeasurement.bone_age.bone_age &&  // bone age linked to corrected age
                                    <VictoryScatter // bone age
                                        name="correctedboneage"
                                        data={[correctData]}
                                        x={"b"}
                                        y={"y"}
                                        size={15}
                                        dataComponent={
                                            <XPoint
                                                isBoneAge={true}
                                                colour={styles.measurementPoint.data.fill}
                                            />
                                        }
                                    />
                                }
                                { showChronologicalAge && !showCorrectedAge && childMeasurement.bone_age.bone_age &&// bone age line linked to chronological age
                                    <VictoryLine // bone age link line
                                        name="chronologicalboneagelinkline"
                                        data={[{x: chronData.x, y: chronData.y}, {x: chronData.b, y: chronData.y}]}
                                        style={{
                                            data: {
                                                strokeWidth: 2,
                                                stroke: '#A9A9A9',
                                                strokeDasharray: '3, 3',
                                            }
                                        }}
                                    />
                                }

                                { showCorrectedAge && childMeasurement.bone_age.bone_age && // bone age line linked to corrected age
                                    <VictoryLine // bone age link line
                                        name="correctedboneagelinkline"
                                        data={[{x: correctData.x, y: correctData.y}, {x: correctData.b, y: correctData.y}]}
                                        style={{
                                            data: {
                                                strokeWidth: 2,
                                                stroke: '#A9A9A9',
                                                strokeDasharray: '3, 3',
                                            }
                                        }}
                                    />
                                }
                                { showChronologicalAge && (
                                    <VictoryScatter // chronological age
                                        data-testid='chronologicalMeasurementPoint'
                                        data={[chronData]}
                                        symbol="circle"
                                        style={styles.measurementPoint}
                                        name="chronological_age"
                                    />
                                )}
                                { showCorrectedAge && (
                                    <VictoryScatter // corrected age - a custom component that renders a cross
                                        data-testid='correctedMeasurementXPoint'
                                        data={[correctData]}
                                        dataComponent={
                                            <XPoint
                                                isBoneAge={false}
                                                colour={styles.measurementPoint.data.fill}
                                            />
                                        }
                                        style={styles.measurementPoint}
                                        name="corrected_age"
                                    />
                                )}
                                { showChronologicalAge &&
                                    showCorrectedAge && ( // only show the line if both cross and dot are rendered
                                        <VictoryLine
                                            name="linkLine"
                                            style={styles.measurementLinkLine}
                                            data={[chronData, correctData]}
                                        />
                                )}
                            </VictoryGroup>
                        );
                    })}
                </VictoryChart>
                <ChartTitle
                    fontSize={8}
                    fontFamily={'Montserrat'}
                    color={'#000000'}
                    fontWeight={'200'}
                    fontStyle='normal'
                >{referenceText(reference)}</ChartTitle>
            </ChartContainer>

            {(showToggle || allowZooming || enableExport || childMeasurements.length > 0) && (

                <ButtonContainer>

                    <TwoButtonContainer>
                    {/* Creates the Zoom to see whole lifespan button */}
                    { childMeasurements.length > 0 &&
                            <FullScreenButtonWrapper>
                                <StyledButtonTooltip>
                                    <StyledFullScreenButton
                                        onClick={()=> fullScreenPressed()}
                                        $color={styles.toggleStyle.activeColour}
                                        size={5}
                                    >
                                        { fullScreen ?
                                            <FullScreenIcon/>
                                            :
                                            <CloseFullScreenIcon/>
                                        }
                                    </StyledFullScreenButton>
                                    <div className='tooltip'>Toggle Full Lifespan</div>
                                </StyledButtonTooltip>
                            </FullScreenButtonWrapper>
                    }

                    {/* Creates the Copy button */}
                    { enableExport && (
                            <ShareButtonWrapper>
                                    <StyledButtonTooltip>
                                        <StyledShareButton
                                            $color={styles.toggleStyle.activeColour}
                                            size={5}
                                            onClick={exportPressed}
                                        >
                                            <ShareIcon/>
                                        </StyledShareButton>
                                        <div className='tooltip'>Copy Graph</div>
                                    </StyledButtonTooltip>
                                    <CopiedLabel
                                        $active={active}
                                        onAnimationEnd={labelFadeEnd}
                                    >
                                        Copied!
                                    </CopiedLabel>
                            </ShareButtonWrapper>
                        )
                    }

                    </TwoButtonContainer>

                    {showToggle && (
                            <StyledRadioButtonGroup
                                $activeColour={styles.toggleStyle.activeColour}
                                $inactiveColour={styles.toggleStyle.inactiveColour}
                                $fontFamily={styles.toggleStyle.fontFamily}
                                $fontSize={styles.toggleStyle.fontSize}
                                $fontWeight={styles.toggleStyle.fontWeight}
                                $fontStyle={styles.toggleStyle.fontStyle}
                                $color={styles.toggleStyle.color}
                                $className={"toggleButtons"}
                                handleClick={onSelectRadioButton}
                                correctedAge={showCorrectedAge}
                                chronologicalAge={showChronologicalAge}
                            />
                        )
                    }

                    {/* {allowZooming && ( */}
                            <ResetZoomContainer
                                $isHidden={!allowZooming}
                        >
                                <StyledResetZoomButton
                                    $activeColour={styles.toggleStyle.activeColour}
                                    $inactiveColour={styles.toggleStyle.inactiveColour}
                                    $fontFamily={styles.toggleStyle.fontFamily}
                                    $fontSize={styles.toggleStyle.fontSize}
                                    $fontWeight={styles.toggleStyle.fontWeight}
                                    $fontStyle={styles.toggleStyle.fontStyle}
                                    $color={styles.toggleStyle.color}
                                    $margin={styles.toggleStyle.margin}
                                    $enabled={userDomains !== null}
                                    onClick={() => setUserDomains(null)}
                                >
                                    Reset Zoom
                                </StyledResetZoomButton>
                            </ResetZoomContainer>
                        {/* )
                    } */}
                </ButtonContainer>
            )}
        </MainContainer>
    );
}

export default CentileChart;
