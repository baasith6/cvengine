import crypto from "crypto";
import { base64UrlEncode } from "./base64url";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

function signJwtRS256(params: { header: object; payload: object; privateKeyPem: string }): string {
  const headerB64 = base64UrlEncode(JSON.stringify(params.header));
  const payloadB64 = base64UrlEncode(JSON.stringify(params.payload));
  const data = `${headerB64}.${payloadB64}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(data);
  signer.end();
  const signature = signer.sign(params.privateKeyPem);
  return `${data}.${base64UrlEncode(signature)}`;
}

export function createGitHubAppJwt(): string {
  const appId = requireEnv("GITHUB_APP_ID");
  const privateKeyPem = requireEnv("GITHUB_APP_PRIVATE_KEY_PEM").replaceAll("\\n", "\n");

  const iat = nowSeconds() - 30;
  const exp = iat + 9 * 60; // GitHub requires <= 10 minutes

  return signJwtRS256({
    header: { alg: "RS256", typ: "JWT" },
    payload: { iat, exp, iss: appId },
    privateKeyPem,
  });
}

async function githubFetch<T>(params: {
  method: string;
  url: string;
  token: string;
  body?: unknown;
}): Promise<T> {
  const res = await fetch(params.url, {
    method: params.method,
    headers: {
      Authorization: `Bearer ${params.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(params.body ? { "Content-Type": "application/json" } : {}),
    },
    body: params.body ? JSON.stringify(params.body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GitHub API ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function getInstallationToken(): Promise<string> {
  const installationId = requireEnv("GITHUB_APP_INSTALLATION_ID");
  const jwt = createGitHubAppJwt();

  const data = await githubFetch<{ token: string }>({
    method: "POST",
    url: `https://api.github.com/app/installations/${installationId}/access_tokens`,
    token: jwt,
  });

  return data.token;
}

export async function githubApi<T>(params: { method: string; path: string; token: string; body?: unknown }): Promise<T> {
  return githubFetch<T>({
    method: params.method,
    url: `https://api.github.com${params.path}`,
    token: params.token,
    body: params.body,
  });
}

