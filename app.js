const A = "assets/builds/";

const baseBuilds = [
  {
    id: "battle-mage-priest",
    name: "战法神",
    role: "混合",
    difficulty: "进阶",
    version: "三测",
    lineup: "电法 + 战士T + 神官",
    summary: "输出、承伤与续航形成三角闭环，适合稳定推进的完整队伍方案。",
    accent: "#44b6ae",
    tags: ["元素输出", "稳定推进", "完整阵容"],
    cover: A + "battle-mage-skill.webp",
    skillImages: [A + "battle-mage-skill.webp", A + "warrior-tank-skill.webp", A + "priest-skill.webp"],
    gear: [A + "battle-mage-weapon.webp", A + "warrior-tank-weapon.webp", A + "priest-weapon.webp", A + "battle-mage-head.webp", A + "warrior-tank-head.webp", A + "priest-head.webp"],
    mechanics: ["电法承担主要元素输出", "战士T稳定承伤并提供前排空间", "神官补足治疗、增益与容错"],
    details: "这套阵容将三个职业的职责拆得很清楚：电法集中堆叠元素输出，战士负责吸收压力，神官维持续航。\n\n装备选择优先服务各自的核心职责，不需要为了面板平均而牺牲技能循环。适合作为中后期稳定推进的基础模板。"
  },
  {
    id: "high-mana-lightning",
    name: "高蓝闪电冲击",
    role: "输出",
    difficulty: "高阶",
    version: "三测",
    lineup: "高蓝电法核心",
    summary: "围绕高魔力与闪电冲击构建爆发循环，对装备词条和资源管理要求较高。",
    accent: "#4ebec4",
    tags: ["闪电", "高魔力", "爆发"],
    cover: A + "lightning-skill.webp",
    skillImages: [A + "lightning-skill.webp"],
    gear: [A + "lightning-weapon.webp", A + "lightning-head.webp", A + "lightning-weapon-2.webp", A + "lightning-armor.webp"],
    mechanics: ["用高魔力放大闪电冲击收益", "优先保证资源循环，再追求爆发词条", "装备成型前容错相对有限"],
    details: "构筑重点不是单纯堆高伤害，而是让魔力储备、回复速度与闪电冲击的释放节奏保持稳定。\n\n这是一套上限较高的输出分支，适合已经拥有核心装备、愿意继续打磨词条的玩家。"
  },
  {
    id: "shield-bow",
    name: "盾弓",
    role: "坦克",
    difficulty: "入门",
    version: "三测",
    lineup: "盾弓单核 / 防守位",
    summary: "以持续护盾与稳定远程输出换取生存空间，装备要求直观，容易照着成型。",
    accent: "#d78947",
    tags: ["护盾", "远程", "易成型"],
    cover: A + "shield-bow-skill.webp",
    skillImages: [A + "shield-bow-skill.webp", A + "shield-bow-required.webp"],
    gear: [A + "shield-bow-weapon.webp", A + "shield-bow-head.webp", A + "shield-bow-necklace.webp", A + "shield-bow-gloves.webp", A + "shield-bow-ring.webp", A + "shield-bow-shoes.webp"],
    mechanics: ["保持护盾覆盖，降低被突发伤害击穿的概率", "远程站位让输出环境更稳定", "优先满足必备装备，再补充生存词条"],
    details: "盾弓的价值在于简单、稳定。技能与装备围绕护盾覆盖展开，不追求复杂的多段触发。\n\n适合作为开荒或资源有限时的过渡方案。先保证必备组件，再逐步替换高品质装备即可。"
  },
  {
    id: "double-warrior-wolf-hunter",
    name: "双战狼猎",
    role: "混合",
    difficulty: "高阶",
    version: "三测",
    lineup: "奶战辅 + 做装战辅 + 狼猎",
    summary: "双战辅维持治疗、护盾与减益，狼猎专注存活后完成输出启动。",
    accent: "#c55852",
    tags: ["召唤", "护盾覆盖", "团队联动"],
    cover: A + "wolf-hunter-skill.webp",
    skillImages: [A + "healer-support-skill.webp", A + "craft-support-skill.webp", A + "wolf-hunter-skill.webp"],
    gear: [A + "healer-support-ring.webp", A + "craft-support-weapon.webp", A + "wolf-hunter-weapon.webp", A + "wolf-hunter-head.webp", A + "wolf-hunter-necklace.webp"],
    mechanics: ["奶战辅通过仆从死亡触发治疗", "做装战辅维持战盾与增益覆盖", "狼猎优先解决站场，再利用战吼完成输出"],
    details: "狼猎不缺启动后的伤害，真正的难点是启动前如何站住。双战辅分别负责治疗循环与护盾覆盖，让猎人不必携带额外伤害光环。\n\n这套阵容的装备联动较多，成型后循环完整，但对技能选择与速度词条有明确要求。"
  },
  {
    id: "healer-warrior-support",
    name: "奶战辅",
    role: "辅助",
    difficulty: "进阶",
    version: "三测",
    lineup: "召唤触发型战士辅助",
    summary: "利用仆从死亡触发团队治疗，再通过净化联动完成回蓝循环。",
    accent: "#9d72c1",
    tags: ["团队治疗", "召唤物", "回蓝"],
    cover: A + "healer-support-skill.webp",
    skillImages: [A + "healer-support-skill.webp"],
    gear: [A + "healer-support-weapon.webp", A + "healer-support-head.webp", A + "healer-support-armor.webp", A + "healer-support-necklace.webp", A + "healer-support-ring.webp"],
    mechanics: ["破碎誓言：仆从死亡时触发元素攻击治疗", "血晶：把溢出治疗分配给队友", "清水羽织与风之优雅组成净化回蓝循环"],
    details: "技能中的弓手、亲卫只点 1 级，让仆从更容易死亡并触发治疗；帽子召唤物也可以加入这个循环。\n\n戒指必须使用神话品质。高智力同时服务回血与回魔，因此装备词条要围绕循环，而不是单独追求生命值。"
  },
  {
    id: "craft-warrior-support",
    name: "做装战辅",
    role: "辅助",
    difficulty: "进阶",
    version: "三测",
    lineup: "护盾增益型战士辅助",
    summary: "以多个旗子和战盾保持护盾全覆盖，同时加速全队战技循环。",
    accent: "#7b9c65",
    tags: ["战盾", "旗子", "增益速度"],
    cover: A + "craft-support-skill.webp",
    skillImages: [A + "craft-support-skill.webp"],
    gear: [A + "craft-support-weapon.webp", A + "craft-support-head.webp"],
    mechanics: ["无畏之锤放大力量与战盾数值", "海潮之刃让戒备打击转为护盾充能", "白热在护盾存在时提升战技速度"],
    details: "场上多个旗子与战盾让护盾接近全程覆盖，白热的战技速度增益也因此能稳定生效。\n\n词条优先级：战技/支援速度 > 增益时长 > 增益效果 > 护盾充能、力量与物理防御。"
  },
  {
    id: "debuff-warrior-support",
    name: "Debuff 战辅",
    role: "辅助",
    difficulty: "高阶",
    version: "三测",
    lineup: "减攻减速型战士辅助",
    summary: "压低敌方攻击与攻速，同时承担治疗；低生命反而能放大团队治疗效率。",
    accent: "#c17868",
    tags: ["减攻", "减速", "治疗"],
    cover: A + "debuff-support-skill.webp",
    skillImages: [A + "debuff-support-skill.webp", A + "debuff-support-note.webp"],
    gear: [A + "debuff-support-weapon.webp", A + "debuff-support-head.webp"],
    mechanics: ["优先堆战技速度，其次是增益与削弱时间", "避免额外生命词条，用较低生命放大治疗", "不要点多余钩子与威吓，避免拖慢关键技能"],
    details: "主要作用是降低敌方攻击与攻速，其次才是治疗。恶毒之触的治疗与元素攻击挂钩，因此武器词条应优先服务元素攻击。\n\n辅助技能过多会挤占支援技能的释放，导致战盾无法及时覆盖；技能加点需要保持克制。"
  }
];

