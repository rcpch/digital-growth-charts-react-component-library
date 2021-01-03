export function returnGridlineStrokeWidth(viewGridlines, gridlineStrokeWidth, tick, sex, reference){
    let returnGridlineStrokeWidth = 0
    if (!viewGridlines){
        return returnGridlineStrokeWidth
    }
    
    if (sex==="male"){
        returnGridlineStrokeWidth = gridlineStrokeWidth
        if(tick%5===0){
            returnGridlineStrokeWidth = gridlineStrokeWidth + 0.125
        }
        if(tick===9){ // precocious puberty threshold
            returnGridlineStrokeWidth = gridlineStrokeWidth + 0.75
        }
        if(tick===14){ // delayed puberty threshold
            returnGridlineStrokeWidth = gridlineStrokeWidth + 0.75
        }
        if(tick===17){ // delayed puberty completion
            returnGridlineStrokeWidth = gridlineStrokeWidth + 0.75
        }
    } else {
        returnGridlineStrokeWidth = gridlineStrokeWidth
        if(tick%5===0){
            returnGridlineStrokeWidth = gridlineStrokeWidth + 0.125
        }
        if(tick===8){ // precocious puberty threshold
            returnGridlineStrokeWidth = 0.75
        }
        if(tick===13){ // delayed puberty threshold
            returnGridlineStrokeWidth = gridlineStrokeWidth + 0.75
        }
        if(tick===16){ // delayed puberty completion
            returnGridlineStrokeWidth = gridlineStrokeWidth + 0.75
        }
    }

    return returnGridlineStrokeWidth
}