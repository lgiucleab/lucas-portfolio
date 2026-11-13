// Creates the site's icons in public/. It only needs to run again if the design changes:
// npm run icons
import { readFile, writeFile } from "node:fs/promises";

import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

// The letter and colors. Edit these to restyle every icon at once.
// One serif italic letter stays readable at 16px, where two letters would blur.
const INITIALS = "L";
const BACKGROUND = "#111110"; // Dark "ink" page color
const TEXT_COLOR = "#f0905a"; // Warm highlight color

const SVG_SIZE = 512;
const FONT_FILE =
  "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff";

// Draws the icon as vector shapes, so favicon.svg needs no font installed.
const svg = await satori(
  {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        borderRadius: 112,
        backgroundColor: BACKGROUND,
        color: TEXT_COLOR,
        fontFamily: "Instrument Serif",
        fontSize: 400,
        // Nudges the italic letter so it looks centred.
        paddingRight: 24,
      },
      children: INITIALS,
    },
  },
  {
    width: SVG_SIZE,
    height: SVG_SIZE,
    fonts: [
      { name: "Instrument Serif", data: await readFile(FONT_FILE), weight: 400, style: "normal" },
    ],
  },
);

// Renders the icon as a PNG of the given width.
function toPng(width) {
  return new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();
}

// An .ico file is a small header followed by the image. Modern browsers accept a PNG inside.
function toIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2); // File type: icon
  header.writeUInt16LE(1, 4); // Number of images
  header.writeUInt8(size, 6); // Width
  header.writeUInt8(size, 7); // Height
  header.writeUInt16LE(1, 10); // Color planes
  header.writeUInt16LE(32, 12); // Bits per pixel
  header.writeUInt32LE(png.length, 14); // Image size
  header.writeUInt32LE(22, 18); // Where the image starts
  return Buffer.concat([header, png]);
}

await writeFile("public/favicon.svg", svg);
await writeFile("public/favicon.ico", toIco(toPng(32), 32));
await writeFile("public/apple-touch-icon.png", toPng(180));
await writeFile("public/icon-192.png", toPng(192));
await writeFile("public/icon-512.png", toPng(512));

console.log("Icons saved in public/.");
