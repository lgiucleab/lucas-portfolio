// Gives the website its GitHub data. Live data is used when possible, and anything that
// fails falls back to src/data/github-fallback.json, so the build never crashes.
import { getCollection } from "astro:content";

import fallbackFile from "@/data/github-fallback.json";

import { fetchGitHubData, snapshotSchema, type GitHubSnapshot } from "./github-api";

// Fetches live data and fills any gaps from the saved file.
async function loadGitHubData(): Promise<GitHubSnapshot> {
  const fallback = snapshotSchema.parse(fallbackFile);

  // Both languages name the same repositories, so duplicates are removed.
  const projects = await getCollection("projects");
  const featuredNames = [...new Set(projects.map((project) => project.data.repo))];

  const live = await fetchGitHubData(featuredNames, import.meta.env.GITHUB_TOKEN);

  // Shows the problem in the build log without failing the build.
  live.failures.forEach((failure) => console.warn(`[github] Using saved data. ${failure}`));

  return {
    featured: { ...fallback.featured, ...live.featured },
    recent: live.recent ?? fallback.recent,
  };
}

// Remembers the result, so a build with several pages only calls GitHub once.
let cachedData: Promise<GitHubSnapshot> | undefined;

export function getGitHubData(): Promise<GitHubSnapshot> {
  cachedData ??= loadGitHubData();
  return cachedData;
}
