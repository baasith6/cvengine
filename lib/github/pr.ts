import { githubApi } from "@/lib/github/github-app";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function repoInfo() {
  const owner = requireEnv("GITHUB_REPO_OWNER");
  const repo = requireEnv("GITHUB_REPO_NAME");
  const baseBranch = process.env.GITHUB_BASE_BRANCH || "main";
  return { owner, repo, baseBranch };
}

async function getRefSha(params: { token: string; owner: string; repo: string; ref: string }): Promise<string> {
  const data = await githubApi<{ object: { sha: string } }>({
    method: "GET",
    path: `/repos/${params.owner}/${params.repo}/git/ref/${encodeURIComponent(params.ref)}`,
    token: params.token,
  });
  return data.object.sha;
}

async function createBranch(params: {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  fromSha: string;
}) {
  await githubApi({
    method: "POST",
    path: `/repos/${params.owner}/${params.repo}/git/refs`,
    token: params.token,
    body: { ref: `refs/heads/${params.branch}`, sha: params.fromSha },
  });
}

async function getFileSha(params: {
  token: string;
  owner: string;
  repo: string;
  path: string;
  branch: string;
}): Promise<string | null> {
  try {
    const data = await githubApi<{ sha: string }>({
      method: "GET",
      path: `/repos/${params.owner}/${params.repo}/contents/${encodeURIComponent(params.path)}?ref=${encodeURIComponent(
        params.branch
      )}`,
      token: params.token,
    });
    return typeof data.sha === "string" ? data.sha : null;
  } catch {
    return null;
  }
}

async function putFile(params: {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  path: string;
  contentUtf8: string;
  message: string;
}) {
  const sha = await getFileSha(params);
  await githubApi({
    method: "PUT",
    path: `/repos/${params.owner}/${params.repo}/contents/${encodeURIComponent(params.path)}`,
    token: params.token,
    body: {
      message: params.message,
      content: Buffer.from(params.contentUtf8, "utf8").toString("base64"),
      branch: params.branch,
      ...(sha ? { sha } : {}),
    },
  });
}

export async function createSelfEvalPr(params: {
  token: string;
  title: string;
  body: string;
  files: Array<{ path: string; contentUtf8: string }>;
}): Promise<{ url: string; number: number; branch: string }> {
  const { owner, repo, baseBranch } = repoInfo();
  const baseSha = await getRefSha({ token: params.token, owner, repo, ref: `heads/${baseBranch}` });
  const branch = `self-eval/${new Date().toISOString().slice(0, 10)}`;

  await createBranch({ token: params.token, owner, repo, branch, fromSha: baseSha });

  for (const f of params.files) {
    await putFile({
      token: params.token,
      owner,
      repo,
      branch,
      path: f.path,
      contentUtf8: f.contentUtf8,
      message: `self-eval: update ${f.path}`,
    });
  }

  const pr = await githubApi<{ html_url: string; number: number }>({
    method: "POST",
    path: `/repos/${owner}/${repo}/pulls`,
    token: params.token,
    body: {
      title: params.title,
      head: branch,
      base: baseBranch,
      body: params.body,
      maintainer_can_modify: true,
    },
  });

  return { url: pr.html_url, number: pr.number, branch };
}

