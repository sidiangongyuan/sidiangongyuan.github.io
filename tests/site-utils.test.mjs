import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { matchesPaper, searchTerms } from "../site-utils.mjs";

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("index.html", root), "utf8");
const papers = [
  { year: "2026", text: "UECP Uncertainty-Enhanced Collaborative Perception" },
  { year: "2025", text: "ACCO anchor-centric sparse communication" },
  { year: "2024", text: "CoDRMA camera-based BEV 3D detection" },
];

test("search handles case, whitespace, accents, and punctuation", () => {
  assert.deepEqual(searchTerms("  Uncertainty-Enhanced  V2X / café "),
    ["uncertainty", "enhanced", "v2x", "cafe"]);
  assert.equal(matchesPaper(papers[0], "uncertainty enhanced"), true);
  assert.equal(matchesPaper(papers[1], "  ACCO   sparse "), true);
  assert.equal(matchesPaper(papers[1], "ACCO dense"), false);
});

test("year and keyword filters combine and support empty results", () => {
  assert.equal(papers.filter(p => matchesPaper(p, "")).length, 3);
  assert.equal(papers.filter(p => matchesPaper(p, "", "2024")).length, 1);
  assert.equal(papers.filter(p => matchesPaper(p, "camera", "2026")).length, 0);
  assert.equal(papers.filter(p => matchesPaper(p, "camera", "2024")).length, 1);
});

test("all static anchors resolve and IDs are unique", () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(id), `Missing anchor: ${id}`);
  }
});

test("all local image, style, and module references exist", () => {
  const source = `${html}\n${readFileSync(new URL("app.js", root), "utf8")}`;
  for (const [, path] of source.matchAll(/(?:src|href|data-preview)="([^"#]+)"/g)) {
    if (/^(?:https?:|data:)/.test(path)) continue;
    assert.ok(existsSync(fileURLToPath(new URL(path.split("?")[0], root))), path);
  }
  assert.ok(existsSync(new URL("site-utils.mjs", root)));
});

test("CoVLM-Bench exposes one original teaser with accessible fallback link", () => {
  const imageLink = html.match(/<a class="featured-manuscript-image"[^>]*>/)?.[0];
  assert.ok(imageLink);
  assert.match(imageLink, /href="assets\/projects\/covlm-bench\/teaser\.png"/);
  assert.match(imageLink, /aria-label="Open CoVLM-Bench teaser figure"/);
  assert.equal((html.match(/href="assets\/projects\/covlm-bench\/[a-z-]+\.png"/g) ?? []).length, 1);
});

test("all selected papers have years and timeline covers all research entries", () => {
  assert.equal([...html.matchAll(/<article class="paper" id="[^"]+" data-year="202[456]"/g)].length, 5);
  const timeline = html.slice(html.indexOf('<ol class="timeline">'), html.indexOf("</ol>"));
  for (const id of ["covlm-bench", "uecp", "eimc", "bolt", "lrv2x", "acco", "qumco",
    "prodiff", "codrma", "point-prc", "dram"]) {
    assert.ok(timeline.includes(`href="#${id}"`), id);
  }
});

test("public copy excludes internal paths, submission labels, and placeholder links", () => {
  assert.doesNotMatch(html, /\/mnt\/|\/home\/|ICLR\s*2027|V5\.2|smoke|checkpoint|TODO|—|–/i);
  assert.doesNotMatch(html, /href="#"/);
  assert.match(html, /Preprint not yet available\./);
  assert.doesNotMatch(html, /assets\/[^" ]+\.pdf/);
});
