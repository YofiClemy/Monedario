(function () {
  const DATA_URL = "https://yoficlemy.github.io/Monedario/data/roadmap.json?ts=" + Date.now();

  function bucketName(status) {
    const s = (status || "").toLowerCase();
    if (/in\s*progress|now/.test(s)) return "Now / In Progress";
    if (/planned/.test(s))          return "Planned";
    if (/under\s*review|backlog/.test(s)) return "Under Review";
    if (/done|completed|shipped/.test(s))  return "Done";
    return "Planned";
  }

  function el(tag, opts) {
    const n = document.createElement(tag);
    if (opts) {
      if (opts.className) n.className = opts.className;
      if (opts.text) n.textContent = opts.text;
      if (opts.html) n.innerHTML = opts.html;
      if (opts.href) n.href = opts.href;
      if (opts.target) n.target = opts.target;
      if (opts.rel) n.rel = opts.rel;
      if (opts.style) Object.assign(n.style, opts.style);
    }
    return n;
  }

  async function render() {
    const root = document.getElementById("roadmap");
    const fallback = document.getElementById("fallback");

    try {
      const res = await fetch(DATA_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const items = Array.isArray(data.items) ? data.items : [];
      const updatedAt = data.updatedAt;

      const columns = [
        { key: "now",  title: "Now / In Progress", test: s => /in\s*progress|now/i.test(s) },
        { key: "plan", title: "Planned",           test: s => /planned/i.test(s) },
        { key: "rev",  title: "Under Review",      test: s => /under\s*review|backlog/i.test(s) },
        { key: "done", title: "Done",              test: s => /done|completed|shipped/i.test(s) }
      ];
      const buckets = { now: [], plan: [], rev: [], done: [] };

      items.forEach(it => {
        const col = columns.find(c => c.test((it.status || "").toLowerCase())) || columns[1];
        buckets[col.key].push(it);
      });

      // top “updated” line
      root.appendChild(el("p", { className: "status", text: "Updated " + new Date(updatedAt).toLocaleString() }));

      // grid
      const grid = el("div", { className: "roadmap" });
      root.appendChild(grid);

      columns.forEach(c => {
        const col = el("div", { className: "col" });
        const h = el("h3");
        h.appendChild(document.createTextNode(c.title + " "));
        h.appendChild(el("span", { className: "count", text: String(buckets[c.key].length) }));
        col.appendChild(h);

        if (buckets[c.key].length === 0) {
          col.appendChild(el("div", { className: "status", text: "No items yet." }));
        } else {
          buckets[c.key].forEach(it => {
            const card = el("div", { className: "card" });
            const link = el("a", { href: it.url || "#", target: "_blank", rel: "noopener", text: it.title || "(untitled)" });
            const top = el("div"); top.appendChild(link); card.appendChild(top);
            if (it.repo) card.appendChild(el("div", { className: "status", text: it.repo }));
            if (Array.isArray(it.labels) && it.labels.length) {
              const labels = el("div", { });
              labels.style.marginTop = "4px";
              it.labels.forEach(l => labels.appendChild(el("span", { className: "count", text: l })));
              card.appendChild(labels);
            }
            col.appendChild(card);
          });
        }

        grid.appendChild(col);
      });
    } catch (e) {
      console.error(e);
      if (fallback) fallback.hidden = false;
    }
  }

  document.addEventListener("DOMContentLoaded", render);
})();
