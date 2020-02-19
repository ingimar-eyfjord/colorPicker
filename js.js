let getTargetHEXvalue = function() {
  let HEX = this.value;
  const RGB = getRGBvalue(HEX);
  const HSL = getHSLvalue(RGB);
  var choice = document.querySelector('input[name = "choice"]:checked').value;
  if (choice == "Analogous") {
    AnalogusSet(HSL);
  }
  if (choice == "Monochromatic") {
    Monochromatic(HSL);
  }
  if (choice == "Triad") {
    Triad(HSL);
  }
  if (choice == "Complementary") {
    Complementary(HSL);
  }
  if (choice == "Compound") {
    Compound(HSL);
  }
  if (choice == "Shades") {
    Shades(HSL);
  }
};
const box = document.querySelectorAll(".box");

function Compound(HSL) {
  amount = 0;
  box.forEach(e => {
    amount++;
    const HSLset =
      `hsl(` +
      (HSL.h - 180 + 180 * amount).toFixed(2) +
      `,` +
      HSL.s.toFixed(2) +
      `%,` +
      (HSL.l * amount).toFixed(2) +
      `%)`;
    e.style.backgroundColor = HSLset;
    e.querySelector(".HSL").textContent = HSLset;
    applySelection();
  });
}

function Shades(HSL) {
  amount = 0;
  box.forEach(e => {
    amount++;
    const HSLset =
      `hsl(` +
      HSL.h.toFixed(2) +
      `,` +
      (HSL.s * amount).toFixed(2) +
      `%,` +
      (HSL.l * amount).toFixed(2) +
      `%)`;
    e.style.backgroundColor = HSLset;

    e.querySelector(".HSL").textContent = HSLset;
    applySelection();
  });
}

function Complementary(HSL) {
  amount = 0;
  box.forEach(e => {
    amount++;
    const HSLset =
      `hsl(` +
      (HSL.h - 180 + 180 * amount).toFixed(2) +
      `,` +
      HSL.s.toFixed(2) +
      `%,` +
      HSL.l.toFixed(2) +
      `%)`;
    e.style.backgroundColor = HSLset;

    e.querySelector(".HSL").textContent = HSLset;
    applySelection();
  });
}

function Triad(HSL) {
  const box = document.querySelectorAll(".box");
  amount = 0;
  box.forEach(e => {
    amount++;
    const HSLset =
      `hsl(` +
      (HSL.h - 120 + 120 * amount).toFixed(2) +
      `,` +
      HSL.s.toFixed(2) +
      `%,` +
      HSL.l.toFixed(2) +
      `%)`;
    e.style.backgroundColor = HSLset;
    e.querySelector(".HSL").textContent = HSLset;
    applySelection();
  });
}
function Monochromatic(HSL) {
  const box = document.querySelectorAll(".box");
  amount = 0;
  box.forEach(e => {
    amount++;
    const HSLset =
      `hsl(` +
      HSL.h.toFixed(2) +
      `,` +
      (HSL.s - 40 + 10 * amount).toFixed(2) +
      `%,` +
      (HSL.l - 40 + 10 * amount).toFixed(2) +
      `%)`;

    e.style.backgroundColor = HSLset;
    e.querySelector(".HSL").textContent = HSLset;
    applySelection();
  });
}

function AnalogusSet(HSL) {
  const box = document.querySelectorAll(".box");
  amount = 0;
  box.forEach(e => {
    amount++;
    const HSLset =
      `hsl(` +
      (HSL.h - 60 + 20 * amount).toFixed(2) +
      `,` +
      HSL.s.toFixed(2) +
      `%,` +
      HSL.l.toFixed(2) +
      `%)`;
    e.style.backgroundColor = HSLset;
    e.querySelector(".HSL").textContent = HSLset;
    applySelection();
  });
}

function applySelection() {
  box.forEach(e => {
    e.querySelector(".RGB").textContent = e.style.backgroundColor;
    r1 = e.style.backgroundColor.substring(4, 7);
    g1 = e.style.backgroundColor.substring(8, 12);
    b1 = e.style.backgroundColor.substring(13, 17);
    const rgbToHex = (r1, g1, b1) =>
      "#" +
      [r1, g1, b1]
        .map(x => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("");
    // let RGB = rgbToHex(`` + r1 + `, ` + g1 + `, ` + b1 + ``);
    e.querySelector(".HEX").textContent = rgbToHex(
      parseInt(r1),
      parseInt(g1),
      parseInt(b1)
    ).toUpperCase();
  });
}

function getRGBvalue(HEX) {
  let rAsInRGB = parseInt(HEX.substring(1, 3), 16);
  let gAsInRGB = parseInt(HEX.substring(3, 5), 16);
  let bAsInRGB = parseInt(HEX.substring(5, 7), 16);
  let RGB = `rgb(` + rAsInRGB + `, ` + gAsInRGB + `, ` + bAsInRGB + `)`;
  return RGB;
}

function getHSLvalue(RGB) {
  // console.log(RGB);
  let r = parseInt(RGB.substring(4, 7));
  let g = parseInt(RGB.substring(8, 12));
  let b = parseInt(RGB.substring(13, 17));
  // console.log(r);
  // console.log(g);
  // console.log(b);
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
  HSL = `HSL(` + h + `, ` + s + `%, ` + l + `%)`;
  return { h, s, l };
}

document
  .getElementById("color")
  .addEventListener("input", (e = getTargetHEXvalue));
