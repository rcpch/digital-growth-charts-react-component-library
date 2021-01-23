export function returnGridlineStrokeWidth(viewGridlines, gridlineStrokeWidth, tick){
    let returnGridlineStrokeWidth = 0
    if (!viewGridlines){
        return 0
    }

    returnGridlineStrokeWidth = gridlineStrokeWidth
    if(tick.ticks % 5 === 0) {
        returnGridlineStrokeWidth = gridlineStrokeWidth + 0.5
    }

    return returnGridlineStrokeWidth
}