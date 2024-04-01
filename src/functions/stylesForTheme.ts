import { monochromeAxisStyles, monochromeChartStyles, monochromeGridlineStyle, monochromeCentileStyle, monochromeMeasurementStyle, monochromeSDSStyle } from '../testParameters/styles/monochromeStyles';
import { Tanner1AxisStyles, Tanner1ChartStyles, Tanner1GridlineStyles, Tanner1CentileStyles, Tanner1MeasurementStyles, Tanner1SDSStyles } from '../testParameters/styles/tanner1Styles';
import { Tanner2AxisStyles, Tanner2ChartStyles, Tanner2GridlineStyles, Tanner2CentileStyles, Tanner2MeasurementStyles, Tanner2SDSStyles } from '../testParameters/styles/tanner2Styles';
import { Tanner3AxisStyles, Tanner3ChartStyles, Tanner3GridlineStyles, Tanner3CentileStyles, Tanner3MeasurementStyles, Tanner3SDSStyles } from '../testParameters/styles/tanner3Styles';
import { traditionalBoyAxisStyles, traditionalBoyChartStyles, traditionalBoyGridlineStyles, traditionalBoyCentileStyles, traditionalBoyMeasurementStyles, traditionalBoySDSStyles } from '../testParameters/styles/traditionalBoysStyles';
import { traditionalGirlAxisStyles, traditionalGirlChartStyles, traditionalGirlGridlineStyles, traditionalGirlCentileStyles, traditionalGirlMeasurementStyles, traditionalGirlSDSStyles } from '../testParameters/styles/traditionalGirlsStyles';
import { ChartStyle, AxisStyle, GridlineStyle, CentileStyle, SDSStyle, MeasurementStyle } from '../interfaces/StyleObjects';
import { Exception } from 'sass';

export const stylesForTheme = (theme: 'monochrome' | 'traditional' | 'tanner1' | 'tanner2' | 'tanner3' | 'custom', sex: 'male' | 'female')=>{
    // Returns the styles objects for a theme. If custom is selected, monochrome is selected to be customized later
    let chartStyle:ChartStyle, axisStyle:AxisStyle, gridlineStyle:GridlineStyle, centileStyle:CentileStyle, sdsStyle:SDSStyle, measurementStyle:MeasurementStyle;

    switch (theme) {
        case 'monochrome' || 'custom':
            chartStyle = monochromeChartStyles
            axisStyle = monochromeAxisStyles
            gridlineStyle = monochromeGridlineStyle
            centileStyle = monochromeCentileStyle
            sdsStyle = monochromeSDSStyle
            measurementStyle = monochromeMeasurementStyle
            break;
        case 'traditional':
            if (sex === "male"){
                chartStyle = traditionalBoyChartStyles
                axisStyle = traditionalBoyAxisStyles
                gridlineStyle = traditionalBoyGridlineStyles
                centileStyle = traditionalBoyCentileStyles
                sdsStyle = traditionalBoySDSStyles
                measurementStyle = traditionalBoyMeasurementStyles
            }
            if (sex === "female"){
                chartStyle = traditionalGirlChartStyles
                axisStyle = traditionalGirlAxisStyles
                gridlineStyle = traditionalGirlGridlineStyles
                centileStyle = traditionalGirlCentileStyles
                sdsStyle = traditionalGirlSDSStyles
                measurementStyle = traditionalGirlMeasurementStyles
            }
            break;
        case 'tanner1':
            chartStyle = Tanner1ChartStyles
            axisStyle = Tanner1AxisStyles
            gridlineStyle = Tanner1GridlineStyles
            centileStyle = Tanner1CentileStyles
            sdsStyle = Tanner1SDSStyles
            measurementStyle = Tanner1MeasurementStyles
            break;
        case 'tanner2':
            chartStyle = Tanner2ChartStyles
            axisStyle = Tanner2AxisStyles
            gridlineStyle = Tanner2GridlineStyles
            centileStyle = Tanner2CentileStyles
            sdsStyle = Tanner2SDSStyles
            measurementStyle = Tanner2MeasurementStyles
            break;
        case 'tanner3':
            chartStyle = Tanner3ChartStyles
            axisStyle = Tanner3AxisStyles
            gridlineStyle = Tanner3GridlineStyles
            centileStyle = Tanner3CentileStyles
            sdsStyle = Tanner3SDSStyles
            measurementStyle = Tanner3MeasurementStyles
            break;
        default:
            throw new Error("Please select a valid theme or select custom.");
    }
    
    return { chartStyle, axisStyle,gridlineStyle,centileStyle,sdsStyle,measurementStyle };

}