const state = {
  search: "",
  role: "全部",
  difficulty: "全部",
  customBuilds: loadCustomBuilds()
};

const els = {
  grid: document.querySelector("#build-grid"),
  search: document.querySelector("#search-input"),
  difficulty: document.querySelector("#difficulty-filter"),
  roleButtons: [...document.querySelectorAll(".filter-button")],
  resultsCount: document.querySelector("#results-count"),
  empty: document.querySelector("#empty-state"),
  buildCount: document.querySelector("#build-count"),
  detailDialog: document.querySelector("#detail-dialog"),
  detailContent: document.querySelector("#detail-content"),
  submitDialog: document.querySelector("#submit-dialog"),
  submitForm: document.querySelector("#submit-form"),
  toast: document.querySelector("#toast"),
  nav: document.querySelector(".desktop-nav"),
  menuButton: document.querySelector(".menu-button")
};

function loadCustomBuilds() {
  try { return JSON.parse(localStorage.getItem("fzbd-custom-builds")) || []; }
  catch { return []; }
}

function saveCustomBuilds() {
  localStorage.setItem("fzbd-custom-builds", JSON.stringify(state.customBuilds));
}

function allBuilds() { return [...baseBuilds, ...state.customBuilds]; }

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" }[char]));
}

function renderBuilds() {
  const term = state.search.trim().toLowerCase();
  const filtered = allBuilds().filter(build => {
    const haystack = [build.name, build.lineup, build.summary, ...(build.tags || []), ...(build.mechanics || []), ...(build.gearNames || [])].join(" ").toLowerCase();
    return (!term || haystack.includes(term)) &&
      (state.role === "全部" || build.role === state.role) &&
      (state.difficulty === "全部" || build.difficulty === state.difficulty);
  });

  els.grid.innerHTML = filtered.map((build, index) => cardTemplate(build, index)).join("");
  els.resultsCount.textContent = `显示 ${filtered.length} 套构筑`;
  els.buildCount.textContent = allBuilds().length;
  els.empty.hidden = filtered.length !== 0;
  els.grid.hidden = filtered.length === 0;
}

