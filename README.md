# Kang Yang Academic Homepage

**Homepage:** [https://sidiangongyuan.github.io/](https://sidiangongyuan.github.io/)

This site presents Kang Yang's research at Renmin University of China, focused
on collaborative perception and vision-language planning for autonomous driving.

## Research Areas

- Collaborative Perception
- Vision-Language Planning
- Multi-agent 3D Object Detection

## Editing

The site is plain HTML, CSS, and JavaScript, served by GitHub Pages from `main`.
Edit paper titles, summaries, and public links in `index.html`. Unpublished
manuscripts are labeled separately from published papers and arXiv preprints.
Add the CoVLM-Bench arXiv link to its article when it becomes available.

The CoVLM-Bench project card includes one curated teaser figure, matching the
single-image treatment used for the other projects. It links to the original
full-resolution PNG and is easy to replace when a public preprint is available.

The page also includes keyword/year filters for selected papers, a linked research
timeline, project-link sharing, and an optional color-theme preference. Update the
timeline alongside new research entries. Use only confirmed publication years;
manuscripts and arXiv preprints are not labeled as accepted conference papers.

Preview locally with `python3 -m http.server`. No build step or package install
is required. All research content and original-image links are available without
JavaScript. Run `node --test tests/site-utils.test.mjs` for search/navigation helper
tests and static content/resource checks, and `node --check app.js` for syntax.
