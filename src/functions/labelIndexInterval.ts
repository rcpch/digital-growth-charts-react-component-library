type Point = { x: number };

/**
 * Returns the established label positions for one reference-data window.
 * The chart chooses which windows own the left and right labels; this helper
 * keeps the existing reliable in-window placement for Victory rendering.
 */
export function labelIndexInterval(
    index: number,
    data: Point[] | undefined,
    domains: { x: number[]; y: number[] },
): boolean {
    if (!data || index <= 0 || index >= data.length - 2) {
        return false;
    }

    const visiblePointCount = data.filter((point) => point.x > domains.x[0] && point.x < domains.x[1]).length;
    const interval = Math.floor(visiblePointCount / 2);

    return interval > 0 && index % interval === 0;
}
