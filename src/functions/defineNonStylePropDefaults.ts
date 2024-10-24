function defineNonStylePropDefaults(propName: string, propValue: any) {
    // accepts the props that are not mandatory but which are not to do with styling and
    //  sets default values if not already specified by the user

    if (propName === 'clinicianFocus' || propName === 'enableExport') {
        return propValue === undefined ? false : propValue;
    }
    if (propName === 'chartType') {
        return propValue === undefined ? 'centile' : propValue;
    }
}

export default defineNonStylePropDefaults;
