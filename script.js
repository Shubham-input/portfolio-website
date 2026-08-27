const courseProjects = [
  {
    slug: "task-tracker",
    tagline: "keeping todos honest",
    name: "Task Tracker",
    desc: "A CRUD task manager with due dates and priority tags, built to practice REST API design.",
    tags: ["React", "Node"],
  },
  {
    slug: "weather-dashboard",
    tagline: "checking the sky, ergonomically",
    name: "Weather Dashboard",
    desc: "A weather lookup app pulling live data from a public API, with saved locations and unit toggles.",
    tags: ["JavaScript", "API"],
  },
  {
    slug: "recipe-finder",
    tagline: "what's for dinner",
    name: "Recipe Finder",
    desc: "A recipe search tool that filters by ingredients on hand, built while learning async data fetching.",
    tags: ["React", "CSS"],
  },
  {
    slug: "expense-splitter",
    tagline: "friendship, minus the math",
    name: "Expense Splitter",
    desc: "A group expense splitter that calculates who owes who after a shared trip or dinner.",
    tags: ["Node", "SQL"],
  },
];

function renderGridCard(p) {
  return `
    <div class="grid-card">
      <div class="card-chrome">
        <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
        <span class="path">~/${p.slug}</span>
      </div>
      <p class="comment">// ${p.tagline}</p>
      <h4>${p.name}</h4>
      <p class="desc">${p.desc}</p>
      <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <a href="#" class="card-github-link" target="_blank" rel="noopener"><img src="images/logo-github.svg" alt="" /> View on GitHub</a>
    </div>`;
}

document.querySelector("#project-grid").innerHTML = courseProjects
  .map(renderGridCard)
  .join("");
