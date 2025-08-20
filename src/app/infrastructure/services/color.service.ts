import { Injectable } from '@angular/core';
import { ColorGateway } from '../../domain/models/color/color-gateway';
import {
  color,
  colorParams,
  colorsConfig,
  colorValue,
} from '../../domain/models/color/color';

@Injectable({ providedIn: 'root' })
export class ColorService extends ColorGateway {
  constructor() {
    super();
  }

  override generateColor(p?: colorParams): color {
    //* Generar valores aleatorios dentro de rango
    let _l = Math.random() * (p?.l.variation ?? 1) + (p?.l?.base ?? 0);
    let _c = Math.random() * (p?.c.variation ?? 0.4) + (p?.c?.base ?? 0);
    let _h = Math.random() * (p?.h.variation ?? 360) + (p?.h.base ?? 0);

    _l = Number(_l.toFixed(3));
    _c = Number(_c.toFixed(3));
    _h = Number(_h.toFixed(3));

    const color = new Color(_l, _c, _h);
    return color.colors();
  }

  override generateColors(p: colorsConfig | number): color[] {
    const colors: color[] = [];

    // * Si se paso un numero, se genera una paleta de colores aleatorios.
    if (typeof p === 'number') {
      for (let i = 0; i < p; i++) {
        const color = this.generateColor();
        colors.push(color);
      }
      return colors;
    }

    // * Si es monocromatico y se dio un color inicial se genera la paleta apartir de ese color.
    if (p.monochromatic && p.params) {
      const baseColor = this.generateColor(p.params);
      console.log(baseColor);
      for (let i = 0; i < p.amount; i++) {
        //* Calcular el factor de progresión (0 a 1)
        const factor = i / (p.amount - 1);
        //* Generar un nuevo color con el factor aplicado
        const newColor = this.generateMonochromaticColor(baseColor, factor);
        colors.push(newColor);
      }
      return colors;
    }
    // * Si no es monocromatico se generan colores aleatorios.
    else {
      for (let i = 0; i < p.amount; i++) {
        const color = this.generateColor();
        colors.push(color);
      }
    }
    return colors;
  }
  override generateMonochromaticColor(c: color, factor: number): color {
    const l = Number(c.oklch.array[0]);
    const chroma = Number(c.oklch.array[1]);
    const h = Number(c.oklch.array[2]);

    // Definimos cuánto queremos variar máximo
    const lRange = 0.3; // variación máxima en luminosidad
    const cRange = 0.15; // variación máxima en croma

    // Interpolamos de forma proporcional al factor
    const newL = Math.max(0, Math.min(1, l - (factor - 0.5) * lRange * 2));
    const newC = Math.max(0, Math.min(1, chroma - factor * cRange));
    const newH = h; // Hue fijo para monocromático

    return new Color(newL, newC, newH).colors();
  }

  // * Metodo para ajustar la cantidad de colores en una paleta existente.
  override adjustColors(selected: color[], amount: number): color[] {
    const currentAmount = selected.length;

    //* Si la cantidad actual es igual a la deseada, no hacemos nada.
    if (currentAmount === amount) {
      return selected;
    }
    //* Si la cantidad actual es menor a la deseada, agregamos colores.
    else if (currentAmount < amount) {
      const colors = [...selected];
      const baseColor = selected[0]; // Usamos el primer color como base

      for (let i = currentAmount; i < amount; i++) {
        //* Calcular el factor de progresión (0 a 1)
        const factor = i / (amount - 1);
        console.log('Factor:', factor);

        //* Generar un nuevo color con el factor aplicado
        const newColor = this.generateMonochromaticColor(baseColor, factor);
        colors.push(newColor);
      }

      // * Ordena los colores por luminosidad de menor a mayor (más suave primero, más intenso al final).
      const newColors = colors.sort((a, b) => {
        const [lA, cA] = a.oklch.array.map(Number);
        const [lB, cB] = b.oklch.array.map(Number);

        // 1. Ordenar por luminosidad (de menor a mayor)
        return lB - lA || cB - cA; // primero por luminosidad, luego por croma
      });
      console.log('New Colors:', newColors);
      return newColors;
    }
    //* Si la cantidad actual es mayor a la deseada, eliminamos colores.
    else {
      const remaining = selected.slice(0, amount);
      const toRemove = selected
        .slice(amount)
        .map(c => ({ ...c, state: 'closing' }));
      return [...remaining, ...toRemove];
    }
  }
}

// * Clase auxiliar para crear una nueva instancia de color, el color se crea a partir de los valores L, C y H del formato OKLCH.
class Color {
  private l: number;
  private c: number;
  private h: number;

  constructor(l: number, c: number, h: number) {
    this.l = l;
    this.c = c;
    this.h = h;
  }

