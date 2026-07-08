const STOP_WORDS = new Set(
  "a an and are as at be by for from has he i in is it its of on that the to was were will with you we they this do but what if when how also"
    .split(" ")
);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * Simple suffix-based stemmer. Reduces inflected forms so
 * "managing" matches "management", "developers" matches "developer", etc.
 */
function stem(word: string): string {
  const w = word;
  if (w.length <= 3) return w;
  if (w.endsWith("ations") && w.length > 8) return w.slice(0, -6);
  if (w.endsWith("ation") && w.length > 7) return w.slice(0, -5);
  if (w.endsWith("tions") && w.length > 7) return w.slice(0, -5);
  if (w.endsWith("tion") && w.length > 6) return w.slice(0, -4);
  if (w.endsWith("ings") && w.length > 6) return w.slice(0, -4);
  if (w.endsWith("ing") && w.length > 6) return w.slice(0, -3);
  if (w.endsWith("ness") && w.length > 6) return w.slice(0, -4);
  if (w.endsWith("ments") && w.length > 7) return w.slice(0, -5);
  if (w.endsWith("ment") && w.length > 6) return w.slice(0, -4);
  if (w.endsWith("ities") && w.length > 7) return w.slice(0, -5);
  if (w.endsWith("ity") && w.length > 5) return w.slice(0, -3);
  if (w.endsWith("ied") && w.length > 4) return w.slice(0, -3) + "y";
  if (w.endsWith("ies") && w.length > 4) return w.slice(0, -3) + "y";
  if (w.endsWith("ed") && w.length > 4) return w.slice(0, -2);
  if (w.endsWith("er") && w.length > 4) return w.slice(0, -2);
  if (w.endsWith("ly") && w.length > 4) return w.slice(0, -2);
  if (w.endsWith("s") && !w.endsWith("ss") && w.length > 3) return w.slice(0, -1);
  return w;
}

/**
 * Extract bigrams from token stream, but only keep those that actually
 * appear as a consecutive phrase in the raw text (stop words removed by
 * tokenizer, so verify against raw source).
 */
function extractVerifiedBigrams(tokens: string[], rawText: string): string[] {
  const bigrams = new Set<string>();
  const rawLower = rawText.toLowerCase().replace(/[^\w\s]/g, " ");
  for (let i = 0; i < tokens.length - 1; i++) {
    const phrase = `${tokens[i]} ${tokens[i + 1]}`;
    if (rawLower.includes(phrase)) {
      bigrams.add(phrase);
    }
  }
  return Array.from(bigrams);
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
  /** Single keywords from the job ad found in your CV (stem-matched) */
  inCv: string[];
  /** Single keywords from the job ad missing from your CV */
  missing: string[];
  /** Multi-word phrases from the job ad found in your CV */
  phrasesInCv: string[];
  /** Multi-word phrases from the job ad missing from your CV */
  phrasesMissing: string[];
};

export function checkKeywords(jobAd: string, cvText: string): KeywordResult {
  const jobTokens = tokenize(jobAd);
  const cvTokens = tokenize(cvText);
  const jobFreq = getWordFreq(jobTokens);

  // Build a set of CV word stems for fast lookup
  const cvStemSet = new Set(cvTokens.map(stem));

  const inCv: string[] = [];
  const missing: string[] = [];

  // Single-word matching with stemming
  for (const word of Array.from(jobFreq.keys())) {
    if (cvStemSet.has(stem(word))) {
      inCv.push(word);
    } else {
      missing.push(word);
    }
  }

  // Multi-word phrase matching: bigrams verified against raw job ad text
  const jobBigrams = extractVerifiedBigrams(jobTokens, jobAd);
  const cvTextLower = cvText.toLowerCase().replace(/[^\w\s]/g, " ");

  const phrasesInCv: string[] = [];
  const phrasesMissing: string[] = [];

  for (const phrase of jobBigrams) {
    if (cvTextLower.includes(phrase)) {
      phrasesInCv.push(phrase);
    } else {
      phrasesMissing.push(phrase);
    }
  }

  inCv.sort();
  missing.sort();
  phrasesInCv.sort();
  phrasesMissing.sort();

  return {
    jobWordCount: jobTokens.length,
    jobCharCount: jobAd.trim().length,
    cvWordCount: cvTokens.length,
    cvCharCount: cvText.trim().length,
    inCv,
    missing,
    phrasesInCv,
    phrasesMissing,
  };
}
