const featuredWorks = [
  {
    id: "eimc",
    title: "EIMC: Efficient Instance-aware Multi-modal Collaborative Perception",
    shortTitle: "EIMC",
    year: "2026",
    venue: "ICRA 2026 / arXiv",
    role: "First author",
    category: "Multimodal collaboration",
    image: "assets/projects/eimc-framework.png",
    alt: "EIMC framework figure showing multimodal feature extraction, Mix-Voxel, instance completion, and refinement.",
    problem:
      "Multimodal collaborative detectors often follow local fusion before communication, which can be accurate but expensive to transmit and hard to align across agents.",
    idea:
      "Move collaboration earlier by injecting lightweight collaborative voxels into local modality fusion, then query only Top-K instance messages from uncertain, high-discrepancy regions.",
    myRole:
      "Led the framework design around Mix-Voxel, heatmap-driven instance communication, and instance completion/refinement for efficient multi-agent 3D detection.",
    result:
      "Reports 94.71 AP50 on OPV2V, 73.01 AP50 on DAIR-V2X, and 87.98 percent bandwidth reduction versus the best published multimodal collaborative detector.",
    metrics: ["87.98% less bandwidth", "94.71 OPV2V AP50", "58.37 DAIR-V2X AP70"],
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2603.02532" },
      { label: "Code", url: "https://github.com/sidiangongyuan/EIMC" },
    ],
  },
  {
    id: "bolt",
    title: "BOLT: Online Lightweight Adaptation for Preparation-Free Heterogeneous Cooperative Perception",
    shortTitle: "BOLT",
    year: "2026",
    venue: "arXiv preprint",
    role: "First author",
    category: "Online adaptation",
    image: "assets/projects/bolt-framework.png",
    alt: "BOLT framework showing an ego detector, neighbor feature stream, adaptive plugin, frozen fusion module, and ego-as-teacher distillation.",
    problem:
      "Heterogeneous cooperative perception normally assumes pre-deployment joint training or collaborator-specific adaptation, which breaks when unfamiliar agents meet online.",
    idea:
      "Insert a small ego-side plugin before the frozen fusion module and adapt it online using ego-as-teacher distillation, without labels or cooperative training data.",
    myRole:
      "Defined the preparation-free setting and designed the online adaptation plugin with AdaIN, residual adapter, and per-channel gate.",
    result:
      "Uses about 0.9M trainable parameters and reports up to +32.3 AP50 over unadapted fusion while surpassing ego-only performance across evaluated pairs.",
    metrics: ["0.9M trainable params", "+32.3 AP50", "label-free online adaptation"],
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2605.00405" },
      { label: "Code", url: "https://github.com/sidiangongyuan/BOLT" },
    ],
  },
  {
    id: "acco",
    title: "Is Discretization Fusion All You Need for Collaborative Perception?",
    shortTitle: "ACCO",
    year: "2025",
    venue: "ICRA 2025",
    role: "First author",
    category: "Anchor-centric fusion",
    image: "assets/projects/acco-framework.png",
    alt: "ACCO framework figure showing anchor queries, anchor featuring, confidence generation, local anchor alignment, and spatial-aware cross-attention.",
    problem:
      "Dense BEV feature-map fusion ties perception range and precision to communication cost, and it transmits substantial background redundancy.",
    idea:
      "Replace dense discretized maps with sparse anchor queries: agents transmit confident anchor features, then fuse them through local anchor alignment and spatial-aware cross-attention.",
    myRole:
      "Built the anchor-centric communication and fusion paradigm around AFB, ACG, LAAF, and SACA for camera-based collaborative object detection.",
    result:
      "Demonstrates a better communication-performance tradeoff and stronger long-range perception on OPV2V and DAIR-V2X.",
    metrics: ["anchor-centric communication", "Top-K confident anchors", "long-range BEV perception"],
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2503.13946" },
      { label: "Code", url: "https://github.com/sidiangongyuan/ACCO" },
    ],
  },
  {
    id: "codrma",
    title: "CoDRMA: Collaborative Depth Refinement via Dual-Mask and Dual-Attention for BEV Collaborative 3D Object Detection",
    shortTitle: "CoDRMA",
    year: "2024",
    venue: "IEEE CASE 2024",
    role: "First author",
    category: "Camera BEV collaboration",
    image: "assets/projects/codrma-recreated-overview.png",
    alt: "Recreated overview of CoDRMA showing camera agents, dual-mask depth refinement, BEV projection, dual-attention message refinement, and 3D detection.",
    problem:
      "Camera-based collaborative BEV detection depends on reliable depth and useful auxiliary messages, both of which are fragile under occlusion and long-range scenes.",
    idea:
      "Refine depth with dual masks and improve auxiliary collaborative messages with dual-attention before BEV 3D object detection.",
    myRole:
      "Developed the camera-based collaborative depth refinement direction that set up the later transition toward more efficient communication mechanisms.",
    result:
      "Accepted by IEEE CASE 2024 as an early master's-period first-author collaborative perception work.",
    metrics: ["dual-mask depth refinement", "dual-attention messages", "CASE 2024"],
    links: [
      { label: "DBLP", url: "https://dblp.org/rec/conf/case/YangWHJ24.html" },
    ],
  },
];

