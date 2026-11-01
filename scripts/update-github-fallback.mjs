// Saves current GitHub data to src/data/github-fallback.json, which the build uses when the
// API fails. Run it with "npm run github:fallback". It reads GITHUB_TOKEN from .env.
// It is plain JavaScript, so that type checking it needs no extra packages.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";

import { fetchGitHubData } from "../src/lib/github-api.ts";

const PROJECTS_FOLDER = "src/content/projects/en";
const OUTPUT_FOLDER = "src/data";

// Reads the "repo:" line of every featured project file.
const files = await readdir(PROJECTS_FOLDER);
const contents = await Promise.all(
  files.map((file) => readFile(`${PROJECTS_FOLDER}/${file}`, "utf-8")),
);
const featuredNames = contents.flatMap((content) => content.match(/^repo: (.+)$/m)?.[1] ?? []);

const { featured, recent, failures } = await fetchGitHubData(
  featuredNames,
  process.env.GITHUB_TOKEN,
);

// Good saved data must never be replaced by a partial result.
if (failures.length > 0 || !recent) {
  console.error("Nothing was saved, because some requests failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

await mkdir(OUTPUT_FOLDER, { recursive: true });
await writeFile(
  `${OUTPUT_FOLDER}/github-fallback.json`,
  `${JSON.stringify({ featured, recent }, null, 2)}\n`,
);

console.log(`Saved ${Object.keys(featured).length} featured and ${recent.length} recent repos.`);
