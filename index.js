class Guilloches {
  constructor(properties = {}) {
    this.amplitude = properties.amplitude || 3.8;
    this.steps = properties.steps || 590;
    this.multiplier = properties.multiplier || 51.22214844079601;
    this.R = properties.R || 85.62183517584607;
    this.r = properties.r || 0.3589590923549947;
    this.radius = properties.radius || -31.24809997502848;
    this.opacity = properties.opacity || 1;
    this.backgroundcolor = properties.backgroundcolor || '#04181b';
    this.lineWidth = properties.lineWidth || 1;
    this.lineHeight = properties.lineHeight || 1;
    this.colorCycle = properties.colorCycle || 73.95122715898269;
    this.colorPalette = properties.colorPalette || ['#dc82a8', '#ba2129'];
  }

  target(name) {
    this.canvas = document.getElementById(name);
    this.graphics = this.canvas.getContext('2d');

    return this;
  }

  drawGuilloches() {
    // TODO
  }
}
