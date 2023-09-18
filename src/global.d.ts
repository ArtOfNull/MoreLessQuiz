declare module '*.scss' {
    const content: { [className: string]: string };
    export = content;
}

declare module 'colorthief' {
    type Color = [number, number, number];
    export default class ColorThief {
        getColor: (img: HTMLImageElement | null) => Color;
        getPalette: (img: HTMLImageElement | null) => Color[];
    }
}
