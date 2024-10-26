export const nameForReference = (reference: 'uk-who' | 'trisomy-21' | 'turner' | 'cdc' | 'trisomy-21-aap'): string => {
    /*
    Returns reference name against supplied reference prop
    */

    const ukWHOText = 'UK-WHO';
    const cdcText = 'CDC (USA)';
    const trisomy = "Trisomy 21 (Down's Syndrome)";
    const turnerSyndrome = "Turner's Syndrome";
    const trisomy21AAP = "Trisomy 21 (Down's Syndrome) - AAP";

    if (reference === 'trisomy-21') return trisomy;
    else if (reference === 'turner') return turnerSyndrome;
    else if (reference === 'uk-who') {
        return ukWHOText;
    } else if (reference === 'cdc') {
        return cdcText;
    } else if (reference === 'trisomy-21-aap') {
        return trisomy21AAP;
    } else throw new Error('No reference supplied');
};