const manuscriptWorks = [
  {
    id: "qumco",
    title: "QumCo: Query-Based Multimodal Collaborative Perception",
    shortTitle: "QumCo",
    year: "2025",
    venue: "Manuscript",
    role: "Master's work",
    category: "Query-based multimodal collaboration",
    image: "assets/projects/qumco-framework.png",
    alt: "QumCo framework showing multimodal input encoding, query-based multimodal and agent fusion, and a decoder.",
    problem:
      "Dense BEV representations in multimodal collaboration transmit redundant background features and often limit both communication efficiency and foreground detail.",
    idea:
      "Use sparse 3D query proposals across local multimodal fusion, transmission, and cross-agent fusion. Lg-IPE bridges LiDAR-space queries to precise image features, while A2A-Fusion and KNN-Fusion handle global agent interaction and local query refinement.",
    myRole:
      "Developed the query-centric multimodal collaboration direction, connecting LiDAR-image local fusion with cross-agent query transmission and fusion.",
    result:
      "Evaluated on OPV2V and DAIR-V2X, the method reports clear detection gains while reducing transmission volume compared with dense BEV communication.",
    metrics: ["2025 manuscript", "3D query messages", "Lg-IPE / A2A / KNN"],
    links: [],
  },
  {
    id: "uecp",
    title: "UECP: Uncertainty-Enhanced Collaborative Perception",
    shortTitle: "UECP",
    year: "2026",
    venue: "Manuscript",
    role: "Master's work",
    category: "Uncertainty-aware fusion",
    image: "assets/projects/uecp-framework.png",
    alt: "UECP framework showing BEV encoding, an uncertainty head, uncertainty-aware pyramid fusion, and cooperative detection.",
    problem:
      "Confidence-map-guided fusion is coupled with detector outputs, so it can reinforce detection noise rather than provide independent physical evidence for collaborative weighting.",
    idea:
      "Predict a physically grounded uncertainty map supervised by LiDAR point density, then inject it into Uncertainty-Aware Pyramid Fusion through uncertainty-weighted downsampling and uncertainty-guided residual fusion.",
    myRole:
      "Built the uncertainty-enhanced fusion pipeline around the uncertainty map, UAPF, UWD, and UGRF for robust collaborative BEV perception.",
    result:
      "Reports stronger effectiveness and robustness on DAIR-V2X and V2V4REAL by using uncertainty as explicit evidence during fusion.",
    metrics: ["2026 manuscript", "uncertainty map", "UAPF / UWD / UGRF"],
    links: [],
  },
  {
    id: "lrv2x",
    title: "LR-V2X: Loss-Resilient Collaborative Perception under Low-Bandwidth Communication",
    shortTitle: "LR-V2X",
    year: "2026",
    venue: "Manuscript",
    role: "Master's work",
    category: "Loss-resilient communication",
    image: "assets/projects/lrv2x-framework.png",
    alt: "LR-V2X framework showing compact latent transmission, latent prior decoding, noise-conditioned reconstruction, and pyramid feature fusion.",
    problem:
      "Low-bandwidth collaborative perception becomes brittle when packet loss corrupts compact transmitted features and leaves spatial holes in received BEV evidence.",
    idea:
      "Recover complete BEV context from corrupted compact latents using a Latent Prior Decoder and an ego-conditioned noise-based reconstructor before final fusion.",
    myRole:
      "Developed the loss-resilient reconstruction-first collaboration pipeline for packet loss and low-bandwidth V2X settings.",
    result:
      "Reports the strongest robustness under severe packet loss, including 90 percent packet loss, while using 64x less bandwidth than dense BEV fusion baselines.",
    metrics: ["2026 manuscript", "90% packet loss", "64x lower bandwidth"],
    links: [],
  },
];

const arcSteps = [
  {
    title: "2024: refine camera BEV collaboration",
    body: "CoDRMA focuses on the camera-based BEV pipeline, improving depth and auxiliary messages before collaborative 3D detection.",
  },
  {
    title: "2025: avoid dense feature-map exchange",
    body: "ACCO asks whether collaboration must happen on discretized BEV maps, then moves communication to confident anchor queries.",
  },
  {
    title: "2025: move multimodal collaboration to queries",
    body: "QumCo keeps sparse 3D queries through local multimodal fusion, transmission, and cross-agent query fusion.",
  },
  {
    title: "2026: combine multimodal accuracy and bandwidth",
    body: "EIMC uses early collaborative voxels and heatmap-driven instance messages to make multimodal collaboration compact.",
  },
  {
    title: "2026: improve robustness under uncertainty and loss",
    body: "UECP injects physical uncertainty into fusion, while LR-V2X reconstructs missing BEV context when packets are lost.",
  },
  {
    title: "2026: adapt to unknown collaborators",
    body: "BOLT studies deployment-time heterogeneity, adapting a small plugin online when independently trained agents meet.",
  },
];

