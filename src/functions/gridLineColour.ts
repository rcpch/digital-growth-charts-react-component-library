import { LightenDarkenColour } from "./lightenDarken"

export function returnGridlineColour(viewGridlines, gridlineStroke, tick, sex, reference){
    let returnGridlineStroke = 'transparent'
    if (!viewGridlines){
        return returnGridlineStroke
    }
    if (sex==="male"){
        returnGridlineStroke = gridlineStroke
        if(tick%5===0){
            returnGridlineStroke = LightenDarkenColour(gridlineStroke, -40)
        }
        if(tick===9){ // precocious puberty threshold
            returnGridlineStroke = "black"
        }
        if(tick===14){ // delayed puberty threshold
            returnGridlineStroke = "black"
        }
        if(tick===17){ // delayed puberty completion
            returnGridlineStroke = "black"
        }
    } else {
        returnGridlineStroke = gridlineStroke
        if(tick%5===0){
            returnGridlineStroke = LightenDarkenColour(gridlineStroke, -40)
        }
        if(tick===8){ // precocious puberty threshold
            returnGridlineStroke = "black"
        }
        if(tick===13){ // delayed puberty threshold
            returnGridlineStroke = "black"
        }
        if(tick===16){ // delayed puberty completion
            returnGridlineStroke = "black"
        }
    }

    return returnGridlineStroke
}