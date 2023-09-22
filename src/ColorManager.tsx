import { Film } from './Components/Film';
import ColorThief from "color-thief-ts";

const colorThief = new ColorThief();




function resToHex(a: Array<number>) {
    return a.toString();
}

const GetColor = async (url: string) => {
    return await colorThief.getColorAsync(url);
}

export const SetupColors = async (a: Array<Film>) => {
    const colorArray: Array<string> = new Array<string>;
    for (let i = 0; i < 3; i++) {
        await GetColor(a[i].logo).then(res => {
            colorArray[i] = resToHex(res);
        })
    }
    return colorArray;

}

export const GetBlankColor = async (a: Array<Film>, i: number) => {
    let temp = '';
    await GetColor(a[i].logo).then(res => {
        temp = resToHex(res);

    })
    return temp;

}



