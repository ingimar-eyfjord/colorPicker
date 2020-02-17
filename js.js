const getColorValues = function() {
  let hex = this.value;
  let rAsInRGB = parseInt(this.value.substring(1, 3), 16);
  let gAsInRGB = parseInt(this.value.substring(3, 5), 16);
  let bAsInRGB = parseInt(this.value.substring(5, 7), 16);
  let RGB = `(` + rAsInRGB + `, ` + gAsInRGB + `, ` + bAsInRGB + `)`;

  r = rAsInRGB;
  g = gAsInRGB;
  b = bAsInRGB;
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  HSL =
    `HSL(` + h.toFixed(2) + `, ` + s.toFixed(2) + `%, ` + l.toFixed(2) + `%)`;
  displayValues(hex, RGB, HSL);
};

function displayValues(hex, RGB, HSL) {
  console.log(hex, RGB);
  document.querySelector("body").style.backgroundColor = hex;
  document.querySelector(".HEX").innerHTML = `HEX: ` + hex.toUpperCase() + ``;
  document.querySelector(".RGB").innerHTML =
    `RGB: ` + RGB.toUpperCase().substring(1, 14) + ``;
  document.querySelector(".HSL").innerHTML = HSL;
  document.querySelector("article").style.background = hex;
  document.querySelector("article").style.boxShadow =
    `22px 22px 44px #` + hex + `, -22px -22px 44px #` + hex + ``;
}

document
  .getElementById("color")
  .addEventListener("input", (e = getColorValues));
