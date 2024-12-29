export const referenceText = (reference: 'uk-who' | 'trisomy-21' | 'turner' | 'cdc' | 'trisomy-21-aap'): string => {
    /*
    Returns attribution text against supplied reference prop
    */

    const ukWHOText = 'WHO Child Growth Standards';
    const pretermText = 'UK 1990 reference data, reanalysed 2009';
    const trisomy =
        'Styles ME, Cole TJ, Dennis J, Preece MA. New cross sectional stature, weight and head circumference references for Down’s syndrome in the UK and Republic of Ireland. Arch Dis Child 2002;87:104-8. BMI centiles added 11/11/2013';
    const turnerSyndrome = 'UK Turner reference data, 1985. Lyon, Preece and Grant (1985).';
    const cdcText =
        'Published by the Centers for Disease Control and Prevention, November 1, 2009. Includes WHO Child Growth Standards. (https://www.who.int/childgrowth/en/)';
    const trisomy21AAP =
        'American Academy of Pediatrics (AAP) Trisomy 21 reference. Zemel BS, Pipan M, Stallings VA, Hall W, Schgadt K, Freedman DS, Thorpe P. Growth Charts for Children with Down Syndrome in the U.S. Pediatrics, 2015';

    const whoText = 'World Health Organisation Multicentre Growth Reference Standards (WHO MGRS) (2006/2007)';

    if (reference === 'trisomy-21') return trisomy;
    else if (reference === 'turner') return turnerSyndrome;
    else if (reference === 'uk-who') {
        return `${ukWHOText}, ${pretermText}`;
    } else if (reference === 'cdc') {
        return cdcText;
    } else if (reference === 'trisomy-21-aap') {
        return trisomy21AAP;
    } else if (reference === 'who') {
        return whoText;
    } else throw new Error('No reference supplied');
};
