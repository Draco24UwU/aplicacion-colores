import { color, colorParams, colorsConfig } from './color';

export abstract class ColorGateway {
  abstract generateColor(p?: colorParams): color;
  abstract generateMonochromaticColor(c: color, factor: number): color;
  abstract generateColors(p: colorsConfig | number): color[];
  abstract adjustColors(selected: color[], amount: number): color[];
}
