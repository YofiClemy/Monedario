---
layout: default
title: Roadmap
nav_order: 3
---

<div id="roadmap-app">
  <p class="updated" id="updated"></p>
  <div class="roadmap-grid" id="grid"></div>
  <p class="fallback" id="fallback" hidden>
    Can’t load the embedded roadmap right now.
    You can still view it on GitHub:
    <a href="https://github.com/users/YofiClemy/projects/1" target="_blank" rel="noopener">Public Project</a>.
  </p>
</div>

<style>
:root { --brand: #08413B; }
.roadmap-grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.col{border:1px solid #e5e7eb;border-radius:12px;padding:12px;background:#fff}
.col h2{margin:0 0 .5rem 0;font-size:1rem;display:flex;align-items:center;gap:.5rem}
.count{background:#eef2f7;border:1px solid #e5e7eb;border-radius:999px;padding:2px 8px;font-size:.75rem}
.card{border:1px solid #e5e7eb;border-radius:10px;padding:10px;margin:8px 0;background:#fff}
.card a{color:var(--brand);text-decoration:none}
.badge{font-size:.72rem;border:1px solid #e5e7eb;border-radius:999px;padding:2px 8px;margin-right:4px}
.updated{font-size:.85rem;opacity:.7;margin:0 0 10px 0}
@media (prefers-color-scheme: dark){
  .col,.card{background:#0b0f14;border-color:#1f2937}
  .count{background:#111827;border-color:#374151;color:#cbd5e1}
  .card a{color:#22b3a6}
}
</style>

<script>
(async () => {
  const grid = document.getElementById('grid');
  const updated = document.getElementById('updated');
  const fallback = document.getElementById('fallback');

  try {
    // IMPORTANT: relative_url handles your baseurl automatically
    const res = await fetch("{{ '/data/roadmap.json' | relative_url }}");
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const { items = [], updatedAt, project } = await res.json();

    // Map your various status names into 4 public columns
    const columns = [
      { id: 'now',   title: 'Now / In progress', match: s => /in\s*progress|now/i.test(s) },
      { id: 'plan',  title: 'Planned',           match: s => /planned/i.test(s) },
      { id: 'review',title: 'Under review',      match: s => /under\s*review|backlog/i.test(s) },
      { id: 'done',  title: 'Done',              match: s => /done|completed|shipped/i.test(s) }
    ];
    const buckets = Object.fromEntries(columns.map(c => [c.id, []]));

    for (const it of items) {
      const s = (it.status || '').toLowerCase();
      const col = (columns.find(c => c.match(s)) || { id: 'review' }).id;
      buckets[col].push(it);
    }

    updated.textContent = `Updated ${new Date(updatedAt).toLocaleString()} • Source: ${project?.title ?? 'GitHub Project'}`;

    grid.innerHTML = columns.map(c => {
      const list = buckets[c.id];
      const cards = list.map(it => `
        <div class="card">
          <div><a href="${it.url || '#'}" target="_blank" rel="noopener">${it.title}</a></div>
          ${it.labels?.length ? `<div class="labels">${it.labels.map(l=>`<span class="badge">${l}</span>`).join('')}</div>` : ''}
          ${it.repo ? `<div class="meta" style="opacity:.7;font-size:.8rem;margin-top:4px;">${it.repo}</div>` : ''}
        </div>
      `).join('');
      return `
        <div class="col">
          <h2>${c.title} <span class="count">${list.length}</span></h2>
          ${cards || '<div style="opacity:.6">No items yet.</div>'}
        </div>
      `;
    }).join('');
  } catch (e) {
    console.error(e);
    fallback.hidden = false;
  }
})();
</script>
