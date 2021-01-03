export function addAlpha(colour, alpha){
    //  add alpha as a decimal
    const x = Math.floor(alpha * 255)
    const baseString = x.toString(16)
    const returnValue = x < 16  ? colour + '0'+baseString : colour+baseString
    return returnValue
    
    
    // if (alpha > 1 || alpha < 0 || isNaN(alpha)) {
    //     throw new Error('The argument must be a number between 0 and 1');
    //   }
    // return Math.ceil(255 * alpha).toString(16).toUpperCase();
}