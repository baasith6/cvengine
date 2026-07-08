import recommendations from "@/self-eval/recommendations.json";

export type SelfEvalBanner = {
  id: string;
  matchPaths: string[];
  severity: "info" | "warning";
  title: string;
  body: string;
};

export type SelfEvalRecommendations = {
  version: number;
  generatedAt: string | null;
  banners: SelfEvalBanner[];
};

export function getRecommendations(): SelfEvalRecommendations {
  return recommendations as SelfEvalRecommendations;
}

export function bannersForPath(path: string): SelfEvalBanner[] {
  const p = path.startsWith("/") ? path : `/${path}`;
  return getRecommendations().banners.filter((b) =>
    b.matchPaths.some((mp) => (mp === "/" ? p === "/" : p === mp || p.startsWith(`${mp}/`)))
  );
}

