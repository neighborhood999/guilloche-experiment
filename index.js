const { colorUtils } = require('./utils');

class Guilloche {
  constructor(properties = {}) {
    this.amplitude = properties.amplitude || 3.8;
    this.steps = properties.steps || 590;
    this.multiplier = properties.multiplier || 51.22214844079601;
    this.R = properties.R || 85.62183517584607;
    this.r = properties.r || 0.3589590923549947;
    this.radius = properties.radius || -31.24809997502848;
    this.opacity = properties.opacity || 1;
    this.backgroundColor = properties.backgroundColor || '#04181b';
    this.isTransparent = properties.isTransparent || false;
    this.lineWidth = properties.lineWidth || 1;
    this.lineHeight = properties.lineHeight || 1;
    this.sectionLength = properties.sectionLength || 10;
    this.colorCycle = properties.colorCycle || 73.95122715898269;
    this.colorPalette = properties.colorPalette || ['#dc82a8', '#ba2129'];
  }

  target(name) {
    this.canvas = document.getElementById(name);
    this.graphics = this.canvas.getContext('2d');

    return this;
  }

  setColorPalette() {
    const [color1, color2] = this.colorPalette;

    const c1 = colorUtils.hexStringToInt(color1);
    const c2 = colorUtils.hexStringToInt(color2);
    const colorPalette = colorUtils.blendArray(
      c1,
      c2,
      this.steps / this.colorCycle - 1,
      false
    );

    return colorPalette;
  }

  draw() {
    const canvas = this.canvas;
    const graphics = this.graphics;
    const palette = this.setColorPalette();
    const countPalette = palette.length;
    const [color1, color2] = this.colorPalette;

    const c1 = colorUtils.hexStringToInt(color1);
    const c2 = colorUtils.hexStringToInt(color2);

    if (this.isTransparent) {
      graphics.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      graphics.fillStyle = this.backgroundColor;
      graphics.fillRect(0, 0, canvas.width, canvas.height);
    }

    const thetaStep = 2 * Math.PI / this.steps;
    const s = (this.R + this.r) / this.r;
    const rR = this.r + this.R;
    const rp = this.r + this.radius;
    const offsetX = canvas.width / 2;
    const offsetY = canvas.height / 2;
    let sl = 0;
    let θ = 0;
    let maxX = 0;
    let maxY = 0;
    let x, y, ox, oy;
    let svgPaths = '';
    let svgPoints = '';

    for (let t = 0; t <= this.steps; t++) {
      x =
        rR * Math.cos(this.multiplier * θ) +
        rp * Math.cos(s * this.multiplier * θ);
      y =
        rR * Math.sin(this.multiplier * θ) +
        rp * Math.sin(s * this.multiplier * θ);

      x *= this.amplitude;
      y *= this.amplitude;

      x += offsetX;
      y += offsetY;
      x = parseInt(x);
      y = parseInt(y);

      if (sl === 0) {
        const color =
          c1 === c2 || countPalette < 2 ? c1 : palette[t % countPalette];

        graphics.beginPath();

        graphics.strokeStyle = colorUtils.hexIntToString(color);
        graphics.lineWidth = this.lineWidth;
        graphics.lineCap = 'butt';
        graphics.lineJoin = 'round';
        graphics.globalAlpha = this.opacity;

        if (t === 0) {
          svgPoints += ` M ${x} ${y}`;
          graphics.moveTo(x, y);
        } else {
          graphics.moveTo(ox, oy);
          svgPoints += ` M ${ox} ${oy}`;
          graphics.lineTo(x, y);
          svgPoints += ` L ${x} ${y}`;
        }
      } else {
        svgPoints += ` L ${x} ${y}`;
        graphics.lineTo(x, y);
      }

      if (maxX < x) maxX = x;
      if (maxY < y) maxY = y;

      ox = x;
      oy = y;
      sl++;
      θ += thetaStep;

      if (sl === this.sectionLength) {
        graphics.stroke();

        svgPaths += `<path d="${svgPoints}" fill="none" stroke="${
          graphics.strokeStyle
        }" stroke-linejoin="bevel" stroke-linecap="butt" stroke-width="${
          this.lineWidth
        }" opacity="${this.opacity}" />`;
        sl = 0;
        svgPoints = '';
      }
    }
  }
}

module.exports = Guilloche;