function cardTemplate(build, index) {
  const tags = (build.tags || []).slice(0, 3).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("");
  const media = build.cover
    ? `<img src="${escapeHTML(build.cover)}" alt="${escapeHTML(build.name)}技能参考" loading="lazy" />`
    : `<div class="custom-cover" aria-hidden="true">${escapeHTML(build.name.slice(0, 1))}</div>`;
  return `
    <article class="build-card" style="--accent:${build.accent || "#cda45b"}; animation-delay:${Math.min(index * 55, 330)}ms">
      <div class="card-media">${media}</div>
      <div class="card-body">
        <div class="card-topline"><span class="card-index">BD ${String(index + 1).padStart(2, "0")}</span><span>${escapeHTML(build.version || "玩家登记")}</span></div>
        <h3>${escapeHTML(build.name)}</h3>
        <div class="card-lineup">${escapeHTML(build.lineup)}</div>
        <p class="card-summary">${escapeHTML(build.summary)}</p>
        <div class="card-tags">${tags}</div>
        <div class="card-actions">
          <button class="view-build" type="button" data-build-id="${escapeHTML(build.id)}">查看完整构筑</button>
          ${build.custom ? `<button class="delete-build" type="button" data-delete-id="${escapeHTML(build.id)}">删除登记</button>` : ""}
        </div>
      </div>
    </article>`;
}

function openBuild(id) {
  const build = allBuilds().find(item => item.id === id);
  if (!build) return;

  if (build.custom) {
    els.detailContent.innerHTML = `
      <article class="custom-detail">
        <div class="detail-kicker">玩家登记 · ${escapeHTML(build.version || "未标注版本")}</div>
        <h2>${escapeHTML(build.name)}</h2>
        <p class="detail-lineup">${escapeHTML(build.lineup)} · ${escapeHTML(build.role)} · ${escapeHTML(build.difficulty)}</p>
        <div class="detail-content-grid" style="padding-inline:0">
          <section class="detail-section"><h3>构筑思路</h3><p>${escapeHTML(build.details)}</p></section>
          <section class="detail-section"><h3>核心装备</h3><ul class="mechanic-list">${(build.gearNames?.length ? build.gearNames : ["暂未填写"]).map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul><p>登记人：${escapeHTML(build.author || "匿名玩家")}</p></section>
        </div>
      </article>`;
  } else {
    const skillImages = build.skillImages.map((src, index) => `<img src="${src}" alt="${escapeHTML(build.name)}技能参考 ${index + 1}" />`).join("");
    const gear = build.gear.map((src, index) => `<figure><img src="${src}" alt="${escapeHTML(build.name)}装备参考 ${index + 1}" loading="lazy" /></figure>`).join("");
    els.detailContent.innerHTML = `
      <article>
        <header class="detail-hero">
          <div class="detail-copy">
            <div class="detail-kicker">${escapeHTML(build.version)} · ${escapeHTML(build.role)} · ${escapeHTML(build.difficulty)}</div>
            <h2>${escapeHTML(build.name)}</h2>
            <div class="detail-lineup">${escapeHTML(build.lineup)}</div>
            <p>${escapeHTML(build.summary)}</p>
          </div>
          <div class="detail-cover">${skillImages}</div>
        </header>
        <div class="detail-content-grid">
          <div>
            <section class="detail-section"><h3>关键机制</h3><ul class="mechanic-list">${build.mechanics.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul></section>
            <section class="detail-section"><h3>构筑说明</h3><p>${escapeHTML(build.details)}</p></section>
          </div>
          <section class="detail-section"><h3>装备参考</h3><div class="gear-gallery">${gear}</div></section>
        </div>
      </article>`;
  }
  els.detailDialog.showModal();
  history.replaceState(null, "", `#build=${encodeURIComponent(id)}`);
}

