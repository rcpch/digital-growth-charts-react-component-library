export const nameForReference = (reference: 'uk-who'|'trisomy-21'|'turner'):string=>{
    /*
    Returns reference name against supplied reference prop
    */
    
    const ukWHOText = "UK-WHO";
    const cdcText = "CDC (USA)";
    const trisomy = "Trisomy 21 (Down's Syndrome)"
    const turnerSyndrome = "Turner's Syndrome"

    if (reference==="trisomy-21") return trisomy;
    else if(reference==="turner") return turnerSyndrome;
    else if(reference==="uk-who") {
        return ukWHOText
    }
    else if(reference==="cdc") {
        return cdcText;
    }
    else throw new Error("No reference supplied");
}