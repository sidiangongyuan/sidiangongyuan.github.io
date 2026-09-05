/** Normalize search terms without treating punctuation as significant. */
export function searchTerms(text) {
  return text.normalize("NFKD").toLowerCase()
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim().split(/\s+/).filter(Boolean);
}

/** Match a paper's searchable text and publication year. */
export function matchesPaper(paper, query, year = "all") {
  if (year !== "all" && paper.year !== year) return false;
  const text = searchTerms(paper.text).join(" ");
  return searchTerms(query).every(term => text.includes(term));
}
