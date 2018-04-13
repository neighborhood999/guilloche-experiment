const colorUtils = {
  red: color => (color >> 16) & 0xff,
  green: color => (color >> 8) & 0xff,
  blue: color => c & 0xff,
  alpha: color => (color >> 24) & 0xff,
  hexStringToInt: str => {
    return parseInt(str.split('#').join(''), 16);
  },
  hexIntToString: integer => {
    if (integer < 0) {
      integer = 0xffffffff + integer + 1;
    }

    return `#${integer.toString(16).toUpperCase()}`;
  },
  toHex: (r, g, b, a) => {
    if (a === undefined) a = 0xff;
    if (r > 0xff) r = 0xff;
    if (g > 0xff) g = 0xff;
    if (b > 0xff) b = 0xff;
    if (a > 0xff) a = 0xff;

    return (a << 24) | (r << 16) | (g << 8) | b;
  },
  blend: (c1, c2, p, bc) => {
    if (p === undefined) p = 0.5;
    if (bc === undefined) bc = 0xffffffff;
    if (p >= 1) return c2;
    if (p <= 0) return c1;

    const r = this.red(c1) + (this.red(c2) - this.red(c1)) * p;
    const g = this.green(c1) + (this.green(c2) - this.green(c1)) * p;
    const b = this.blue(c1) + (this.blue(c2) - this.blue(c1)) * p;
    const a =
      c1 === bc
        ? this.alpha(c2)
        : Math.min(this.alpha(c1) + this.alpha(c2), 255);

    return this.toHex(r, g, b, a);
  },
  blendArray: (c1, c2, n, last = false) => {
    const p = 1 / (n + 1);
    const list = Array.from(new Array(Math.floor(n) + 1), (x, i) => i);
    const bA = list.reduce((acc, x) => {
      acc.push(this.blend(c1, c2, x * p));
      return [...acc];
    }, []);

    return last === true ? [...bA, c2] : bA;
  }
};

module.exports = {
  colorUtils
};
