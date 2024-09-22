export const referenceText = (reference: 'uk-who'|'trisomy-21'|'turner'|'cdc'):string=>{
    /*
    Returns attribution text against supplied reference prop
    */
    
    const ukWHOText = "WHO Child Growth Standards";
    const pretermText = "UK 1990 reference data, reanalysed 2009"
    const trisomy = "Styles ME, Cole TJ, Dennis J, Preece MA. New cross sectional stature, weight and head circumference references for Down’s syndrome in the UK and Republic of Ireland. Arch Dis Child 2002;87:104-8. BMI centiles added 11/11/2013"
    const turnerSyndrome = "UK Turner reference data, 1985. Lyon, Preece and Grant (1985)."
    const cdcText = " Developed by the National Center for Health Statistics in collaboration with the National Center for Chronic Disease Prevention and Health Promotion http://www.cdc.gov/growthcharts (2000)";

    if (reference==="trisomy-21") return trisomy;
    else if(reference==="turner") return turnerSyndrome;
    else if(reference==="uk-who") {
        return `${ukWHOText}, ${pretermText}`
    }
    else if(reference==="cdc") {
        return cdcText;
    }
    else throw new Error("No reference supplied");
}