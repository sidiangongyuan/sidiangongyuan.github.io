# Kang Yang Academic Homepage

This repository hosts the source files for Kang Yang's public academic homepage.

**Website:** [https://sidiangongyuan.github.io/](https://sidiangongyuan.github.io/)

The homepage presents master's-period research at Renmin University of China,
with a focus on collaborative perception, autonomous driving perception, and
multi-agent 3D object detection.

## Featured Research

The homepage highlights first-author collaborative perception work from the
master's period:

- **EIMC**: Efficient Instance-aware Multi-modal Collaborative Perception
- **BOLT**: Online Lightweight Adaptation for Preparation-Free Heterogeneous Cooperative Perception
- **ACCO**: Is Discretization Fusion All You Need for Collaborative Perception?
- **CoDRMA**: Collaborative Depth Refinement via Dual-Mask and Dual-Attention for BEV Collaborative 3D Object Detection

It also includes selected manuscript-stage collaborative perception work, with
venue, submission, and private PDF details intentionally omitted.

Additional research is listed separately to keep the main narrative centered on
collaborative perception.

## Repository Structure

```text
.
├── index.html          # Static homepage entry point
├── styles.css          # Page layout and visual styling
├── app.js              # Publication and project data
├── assets/             # Project figures and visual materials
└── .nojekyll           # Ensures GitHub Pages serves files directly
```

## Updating The Homepage

Most content is maintained in `app.js`. To update a project, publication, link,
or metric, edit the corresponding data entry and push the change to `main`.
GitHub Pages will redeploy the public website automatically.

```powershell
git add .
git commit -m "Update homepage content"
git push
```

## Content Notes

- The public homepage is the canonical entry point:
  [https://sidiangongyuan.github.io/](https://sidiangongyuan.github.io/).
- The 2023 TMM paper is intentionally excluded from the master's-period
  portfolio.
- CoDRMA uses a recreated overview figure because a public framework figure was
  not available from accessible sources.
