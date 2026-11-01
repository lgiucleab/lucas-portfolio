// Talks to the GitHub REST API. It has no Astro-only imports, so the website build and
// scripts/update-github-fallback.mjs can both use it.
import { z } from "astro/zod";

// The GitHub account the site reads from.
export const GITHUB_USERNAME = "lgiucleab";

// How many repositories the "More on GitHub" list shows.
const RECENT_LIMIT = 6;

// Stops waiting after this long, so a slow API cannot hang the build.
const REQUEST_TIMEOUT_MS = 10_000;

// The repository details the site uses. Only these fields are ever saved or displayed.
const repoSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  url: z.string(),
  // Most-used language first.
  languages: z.array(z.string()),
  stars: z.number(),
  topics: z.array(z.string()),
  homepage: z.string().nullable(),
  // Date of the last push, in ISO format.
  updatedAt: z.string(),
});

export type RepoData = z.infer<typeof repoSchema>;

// Everything the site needs from GitHub. The fallback file has this same shape.
export const snapshotSchema = z.object({
  featured: z.record(z.string(), repoSchema),
  recent: z.array(repoSchema),
});

export type GitHubSnapshot = z.infer<typeof snapshotSchema>;

// What GitHub sends for one repository. Unknown data is checked here, which avoids "any".
const apiRepoSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  topics: z.array(z.string()).default([]),
  homepage: z.string().nullable(),
  pushed_at: z.string(),
  fork: z.boolean(),
  private: z.boolean(),
});

type ApiRepo = z.infer<typeof apiRepoSchema>;

// Sends one request. A failed request throws, and the callers decide what to do about it.
async function fetchFromGitHub(path: string, token: string | undefined): Promise<unknown> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      // Without a token, GitHub allows fewer requests and hides private repositories.
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) throw new Error(`GitHub answered ${response.status} for ${path}`);
  return response.json();
}

// Converts GitHub's format into ours, keeping only the fields listed in repoSchema.
function toRepoData(repo: ApiRepo, languages: string[]): RepoData {
  return {
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    languages,
    stars: repo.stargazers_count,
    topics: repo.topics,
    homepage: repo.homepage,
    updatedAt: repo.pushed_at,
  };
}

// Fetches one repository by name, including its full language list.
async function fetchRepo(name: string, token: string | undefined): Promise<RepoData> {
  const base = `/repos/${GITHUB_USERNAME}/${name}`;
  const [repo, languages] = await Promise.all([
    fetchFromGitHub(base, token),
    fetchFromGitHub(`${base}/languages`, token),
  ]);

  // GitHub gives { language: bytes of code }, so sorting by bytes puts the main one first.
  const sortedLanguages = Object.entries(z.record(z.string(), z.number()).parse(languages))
    .sort(([, bytesA], [, bytesB]) => bytesB - bytesA)
    .map(([language]) => language);

  return toRepoData(apiRepoSchema.parse(repo), sortedLanguages);
}

// Picks the repositories for "More on GitHub": public, not forks, not already featured,
// and not the special profile repository that shares the account's name.
export function selectRecentRepos(repos: ApiRepo[], featuredNames: string[]): RepoData[] {
  return repos
    .filter((repo) => !repo.private && !repo.fork)
    .filter((repo) => repo.name !== GITHUB_USERNAME && !featuredNames.includes(repo.name))
    .slice(0, RECENT_LIMIT)
    .map((repo) => toRepoData(repo, repo.language ? [repo.language] : []));
}

// This address only lists public repositories, even when a token is sent.
async function fetchRecentRepos(featuredNames: string[], token: string | undefined) {
  const repos = await fetchFromGitHub(
    `/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
    token,
  );
  return selectRecentRepos(z.array(apiRepoSchema).parse(repos), featuredNames);
}

// Fetches everything. It never throws: anything that failed is listed in "failures",
// so the caller can use saved data for those parts only.
export async function fetchGitHubData(featuredNames: string[], token: string | undefined) {
  const [featuredResults, recentResult] = await Promise.all([
    Promise.allSettled(featuredNames.map((name) => fetchRepo(name, token))),
    Promise.allSettled([fetchRecentRepos(featuredNames, token)]),
  ]);

  const featured: Record<string, RepoData> = {};
  const failures: string[] = [];

  featuredResults.forEach((result, index) => {
    const name = featuredNames[index] ?? "unknown";
    if (result.status === "fulfilled") {
      featured[name] = result.value;
    } else {
      failures.push(`${name}: ${String(result.reason)}`);
    }
  });

  const [recent] = recentResult;
  if (recent?.status === "rejected") failures.push(`recent repos: ${String(recent.reason)}`);

  return {
    featured,
    recent: recent?.status === "fulfilled" ? recent.value : undefined,
    failures,
  };
}