const otherResearch = [
  {
    title: "ProDiff: Prototype-Guided Diffusion for Minimal Information Trajectory Imputation",
    venue: "arXiv preprint, 2025",
    note: "Trajectory imputation work using prototype-guided diffusion under minimal information.",
    url: "https://arxiv.org/abs/2505.23048",
  },
  {
    title: "DRAM-like Architecture with Asynchronous Refreshing for Continual Relation Extraction",
    venue: "The Web Conference 2024",
    note: "Continual relation extraction work with asynchronous refreshing inspired by DRAM-style memory behavior.",
    url: "https://openreview.net/forum?id=3TSpM7X2aY",
  },
  {
    title: "Point-PRC: A Prompt Learning Based Regulation Framework for Generalizable Point Cloud Analysis",
    venue: "NeurIPS 2024",
    note: "Generalizable point cloud analysis work listed as broader supporting research.",
    url: "https://proceedings.neurips.cc/paper_files/paper/2024/hash/d6938c8e88ef62394d2f4f3fd428e036-Abstract-Conference.html",
  },
];

const sourceLinks = [
  ["Google Scholar", "https://scholar.google.com/citations?user=ULYCJ-UAAAAJ&hl=zh-CN"],
  ["GitHub", "https://github.com/sidiangongyuan"],
  ["OpenReview", "https://openreview.net/profile?id=~yang_kang2"],
  ["EIMC", "https://arxiv.org/abs/2603.02532"],
  ["BOLT", "https://arxiv.org/abs/2605.00405"],
  ["ACCO", "https://arxiv.org/abs/2503.13946"],
  ["CoDRMA", "https://dblp.org/rec/conf/case/YangWHJ24.html"],
  ["ProDiff", "https://arxiv.org/abs/2505.23048"],
  ["DRAM", "https://openreview.net/forum?id=3TSpM7X2aY"],
  ["Point-PRC", "https://proceedings.neurips.cc/paper_files/paper/2024/hash/d6938c8e88ef62394d2f4f3fd428e036-Abstract-Conference.html"],
];

function createLink(link) {
  const a = document.createElement("a");
  a.href = link.url;
  a.target = "_blank";
  a.rel = "noreferrer";
  a.textContent = link.label;
  return a;
}

function renderArc() {
  const container = document.querySelector("#arc-list");
  arcSteps.forEach((step, index) => {
    const article = document.createElement("article");
    article.className = "arc-step";
    article.dataset.index = String(index + 1).padStart(2, "0");
    article.innerHTML = `<h3>${step.title}</h3><p>${step.body}</p>`;
    container.appendChild(article);
  });
}

function renderWorks(selector, works) {
  const container = document.querySelector(selector);
  works.forEach((work) => {
    const article = document.createElement("article");
    article.className = "work-card";
    article.innerHTML = `
      <figure class="work-media">
        <img src="${work.image}" alt="${work.alt}" />
      </figure>
      <div class="work-content">
        <div class="work-kicker">
          <span class="tag">${work.shortTitle}</span>
          <span class="venue">${work.year} - ${work.venue}</span>
          <span class="venue">${work.role}</span>
        </div>
        <h3>${work.title}</h3>
        <dl class="work-fields">
          <div><dt>Problem</dt><dd>${work.problem}</dd></div>
          <div><dt>Idea</dt><dd>${work.idea}</dd></div>
          <div><dt>My role</dt><dd>${work.myRole}</dd></div>
          <div><dt>Result</dt><dd>${work.result}</dd></div>
        </dl>
        <div class="metrics">${work.metrics.map((metric) => `<span class="metric">${metric}</span>`).join("")}</div>
        <div class="work-links"></div>
      </div>
    `;
    const links = article.querySelector(".work-links");
    work.links.forEach((link) => links.appendChild(createLink(link)));
    if (work.links.length === 0) links.remove();
    container.appendChild(article);
  });
}

function renderOtherResearch() {
  const container = document.querySelector("#other-research");
  otherResearch.forEach((item) => {
    const article = document.createElement("article");
    article.className = "other-item";
    article.innerHTML = `
      <div>
        <h3>${item.title}</h3>
        <p>${item.note}</p>
        <div class="other-meta">${item.venue}</div>
      </div>
      <a href="${item.url}" target="_blank" rel="noreferrer">Link</a>
    `;
    container.appendChild(article);
  });
}

function renderSources() {
  const container = document.querySelector("#source-links");
  sourceLinks.forEach(([label, url]) => {
    container.appendChild(createLink({ label, url }));
  });
}

renderArc();
renderWorks("#featured-works", featuredWorks);
renderWorks("#manuscript-works", manuscriptWorks);
renderOtherResearch();
renderSources();
