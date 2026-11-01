// Draws the Open Graph preview images at build time, in the site's dark style.
// Satori turns the layout into an SVG, and Resvg turns that SVG into a PNG.
import titleFontFile from "@fontsource/fira-code/files/fira-code-latin-600-normal.woff?inline";
import bodyFontFile from "@fontsource/open-sans/files/open-sans-latin-400-normal.woff?inline";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

// Standard size for social previews.
const WIDTH = 1200;
const HEIGHT = 630;

// Dark theme colors from global.css. Images have no theme, so the values are written here.
const COLORS = { page: "#121212", ink: "#f5f5f5", muted: "#a6a6a6", line: "#3d3d3d" };

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
      // Thin background circle, like the ones on the site.
      element({
        position: "absolute",
        top: -180,
        right: -160,
        width: 620,
        height: 620,
        borderRadius: 310,
        border: `2px solid ${COLORS.line}`,
      }),
      // The text sits in its own layer, so the circle cannot push it around.
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
          element({ fontFamily: "Fira Code", fontSize: 30 }, "... /Lucas Giuclea Balan ..."),
          element({ flexDirection: "column", gap: 28 }, [
            element(
              {
                fontFamily: "Fira Code",
                fontSize: title.length > LONG_TITLE ? 60 : 84,
                lineHeight: 1.1,
              },
              title,
            ),
            element(
              { fontFamily: "Open Sans", fontSize: 32, lineHeight: 1.3, color: COLORS.muted },
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
      { name: "Fira Code", data: fontBytes(titleFontFile), weight: 600, style: "normal" },
      { name: "Open Sans", data: fontBytes(bodyFontFile), weight: 400, style: "normal" },
    ],
  });

  return new Resvg(svg).render().asPng();
}
