export interface color {
  rgb: colorValue;
  hex: colorValue;
  hsl: colorValue;
  oklab: colorValue;
  oklch: colorValue;
  hwb: colorValue;
  isDarkColor: boolean;
  state?: string;
}

// * Interfaz para almacenar los valores de color.
export interface colorValue {
  string: string;
  cssString: string;
  array: string[];
}
// * Interfaz para configurar cada parametro de color.
export interface colorConfig {
  base?: number;
  variation?: number;
}
// * Interfaz para configurar la generacion de colores.
export interface colorsConfig {
  amount: number;
  params: colorParams;
  monochromatic: boolean;
}
// * Interfaz para configurar la creacion de un color con sus parametros.
export interface colorParams {
  l: colorConfig;
  c: colorConfig;
  h: colorConfig;
}

export interface colorPalette {
  type:
    | 'cool'
    | 'warm'
    | 'neutral'
    | 'pastel'
    | 'vibrant'
    | 'earthy'
    | 'dark'
    | 'ocean'
    | 'sunset';
  config: colorParams;
}
