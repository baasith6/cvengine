const STOP_WORDS = new Set(
  "a an and are as at be by for from has he in is it its of on that the to was were will with".split(
    " "
  )
);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

function getWordFreq(tokens: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const t of tokens) {
    freq.set(t, (freq.get(t) ?? 0) + 1);
  }
  return freq;
}

export type KeywordResult = {
  jobWordCount: number;
  jobCharCount: number;
  cvWordCount: number;
  cvCharCount: number;
  inCv: string[];
  missing: string[];
};

export function checkKeywords(jobAd: string, cvText: string): KeywordResult {
  const jobTokens = tokenize(jobAd);
  const cvTokens = tokenize(cvText);
  const jobFreq = getWordFreq(jobTokens);
  const cvSet = new Set(cvTokens);

  const inCv: string[] = [];
  const missing: string[] = [];

  for (const word of Array.from(jobFreq.keys())) {
    if (cvSet.has(word)) inCv.push(word);
    else missing.push(word);
  }

  inCv.sort();
  missing.sort();

  return {
    jobWordCount: jobTokens.length,
    jobCharCount: jobAd.trim().length,
    cvWordCount: cvTokens.length,
    cvCharCount: cvText.trim().length,
    inCv,
    missing,
  };
}
