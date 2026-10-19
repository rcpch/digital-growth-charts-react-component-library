import { AxisStyle, CentileStyle } from '../interfaces/StyleObjects';
import makeAllStyles from './makeAllStyles';

const makeStyles = (axisStyle: AxisStyle = {}, centileStyle: CentileStyle = {}) =>
    makeAllStyles({}, axisStyle, {}, centileStyle, {}, {}, 1, {});

describe('curve-label colour', () => {
    it('defaults to the same black as axis tick labels, not the curve stroke', () => {
        const styles = makeStyles({}, { centileStroke: '#ff0000', sdsStroke: '#00ff00' });
        expect(styles.centileLabel.fill).toBe('#000000');
        expect(styles.centileLabel.fill).toBe(styles.xTicklabel.fill);
        expect(styles.centileLabel.fill).toBe(styles.yAxis.tickLabels.fill);
        expect(styles.continuousCentile.data.stroke).toBe('#ff0000');
        expect(styles.sdsLine.data.stroke).toBe('#00ff00');
    });

    it('inherits the tick-label colour, independently of axis title and stroke colours', () => {
        const styles = makeStyles({
            tickLabelTextStyle: { colour: '#334455' },
            axisLabelTextStyle: { colour: '#887766' },
            axisStroke: '#112233',
        });
        expect(styles.centileLabel.fill).toBe('#334455');
        expect(styles.centileLabel.fill).toBe(styles.xTicklabel.fill);
        expect(styles.centileLabel.fill).toBe(styles.yAxis.tickLabels.fill);
    });

    it.each(['#006699', 'rebeccapurple', 'transparent'])('honours an explicit label colour: %s', (colour) => {
        const styles = makeStyles(
            { tickLabelTextStyle: { colour: '#334455' } },
            { centileTextStyle: { colour }, centileStroke: '#ff0000', sdsStroke: '#00ff00' },
        );
        expect(styles.centileLabel.fill).toBe(colour);
        expect(styles.xTicklabel.fill).toBe('#334455');
        expect(styles.continuousCentile.data.stroke).toBe('#ff0000');
        expect(styles.sdsLine.data.stroke).toBe('#00ff00');
    });
});
