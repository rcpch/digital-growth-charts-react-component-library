export function labelIndexInterval(index: number, data: any[], domains: { x: number[]; y: number[] }): boolean {
    // return true if the index is a multiple of the number of items between labels
    // this will be used to determine if a label should be displayed
    // the number of items between labels will be determined by the number of items in the data array
    // and the number of labels to be displayed - this will be 3
    if (data == undefined) {
        return false;
    }
    const bill = data.filter((d: any) => {
        if (d.x > domains.x[0] && d.x < domains.x[1]) {
            return d;
        }
    });
    let numberOfItemsBetweenLabels = Math.floor(bill.length / 3); // 3 labels per line - this will serve as an index to split the data into 4 sections

    return index % numberOfItemsBetweenLabels == 0;
}
