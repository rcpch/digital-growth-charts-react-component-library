export function filterData(data, lowerX, upperX, lowerY, upperY) {
    const filtered = data.filter(
        (d) => (d.x <= upperX && d.x >= lowerX && d.y <= upperY && d.y >= lowerY)
    )
    return filtered
}