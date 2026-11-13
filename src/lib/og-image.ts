// Draws the Open Graph preview images at build time, in the site's editorial "paper" style.
// Satori turns the layout into an SVG, and Resvg turns that SVG into a PNG.
// Satori cannot read .woff2, so these are the static .woff versions of the site's fonts.
import titleFontFile from "@fontsource/geist/files/geist-latin-500-normal.woff?inline";
import bodyFontFile from "@fontsource/geist/files/geist-latin-400-normal.woff?inline";
import serifFontFile from "@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff?inline";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

// Standard size for social previews.
const WIDTH = 1200;
const HEIGHT = 630;

// Light "paper" theme colors from global.css. Images have no theme, so the values are
// written here. Paper stands out in social feeds, which are mostly white or black.
const COLORS = {
  page: "#f7f6f3",
  ink: "#141413",
  muted: "#65645f",
  line: "#dcd9d0",
  highlight: "#b4400c",
};

// Empty space around the text.
const MARGIN = 72;

// Titles longer than this use the smaller size, so they stay inside the image.
const LONG_TITLE = 40;

// Subtitles are cut at this many characters.
const MAX_SUBTITLE = 110;

// "?inline" gives each font as a data address. This turns it back into raw bytes.
function fontBytes(dataUrl: string): ArrayBuffer {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0)).buffer;
}

// Satori's layout format: the same shape as a JSX element, written as plain data.
type Layout = Parameters<typeof satori>[0];

function element(style: Record<string, string | number>, children?: string | object[]) {
  return { type: "div", props: { style: { display: "flex", ...style }, children } };
}

// Returns a PNG with a title and a subtitle.
export async function renderOgImage(title: string, subtitle: string): Promise<Uint8Array> {
  // Long descriptions are shortened, so they cannot run off the image.
  const shortSubtitle =
    subtitle.length > MAX_SUBTITLE ? `${subtitle.slice(0, MAX_SUBTITLE).trimEnd()}...` : subtitle;

  const layout = element(
    {
      position: "relative",
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: COLORS.page,
      color: COLORS.ink,
      overflow: "hidden",
    },
    [
      // The text sits in its own absolute layer, so long titles cannot change the frame.
      element(
        {
          position: "absolute",
          top: MARGIN,
          left: MARGIN,
          right: MARGIN,
          bottom: MARGIN,
          flexDirection: "column",
          justifyContent: "space-between",
        },
        [
          // Top: name, with the serif accent word as on the site.
          element({ alignItems: "baseline", gap: 10, fontSize: 32 }, [
            element({ fontFamily: "Geist", fontWeight: 500, letterSpacing: -0.6 }, "Lucas"),
            element(
              { fontFamily: "Instrument Serif", fontSize: 36, color: COLORS.highlight },
              "Giuclea",
            ),
          ]),
          // Bottom: title and subtitle above a hairline, like a section on the site.
          element({ flexDirection: "column", gap: 24 }, [
            element(
              {
                fontFamily: "Geist",
                fontWeight: 500,
                fontSize: title.length > LONG_TITLE ? 60 : 88,
                lineHeight: 1.02,
                letterSpacing: title.length > LONG_TITLE ? -1.8 : -3,
              },
              title,
            ),
            element(
              {
                fontFamily: "Geist",
                fontSize: 30,
                lineHeight: 1.35,
                color: COLORS.muted,
                paddingBottom: 28,
                borderBottom: `2px solid ${COLORS.line}`,
              },
              shortSubtitle,
            ),
          ]),
        ],
      ),
    ],
  );

  const svg = await satori(layout as unknown as Layout, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Geist", data: fontBytes(titleFontFile), weight: 500, style: "normal" },
      { name: "Geist", data: fontBytes(bodyFontFile), weight: 400, style: "normal" },
      { name: "Instrument Serif", data: fontBytes(serifFontFile), weight: 400, style: "normal" },
    ],
  });

  return new Resvg(svg).render().asPng();
}
