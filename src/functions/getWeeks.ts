export function getWeeks():number[]{
    let ticks=[]
    for(let i=0.03832; i<2;i+=0.03832 ){
        ticks.push(i)
    }
    return ticks
}