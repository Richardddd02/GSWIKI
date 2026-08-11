(() => {
  "use strict";

  const dataset = window.CHRONICLE_DATA;
  if (!dataset || !Array.isArray(dataset.entries)) {
    document.body.innerHTML = '<main style="padding:40px;color:#ddd;background:#071211;min-height:100vh">资料文件加载失败，请确认 data.js 与页面位于同一目录。</main>';
    return;
  }

  const entries = dataset.entries;
  const PAGE_SIZE = 48;
  const categoryMeta = {
    all: { label: "全部档案", icon: "◇", description: "跨分类检索古神复苏中的核心资料。" },
    equipment: { label: "装备图鉴", icon: "⚔", description: "浏览传说、套装、独特、神话和基底装备。" },
    skill: { label: "职业技能", icon: "✦", description: "按职业查看基础、被动与主动技能。" },
    rune: { label: "符文", icon: "⌁", description: "查询四种品质的符文与对应效果。" },
    runeword: { label: "符文之语", icon: "⌘", description: "查看五大职业可激活的三孔符文组合。" },
    item: { label: "道具介绍", icon: "◈", description: "了解资源、宝箱和关键材料的获取与用途。" }
  };

  const els = {
    hero: document.querySelector(".hero-image"),
    version: document.getElementById("versionLabel"),
    totalCount: document.getElementById("totalCount"),
    equipmentCount: document.getElementById("equipmentCount"),
    skillCount: document.getElementById("skillCount"),
    runeCount: document.getElementById("runeCount"),
    categoryNav: document.getElementById("categoryNav"),
    search: document.getElementById("searchInput"),
    quality: document.getElementById("qualityFilter"),
    profession: document.getElementById("professionFilter"),
    subtype: document.getElementById("subtypeFilter"),
    sort: document.getElementById("sortFilter"),
    reset: document.getElementById("resetFilters"),
    emptyReset: document.getElementById("emptyReset"),
    activeFilters: document.getElementById("activeFilters"),
    cardGrid: document.getElementById("cardGrid"),
    template: document.getElementById("cardTemplate"),
    resultCount: document.getElementById("resultCount"),
    catalogTitle: document.getElementById("catalogTitle"),
    catalogDescription: document.getElementById("catalogDescription"),
    emptyState: document.getElementById("emptyState"),
    loadMore: document.getElementById("loadMore"),
    drawer: document.getElementById("detailDrawer"),
    backdrop: document.getElementById("drawerBackdrop"),
    drawerClose: document.getElementById("drawerClose"),
    detailIconWrap: document.getElementById("detailIconWrap"),
    detailKicker: document.getElementById("detailKicker"),
    detailTitle: document.getElementById("detailTitle"),
    detailTags: document.getElementById("detailTags"),
    detailSummary: document.getElementById("detailSummary"),
    detailFacts: document.getElementById("detailFacts"),
    detailImageSection: document.getElementById("detailImageSection"),
    detailImage: document.getElementById("detailImage")
  };

  const state = {
    category: "all",
    query: "",
    quality: "",
    profession: "",
    subtype: "",
    sort: "featured",
    visible: PAGE_SIZE,
    activeEntry: null
  };

  let lastFocused = null;

  function qualityClass(value) {
    return value ? `quality-${value.replace(/\s+/g, "-")}` : "quality-default";
  }

  function categoryLabel(key) {
    return categoryMeta[key]?.label || key;
  }

  function countFor(category) {
    return category === "all" ? entries.length : entries.filter(entry => entry.category === category).length;
  }

  function setupMeta() {
    const meta = dataset.meta || {};
    els.version.textContent = meta.version || "0.3.2.0";
    els.totalCount.textContent = String(meta.total || entries.length);
    els.equipmentCount.textContent = String(countFor("equipment"));
    els.skillCount.textContent = String(countFor("skill"));
    els.runeCount.textContent = String(countFor("rune") + countFor("runeword"));
    if (meta.heroImage) {
      els.hero.style.backgroundImage = `url("${meta.heroImage}")`;
    }
  }

  function buildCategoryNav() {
    els.categoryNav.replaceChildren();
    Object.entries(categoryMeta).forEach(([key, meta]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "category-button";
      button.dataset.category = key;
      button.setAttribute("aria-pressed", String(state.category === key));

      const icon = document.createElement("span");
      icon.className = "category-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = meta.icon;

      const label = document.createElement("span");
      label.className = "category-label";
      label.textContent = meta.label;

      const count = document.createElement("span");
      count.className = "category-count";
      count.textContent = String(countFor(key));

      button.append(icon, label, count);
      button.addEventListener("click", () => setCategory(key));
      els.categoryNav.append(button);
    });
    syncCategoryNav();
  }

  function syncCategoryNav() {
    els.categoryNav.querySelectorAll(".category-button").forEach(button => {
      const active = button.dataset.category === state.category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const meta = categoryMeta[state.category];
    els.catalogTitle.textContent = meta.label;
    els.catalogDescription.textContent = meta.description;
  }

  function baseEntries() {
    return state.category === "all" ? entries : entries.filter(entry => entry.category === state.category);
  }

  function uniqueSorted(field) {
    return [...new Set(baseEntries().map(entry => entry[field]).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }));
  }

  function populateSelect(select, values, allLabel, currentValue) {
    const fragment = document.createDocumentFragment();
    const all = document.createElement("option");
    all.value = "";
    all.textContent = allLabel;
    fragment.append(all);
    values.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      fragment.append(option);
    });
    select.replaceChildren(fragment);
    select.value = values.includes(currentValue) ? currentValue : "";
    return select.value;
  }

  function updateFacetOptions() {
    state.quality = populateSelect(els.quality, uniqueSorted("quality"), "全部品质", state.quality);
    state.profession = populateSelect(els.profession, uniqueSorted("profession"), "全部职业", state.profession);
    state.subtype = populateSelect(els.subtype, uniqueSorted("subtype"), "全部类型", state.subtype);
  }

  function normalizedHaystack(entry) {
    return [
      entry.name,
      entry.category,
      entry.subtype,
      entry.quality,
      entry.profession,
      entry.summary,
      entry.source,
      entry.usage,
      entry.sheet,
      ...(entry.tags || [])
    ].join(" ").toLocaleLowerCase("zh-CN");
  }

  function filteredEntries() {
    const query = state.query.trim().toLocaleLowerCase("zh-CN");
    const filtered = entries.filter(entry => {
      if (state.category !== "all" && entry.category !== state.category) return false;
      if (state.quality && entry.quality !== state.quality) return false;
      if (state.profession && entry.profession !== state.profession) return false;
      if (state.subtype && entry.subtype !== state.subtype) return false;
      if (query && !normalizedHaystack(entry).includes(query)) return false;
      return true;
    });

    if (state.sort === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name, "zh-CN", { numeric: true }));
    } else if (state.sort === "category") {
      filtered.sort((a, b) => {
        const byCategory = categoryLabel(a.category).localeCompare(categoryLabel(b.category), "zh-CN");
        return byCategory || a.name.localeCompare(b.name, "zh-CN", { numeric: true });
      });
    }
    return filtered;
  }

  function makeBadge(text, className = "") {
    const span = document.createElement("span");
    span.className = `badge ${className}`.trim();
    span.textContent = text;
    return span;
  }

  function renderCards() {
    const filtered = filteredEntries();
    const visible = filtered.slice(0, state.visible);
    els.resultCount.textContent = String(filtered.length);
    els.cardGrid.replaceChildren();

    const fragment = document.createDocumentFragment();
    visible.forEach((entry, index) => {
      const card = els.template.content.firstElementChild.cloneNode(true);
      card.classList.add(qualityClass(entry.quality));
      card.style.animationDelay = `${Math.min(index, 15) * 24}ms`;

      const button = card.querySelector(".card-open");
      button.dataset.entryId = entry.id;
      button.setAttribute("aria-label", `查看${entry.name}完整档案`);
      card.querySelector(".card-category").textContent = categoryLabel(entry.category);
      card.querySelector(".card-index").textContent = `NO. ${String(index + 1).padStart(3, "0")}`;
      card.querySelector(".card-title").textContent = entry.name;
      card.querySelector(".card-summary").textContent = entry.summary || "打开档案查看完整记录。";

      const icon = card.querySelector(".card-icon");
      if (entry.image) {
        icon.src = entry.image;
        icon.alt = `${entry.name}图标`;
        icon.addEventListener("error", () => {
          icon.removeAttribute("src");
          icon.hidden = true;
        }, { once: true });
      } else {
        icon.hidden = true;
      }

      const badges = card.querySelector(".card-badges");
      if (entry.quality) badges.append(makeBadge(entry.quality, "quality"));
      if (entry.profession) badges.append(makeBadge(entry.profession));
      if (entry.subtype && entry.subtype !== entry.quality && entry.subtype !== `${entry.quality}装备`) {
        badges.append(makeBadge(entry.subtype));
      }

      button.addEventListener("click", () => openDetail(entry, button));
      fragment.append(card);
    });
    els.cardGrid.append(fragment);

    const isEmpty = filtered.length === 0;
    els.emptyState.hidden = !isEmpty;
    els.cardGrid.hidden = isEmpty;
    els.loadMore.hidden = isEmpty || visible.length >= filtered.length;
    if (!els.loadMore.hidden) {
      els.loadMore.firstChild.textContent = `继续展开档案（剩余 ${filtered.length - visible.length} 条） `;
    }
    renderActiveFilters();
  }

  function renderActiveFilters() {
    els.activeFilters.replaceChildren();
    const chips = [];
    if (state.query) chips.push(["query", `搜索：${state.query}`]);
    if (state.quality) chips.push(["quality", `品质：${state.quality}`]);
    if (state.profession) chips.push(["profession", `职业：${state.profession}`]);
    if (state.subtype) chips.push(["subtype", `类型：${state.subtype}`]);

    chips.forEach(([key, label]) => {
      const chip = document.createElement("span");
      chip.className = "filter-chip";
      chip.append(document.createTextNode(label));
      const remove = document.createElement("button");
      remove.type = "button";
      remove.setAttribute("aria-label", `移除${label}筛选`);
      remove.textContent = "×";
      remove.addEventListener("click", () => {
        state[key] = "";
        if (key === "query") els.search.value = "";
        if (key === "quality") els.quality.value = "";
        if (key === "profession") els.profession.value = "";
        if (key === "subtype") els.subtype.value = "";
        state.visible = PAGE_SIZE;
        renderCards();
      });
      chip.append(remove);
      els.activeFilters.append(chip);
    });
  }

  function setCategory(category, scroll = false) {
    if (!categoryMeta[category]) return;
    state.category = category;
    state.visible = PAGE_SIZE;
    updateFacetOptions();
    syncCategoryNav();
    renderCards();
    if (scroll) document.getElementById("catalog").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetFilters({ keepCategory = false } = {}) {
    if (!keepCategory) state.category = "all";
    state.query = "";
    state.quality = "";
    state.profession = "";
    state.subtype = "";
    state.sort = "featured";
    state.visible = PAGE_SIZE;
    els.search.value = "";
    els.sort.value = "featured";
    updateFacetOptions();
    syncCategoryNav();
    renderCards();
  }

  function appendFact(fragment, label, value) {
    if (!value) return;
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value;
    fragment.append(dt, dd);
  }

  function openDetail(entry, trigger = null, updateHash = true) {
    lastFocused = trigger || document.activeElement;
    state.activeEntry = entry;
    const qClass = qualityClass(entry.quality);

    els.detailIconWrap.className = `detail-icon-wrap ${qClass}`;
    els.detailIconWrap.replaceChildren();
    if (entry.image) {
      const img = document.createElement("img");
      img.src = entry.image;
      img.alt = `${entry.name}图标`;
      img.addEventListener("error", () => {
        img.replaceWith(makeDetailFallback());
      }, { once: true });
      els.detailIconWrap.append(img);
    } else {
      els.detailIconWrap.append(makeDetailFallback());
    }

    els.detailKicker.textContent = `${categoryLabel(entry.category)} · ${entry.sheet}`;
    els.detailTitle.textContent = entry.name;
    els.detailSummary.textContent = entry.summary || "暂无文字说明，请查看完整图鉴。";
    els.detailTags.replaceChildren();
    [...new Set([entry.quality, entry.profession, entry.subtype, ...(entry.tags || [])].filter(Boolean))]
      .slice(0, 6)
      .forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag;
        els.detailTags.append(span);
      });

    const facts = document.createDocumentFragment();
    appendFact(facts, "档案分类", categoryLabel(entry.category));
    appendFact(facts, "品质", entry.quality);
    appendFact(facts, "职业", entry.profession);
    appendFact(facts, "类型", entry.subtype);
    appendFact(facts, "获取方式", entry.source);
    appendFact(facts, "用途", entry.usage);
    appendFact(facts, "原始索引", `${entry.sheet} · ${entry.cell}`);
    els.detailFacts.replaceChildren(facts);

    if (entry.detailImage) {
      els.detailImageSection.hidden = false;
      els.detailImage.src = entry.detailImage;
      els.detailImage.alt = `${entry.name}完整图鉴`;
    } else {
      els.detailImageSection.hidden = true;
      els.detailImage.removeAttribute("src");
      els.detailImage.alt = "";
    }

    els.backdrop.hidden = false;
    requestAnimationFrame(() => els.backdrop.classList.add("visible"));
    els.drawer.classList.add("open");
    els.drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
    els.drawerClose.focus({ preventScroll: true });
    if (updateHash) history.replaceState(null, "", `#entry=${entry.id}`);
  }

  function makeDetailFallback() {
    const fallback = document.createElement("span");
    fallback.className = "detail-icon-fallback";
    fallback.textContent = "◈";
    return fallback;
  }

  function closeDetail(updateHash = true) {
    if (!els.drawer.classList.contains("open")) return;
    state.activeEntry = null;
    els.drawer.classList.remove("open");
    els.drawer.setAttribute("aria-hidden", "true");
    els.backdrop.classList.remove("visible");
    document.body.classList.remove("drawer-open");
    window.setTimeout(() => { els.backdrop.hidden = true; }, 300);
    if (updateHash && location.hash.startsWith("#entry=")) {
      history.replaceState(null, "", `${location.pathname}${location.search}`);
    }
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus({ preventScroll: true });
  }

  function openFromHash() {
    const match = location.hash.match(/^#entry=([a-f0-9]+)$/);
    if (!match) return;
    const entry = entries.find(item => item.id === match[1]);
    if (entry) openDetail(entry, null, false);
  }

  function bindEvents() {
    els.search.addEventListener("input", event => {
      state.query = event.target.value;
      state.visible = PAGE_SIZE;
      renderCards();
    });
    els.quality.addEventListener("change", event => { state.quality = event.target.value; state.visible = PAGE_SIZE; renderCards(); });
    els.profession.addEventListener("change", event => { state.profession = event.target.value; state.visible = PAGE_SIZE; renderCards(); });
    els.subtype.addEventListener("change", event => { state.subtype = event.target.value; state.visible = PAGE_SIZE; renderCards(); });
    els.sort.addEventListener("change", event => { state.sort = event.target.value; state.visible = PAGE_SIZE; renderCards(); });
    els.reset.addEventListener("click", () => resetFilters({ keepCategory: true }));
    els.emptyReset.addEventListener("click", () => resetFilters());
    els.loadMore.addEventListener("click", () => { state.visible += PAGE_SIZE; renderCards(); });
    els.drawerClose.addEventListener("click", () => closeDetail());
    els.backdrop.addEventListener("click", () => closeDetail());

    document.querySelectorAll("[data-jump='catalog']").forEach(button => {
      button.addEventListener("click", () => document.getElementById("catalog").scrollIntoView({ behavior: "smooth" }));
    });
    document.querySelectorAll("[data-category-jump]").forEach(button => {
      button.addEventListener("click", () => setCategory(button.dataset.categoryJump, true));
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && els.drawer.classList.contains("open")) {
        closeDetail();
        return;
      }
      if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const tag = document.activeElement?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") {
          event.preventDefault();
          els.search.focus();
          els.search.select();
        }
      }
      if (event.key === "Tab" && els.drawer.classList.contains("open")) {
        const focusable = [...els.drawer.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")]
          .filter(node => !node.disabled && node.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener("hashchange", () => {
      if (location.hash.startsWith("#entry=")) openFromHash();
      else closeDetail(false);
    });
  }

  setupMeta();
  buildCategoryNav();
  updateFacetOptions();
  bindEvents();
  renderCards();
  openFromHash();
})();
