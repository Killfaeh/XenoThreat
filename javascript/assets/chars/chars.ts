const isDev: boolean = import.meta.env.DEV;
const devPath: string = "/src/assets/chars/";
const distPath: string = "./assets/chars/";

export const charsFolder = isDev ? devPath : distPath;