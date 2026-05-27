# Kang Yang Master's Research Portfolio

Static GitHub Pages site for presenting Kang Yang's master's-period research
work, with collaborative perception and first-author papers as the main thread.

## Local Preview

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy To GitHub Pages

The target repository is `sidiangongyuan/sidiangongyuan.github.io`, but it was
not publicly accessible during setup, and GitHub CLI is not installed in this
environment. To publish:

```powershell
git init
git add index.html styles.css app.js assets README.md .nojekyll
git commit -m "Build master's research portfolio"
git branch -M main
git remote add origin https://github.com/sidiangongyuan/sidiangongyuan.github.io.git
git push -u origin main
```

If the remote repository does not exist yet, create a public repository named
`sidiangongyuan.github.io` under the `sidiangongyuan` GitHub account first.

## Content Notes

- The 2023 TMM paper is intentionally excluded from the master's-period
  portfolio.
- CoDRMA uses a recreated overview image because a public framework figure was
  not available from the sources accessible here.
- Main data is maintained in `app.js` through consistent work fields:
  `title`, `year`, `venue`, `role`, `category`, `image`, `problem`, `idea`,
  `myRole`, `result`, `metrics`, and `links`.