function closeDialog(dialog) {
  dialog.close();
  if (location.hash.startsWith("#build=")) history.replaceState(null, "", location.pathname + location.search);
}

function openSubmitDialog() {
  els.submitDialog.showModal();
  setTimeout(() => els.submitForm.elements.name.focus(), 80);
}

function submitBuild(event) {
  event.preventDefault();
  const data = new FormData(els.submitForm);
  const name = data.get("name").trim();
  const lineup = data.get("lineup").trim();
  const summary = data.get("summary").trim();
  const role = data.get("role");
  const details = data.get("details").trim();
  const gearNames = data.get("gear").split(/[、,，]/).map(item => item.trim()).filter(Boolean);
  const customBuild = {
    id: `custom-${Date.now()}`,
    custom: true,
    name,
    author: data.get("author").trim(),
    role,
    difficulty: data.get("difficulty"),
    version: data.get("version").trim() || "玩家登记",
    lineup,
    summary,
    details,
    gearNames,
    tags: [role, "玩家登记", ...(gearNames.slice(0, 1))],
    accent: { 输出: "#44b6ae", 坦克: "#d78947", 辅助: "#9d72c1", 混合: "#c55852" }[role]
  };
  state.customBuilds.unshift(customBuild);
  saveCustomBuilds();
  els.submitForm.reset();
  closeDialog(els.submitDialog);
  resetFilters();
  showToast(`“${name}”已保存到本地构筑图鉴`);
  document.querySelector("#builds").scrollIntoView({ behavior: "smooth" });
}

function deleteBuild(id) {
  const build = state.customBuilds.find(item => item.id === id);
  if (!build || !window.confirm(`确定删除“${build.name}”的本地登记吗？`)) return;
  state.customBuilds = state.customBuilds.filter(item => item.id !== id);
  saveCustomBuilds();
  renderBuilds();
  showToast("本地登记已删除");
}

let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  toastTimer = setTimeout(() => els.toast.classList.remove("visible"), 2800);
}

function resetFilters() {
  state.search = "";
  state.role = "全部";
  state.difficulty = "全部";
  els.search.value = "";
  els.difficulty.value = "全部";
  els.roleButtons.forEach(button => button.classList.toggle("active", button.dataset.filter === "全部"));
  renderBuilds();
}

els.search.addEventListener("input", event => { state.search = event.target.value; renderBuilds(); });
els.difficulty.addEventListener("change", event => { state.difficulty = event.target.value; renderBuilds(); });
els.roleButtons.forEach(button => button.addEventListener("click", () => {
  state.role = button.dataset.filter;
  els.roleButtons.forEach(item => item.classList.toggle("active", item === button));
  renderBuilds();
}));
document.querySelector("#clear-filters").addEventListener("click", resetFilters);

document.addEventListener("click", event => {
  const viewButton = event.target.closest("[data-build-id]");
  const deleteButton = event.target.closest("[data-delete-id]");
  const openSubmit = event.target.closest(".open-submit");
  const closeButton = event.target.closest("[data-close-dialog]");
  if (viewButton) openBuild(viewButton.dataset.buildId);
  if (deleteButton) deleteBuild(deleteButton.dataset.deleteId);
  if (openSubmit) openSubmitDialog();
  if (closeButton) closeDialog(closeButton.closest("dialog"));
});

document.querySelector(".cancel-submit").addEventListener("click", () => closeDialog(els.submitDialog));
els.submitForm.addEventListener("submit", submitBuild);

[els.detailDialog, els.submitDialog].forEach(dialog => {
  dialog.addEventListener("close", () => {
    if (location.hash.startsWith("#build=")) history.replaceState(null, "", location.pathname + location.search);
  });
  dialog.addEventListener("click", event => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) closeDialog(dialog);
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
    event.preventDefault();
    els.search.focus();
  }
});

els.menuButton.addEventListener("click", () => {
  const open = els.nav.classList.toggle("open");
  els.menuButton.setAttribute("aria-expanded", String(open));
});
els.nav.addEventListener("click", event => {
  if (event.target.matches("a, button")) {
    els.nav.classList.remove("open");
    els.menuButton.setAttribute("aria-expanded", "false");
  }
});

renderBuilds();
const requestedId = new URLSearchParams(location.hash.replace(/^#/, "")).get("build");
if (requestedId) setTimeout(() => openBuild(requestedId), 0);
