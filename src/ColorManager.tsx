function componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(a: Array<number>) {
    return "#" + componentToHex(a[0]) + componentToHex(a[1]) + componentToHex(a[2]);
}