  // * Metodo para convertir el color a RGB.
  public toRGB(): colorValue {
    const { L, a, b } = this.OKLCH_2_OKLAB(this.l, this.c, this.h);
    const { R_linear, G_linear, B_linear } = this.OKLAB_2_Linear_RGB(L, a, b);

    const R_sRGB = this.linearToSRGB(R_linear);
    const G_sRGB = this.linearToSRGB(G_linear);
    const B_sRGB = this.linearToSRGB(B_linear);

    const R = Math.round(Math.max(0, Math.min(1, R_sRGB)) * 255);
    const G = Math.round(Math.max(0, Math.min(1, G_sRGB)) * 255);
    const B = Math.round(Math.max(0, Math.min(1, B_sRGB)) * 255);

    return {
      string: `${R},${G},${B}`,
      cssString: `rgb(${R}, ${G}, ${B})`,
      array: [R.toString(), G.toString(), B.toString()],
    };
  }
  // * Metodo para convertir el color a HEX.
  public toHEX(): colorValue {
    const { array } = this.toRGB();
    const hex = array
      .map(value => {
        const hexValue = parseInt(value).toString(16).padStart(2, '0');
        return hexValue;
      })
      .join('');

    return {
      string: hex,
      cssString: `#${hex}`,
      array: [hex],
    };
  }
  // * Metodo para convertir el color a OKLCH.
  public toOKLCH(): colorValue {
    return {
      string: `${this.l}, ${this.c}, ${this.h}`,
      cssString: `oklch(${this.l} ${this.c} ${this.h})`,
      array: [this.l.toString(), this.c.toString(), this.h.toString()],
    };
  }
  // * Metodo para convertir el color a OKLAB.
  public toOKLAB(): colorValue {
    let { L, a, b } = this.OKLCH_2_OKLAB(this.l, this.c, this.h);
    L = Number(L.toFixed(3));
    a = Number(a.toFixed(3));
    b = Number(b.toFixed(3));
    return {
      string: `${L}, ${a}, ${b}`,
      cssString: `oklab(${L} ${a} ${b})`,
      array: [L.toString(), a.toString(), b.toString()],
    };
  }

  public toHWB(): colorValue {
    const { array } = this.toRGB();
    // Normaliza RGB a [0,1]
    const [R, G, B] = array.map(v => Number(v) / 255);

    const max = Math.max(R, G, B);
    const min = Math.min(R, G, B);

    let h = 0;
    const w = min * 100; // Blanco
    const b = (1 - max) * 100; // Negación del máximo

    if (max === min) {
      h = 0; // sin saturación
    } else if (max === R) {
      h = (60 * ((G - B) / (max - min)) + 360) % 360;
    } else if (max === G) {
      h = 60 * ((B - R) / (max - min)) + 120;
    } else {
      h = 60 * ((R - G) / (max - min)) + 240;
    }

    return {
      string: `${h.toFixed(2)}, ${w.toFixed(3)}, ${b.toFixed(3)}`,
      cssString: `hwb(${h.toFixed(2)} ${w.toFixed(3)} ${b.toFixed(3)})`,
      array: [h.toFixed(2), w.toFixed(3), b.toFixed(3)],
    };
  }

  // * Metodo para convertir el color a HSL.
  public toHSL(): colorValue {
    const { array } = this.toRGB();
    const r = parseInt(array[0]) / 255;
    const g = parseInt(array[1]) / 255;
    const b = parseInt(array[2]) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0,
      s = 0;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      string: `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
        l * 100,
      )}%`,
      cssString: `hsl(${Math.round(h * 360)}, ${Math.round(
        s * 100,
      )}%, ${Math.round(l * 100)}%)`,
      array: [
        Math.round(h * 360).toString(),
        Math.round(s * 100).toString(),
        Math.round(l * 100).toString(),
      ],
    };
  }

  public colors() {
    return {
      rgb: this.toRGB(),
      oklch: this.toOKLCH(),
      oklab: this.toOKLAB(),
      hex: this.toHEX(),
      hsl: this.toHSL(),
      hwb: this.toHWB(),
      isDarkColor: this.isDarkColor(this.toRGB().array),
    };
  }

  // ? Metodos auxiliares.
  private OKLCH_2_OKLAB(l: number, c: number, h: number) {
    return {
      L: l,
      a: c * Math.cos((h * Math.PI) / 180),
      b: c * Math.sin((h * Math.PI) / 180),
    };
  }

  private OKLAB_2_Linear_RGB(L: number, a: number, b: number) {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;

    const l = Math.pow(l_, 3);
    const m = Math.pow(m_, 3);
    const s = Math.pow(s_, 3);

    return {
      R_linear: +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      G_linear: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      B_linear: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    };
  }

  private isDarkColor(rgb: string[]): boolean {
    const r = parseInt(rgb[0]);
    const g = parseInt(rgb[1]);
    const b = parseInt(rgb[2]);

    // Usamos la fórmula de luminancia relativa para determinar si es oscuro
    const luminance =
      0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    return luminance < 0.5; // Si la luminancia es menor a 0.5, consideramos que es oscuro
  }

  private linearToSRGB(linear: number) {
    if (linear <= 0.0031308) {
      return 12.92 * linear;
    } else {
      return 1.055 * Math.pow(linear, 1 / 2.4) - 0.055;
    }
  }
}
