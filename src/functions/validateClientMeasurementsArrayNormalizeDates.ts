import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';
import { Measurement } from '../interfaces/RCPCHMeasurementObject';
// Simple date validator / normaliser
const DATE_REGEX_PLAIN = /^\d{4}-\d{2}-\d{2}$/;

type MeasurementKey = keyof ClientMeasurementObject;
const MEASUREMENT_KEYS: MeasurementKey[] = ['height', 'weight', 'bmi', 'ofc'];

function normaliseDate(raw: any, field: string, idx: number): string | undefined {
    if (raw == null) return raw;
    if (typeof raw !== 'string') {
        console.error(`[RCPCHChart] Expected string for ${field} at measurement[${idx}], got ${typeof raw}`);
        return raw;
    }
    if (DATE_REGEX_PLAIN.test(raw)) return raw;
    const parsed = new Date(raw);
    if (!isNaN(parsed.getTime())) {
        const coerced = parsed.toISOString().slice(0, 10);
        console.error(
            `[RCPCHChart] Invalid date format for ${field} at measurement[${idx}]: "${raw}" -> coerced to "${coerced}"`,
        );
        return coerced;
    }
    console.error(`[RCPCHChart] Unparseable date for ${field} at measurement[${idx}]: "${raw}" (left unchanged)`);
    return raw;
}

function validateAndSanitiseMeasurement(m: Measurement, idx: number): Measurement {
    // shallow clone + nested objects we will mutate
    const clone: Measurement = {
        ...m,
        birth_data: m.birth_data ? { ...m.birth_data } : (m.birth_data as any),
        measurement_dates: m.measurement_dates ? { ...m.measurement_dates } : (m.measurement_dates as any),
        child_observation_value: m.child_observation_value
            ? { ...m.child_observation_value }
            : (m.child_observation_value as any),
        measurement_calculated_values: m.measurement_calculated_values
            ? { ...m.measurement_calculated_values }
            : (m.measurement_calculated_values as any),
    };

    // Dates
    if (clone.birth_data) {
        clone.birth_data.birth_date = normaliseDate(clone.birth_data.birth_date, 'birth_data.birth_date', idx) as any;
        clone.birth_data.estimated_date_delivery = normaliseDate(
            clone.birth_data.estimated_date_delivery,
            'birth_data.estimated_date_delivery',
            idx,
        ) as any;
    }
    if (clone.measurement_dates) {
        clone.measurement_dates.observation_date = normaliseDate(
            clone.measurement_dates.observation_date,
            'measurement_dates.observation_date',
            idx,
        ) as any;
    }

    // Basic numeric type warnings (non-throwing)
    const numericChecks: Array<[unknown, string]> = [
        [clone.child_observation_value?.observation_value, 'child_observation_value.observation_value'],
        [clone.measurement_dates?.chronological_decimal_age, 'measurement_dates.chronological_decimal_age'],
        [clone.measurement_dates?.corrected_decimal_age, 'measurement_dates.corrected_decimal_age'],
        [clone.measurement_calculated_values?.chronological_sds, 'measurement_calculated_values.chronological_sds'],
        [clone.measurement_calculated_values?.corrected_sds, 'measurement_calculated_values.corrected_sds'],
    ];
    numericChecks.forEach(([val, label]) => {
        if (val != null && typeof val !== 'number') {
            console.error(
                `[RCPCHChart] Type warning at measurement[${idx}] "${label}" expected number, got ${typeof val}`,
            );
        }
    });

    // measurement_method validation
    const method = clone.child_observation_value?.measurement_method as string | undefined;
    if (method && !MEASUREMENT_KEYS.includes(method as MeasurementKey)) {
        console.error(
            `[RCPCHChart] Invalid measurement_method "${method}" at measurement[${idx}] (expected one of ${MEASUREMENT_KEYS.join(
                '|',
            )})`,
        );
    }

    return clone;
}

/**
 * Validate and sanitise the full ClientMeasurementObject.
 * Returns a new object with arrays cloned & cleaned; missing keys omitted.
 */
export function validateMeasurementsObject(measurements: unknown): ClientMeasurementObject {
    if (!measurements || typeof measurements !== 'object') return {};
    const input = measurements as ClientMeasurementObject;
    const out: ClientMeasurementObject = {};
    MEASUREMENT_KEYS.forEach((k) => {
        if (Array.isArray(input[k])) {
            out[k] = (input[k] as Measurement[]).map((m, i) => validateAndSanitiseMeasurement(m, i));
        }
    });
    return out;
}
