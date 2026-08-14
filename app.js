const B = "assets/bd-v2/";
const gearSlots = [
  ["weapon1", "武器一"],
  ["weapon2", "武器二"],
  ["necklace", "项链"],
  ["ring", "戒指"],
  ["head", "头"],
  ["armor", "衣服"],
  ["gloves", "护手"],
  ["shoes", "鞋子"]
];

function character(name, key, options = {}) {
  const equipment = Object.fromEntries(gearSlots.map(([slot]) => [slot, B + `${key}-${slot.replace("weapon1", "weapon-1").replace("weapon2", "weapon-2")}.webp`]));
  return {
    name,
    skill: B + `${key}-skill.webp`,
    equipment,
    ...options
  };
}

const baseBuilds = [
  {
    id: "electric-mage",
    name: "电法",
    role: "输出",
    difficulty: "进阶",
    version: "三测",
    lineup: "电法单角色",
    summary: "围绕元素法术与稳定技能循环构建的电系输出方案。",
    accent: "#44b6ae",
    tags: ["元素输出", "电法", "单角色"],
    cover: B + "electric-mage-skill.webp",
    mechanics: ["按技能图完成核心加点", "双武器与八个装备位均来自新版 BD 表", "优先保持输出循环稳定"],
    details: "新版表格提供了电法的完整技能与八个装备槽位参考，可直接按角色卡逐项核对。",
    characters: [character("电法", "electric-mage")]
  },
  {
    id: "warrior-tank",
    name: "战士T",
    role: "坦克",
    difficulty: "进阶",
    version: "三测",
    lineup: "战士坦克单角色",
    summary: "以前排承伤和稳定站场为核心的战士坦克配置。",
    accent: "#d78947",
    tags: ["承伤", "前排", "单角色"],
    cover: B + "warrior-tank-skill.webp",
    mechanics: ["技能加点服务承伤与控制", "装备槽位完整对应新版表格", "通过防御属性稳定前排空间"],
    details: "新版表格提供了战士T的完整技能与八个装备槽位，适合作为队伍前排的直接配置参考。",
    characters: [character("战士T", "warrior-tank")]
  },
  {
    id: "priest",
    name: "神官",
    role: "辅助",
    difficulty: "进阶",
    version: "三测",
    lineup: "神官单角色",
    summary: "补足治疗、增益与队伍容错的神官辅助方案。",
    accent: "#d6aa4f",
    tags: ["治疗", "增益", "单角色"],
    cover: B + "priest-skill.webp",
    mechanics: ["技能加点围绕治疗与增益", "装备覆盖全部八个固定槽位", "为队伍提供持续续航"],
    details: "新版表格提供了神官完整技能与装备配置，可单独查看并用于阵容组合。",
    characters: [character("神官", "priest")]
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
    cover: B + "high-mana-skill.webp",
    mechanics: ["用高魔力放大闪电冲击收益", "优先保证资源循环，再追求爆发词条", "装备成型前容错相对有限"],
    details: "构筑重点不是单纯堆高伤害，而是让魔力储备、回复速度与闪电冲击的释放节奏保持稳定。\n\n这是一套上限较高的输出分支，适合已经拥有核心装备、愿意继续打磨词条的玩家。",
    characters: [character("高蓝闪电冲击", "high-mana")]
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
    cover: B + "shield-bow-skill.webp",
    mechanics: ["保持护盾覆盖，降低被突发伤害击穿的概率", "远程站位让输出环境更稳定", "优先满足必备配置，再补充生存词条"],
    details: "盾弓的价值在于简单、稳定。技能与装备围绕护盾覆盖展开，不追求复杂的多段触发。\n\n表格额外标注了必备参考图，详情页会与技能加点并列展示。",
    characters: [character("盾弓", "shield-bow", {
      skillNotes: [{ label: "必备", image: B + "shield-bow-required.webp" }]
    })]
  },
  {
    id: "double-warrior-wolf-hunter",
    name: "双战狼猎",
    role: "混合",
    difficulty: "高阶",
    version: "三测",
    lineup: "奶战辅 + 做装战辅 + 猎人",
    summary: "双战辅维持治疗、护盾与增益，猎人专注存活后完成输出启动。",
    accent: "#c55852",
    tags: ["召唤", "护盾覆盖", "团队联动"],
    cover: B + "wolf-hunter-skill.webp",
    mechanics: ["奶战辅通过仆从死亡触发治疗", "做装战辅维持战盾与增益覆盖", "猎人优先解决站场，再利用战吼完成输出"],
    details: "三名角色各自拥有独立的技能加点、八个装备槽位和角色说明。按照角色卡逐一完成配置后，可形成治疗、护盾与输出的完整队伍闭环。",
    characters: [
      character("奶战辅", "wolf-healer", {
        details: "构建思路（由股东2群的 Ghove 提供）\n\n破碎誓言神话戒指：仆从死亡时获得基于元素攻击的治疗；血晶项链把溢出治疗分给队友；虚空之手有概率额外召唤仆从。弓手、亲卫点 1 级便于阵亡触发治疗，帽子的炎魔也可加入循环。\n\n清水羽织配合风之优雅、武器净化和猎人的遁入阴影触发回蓝。沉沦通过降低其他属性换取智力，戒指与衣服的回血回魔都依赖高智力。",
        slotNotes: {
          weapon1: "武器｜无畏之锤不点钩子，基础学压制打击",
          weapon2: "必要武器",
          ring: "戒指（必须神话）",
          head: "帽子｜旗子或炎魔，更推荐旗子"
        },
        extraEquipment: [{ label: "头部备选", image: B + "wolf-healer-head-alt.webp" }]
      }),
      character("做装战辅", "wolf-crafter", {
        details: "鞋子提供高额回蓝，帽子、衣服和护手提供旗子、遁入阴影与辉煌光环。\n\n无畏之锤让荣誉守护提升力量，进一步放大物理系加成和护盾数值；海潮之刃让戒备打击转为可叠加的护盾充能。白热戒指在护盾存在时提升战技速度。\n\n词条优先级：战技/支援速度 > 增益时长 > 增益效果 > 护盾充能、力量、物理防御。",
        slotNotes: { weapon1: "武器", weapon2: "武器", head: "帽子" }
      }),
      character("猎人", "wolf-hunter", {
        details: "狼猎除了帽子与两件套，其他槽位可以按已有装备灵活搭配。戒指可自行做装，选择火焰光环、专注光环；想提高生存也可以使用萨满之石。\n\n鞋子更推荐旗子，使场上保持三个旗子并提高护盾覆盖。战吼机制让猎人不缺启动后的伤害，重点是保证启动前站住，因此不必额外携带强击光环或杀戮光环。",
        slotNotes: { weapon1: "武器（最好有）", weapon2: "武器（最好有）", head: "帽子（必备）" }
      })
    ]
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
    cover: B + "debuff-support-skill.webp",
    mechanics: ["最主要作用是降低敌方攻击与攻速，其次才是治疗", "优先堆战技速度，其次是增益与削弱时间", "避免额外生命词条，用较低生命放大治疗"],
    details: "优先找速度词条，战技速度 > 所有技能速度 = 法术速度 > 其他速度；其次找增益时间、削弱时间，再其次是元素攻击、所有攻击、生命治疗。最好不要任何生命词条，战辅的生命越低越好。\n\n恶毒之触的治疗与元素攻击挂钩，因此武器暗流与神圣之力更合适。战辅承伤主要依赖不屈，不依赖常规抗性防御。\n\n技能加点不要选择其他钩子与威吓，避免较长前后摇降低尖刺陷阱、雷霆打击与战盾的释放频率。",
    characters: [character("Debuff战辅", "debuff-support", {
      subtitle: "最主要作用是减攻击、减攻速，其次是治疗",
      skillNotes: [{ label: "属性参考", image: B + "debuff-support-stats.webp" }],
      slotNotes: { weapon1: "武器（最好有）", weapon2: "武器（最好有）", head: "帽子" }
    })]
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

function imageButton(src, alt, className = "") {
  return `<button class="image-zoom ${className}" type="button" data-image-src="${escapeHTML(src)}" data-image-alt="${escapeHTML(alt)}"><img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" loading="lazy" /></button>`;
}

function characterTemplate(characterData, index) {
  const skillNotes = (characterData.skillNotes || []).map(note => `
    <figure class="skill-note">
      ${imageButton(note.image, `${characterData.name}${note.label}`)}
      <figcaption>${escapeHTML(note.label)}</figcaption>
    </figure>`).join("");

  const equipment = gearSlots.map(([slot, defaultLabel]) => {
    const label = characterData.slotNotes?.[slot] || defaultLabel;
    const src = characterData.equipment?.[slot];
    return `<figure class="equipment-card">
      <figcaption><span>${escapeHTML(label)}</span></figcaption>
      ${src ? imageButton(src, `${characterData.name}${label}`) : `<div class="equipment-empty">暂无指定</div>`}
    </figure>`;
  }).join("");

  const extraEquipment = (characterData.extraEquipment || []).map(item => `<figure class="equipment-card equipment-card-extra">
    <figcaption><span>${escapeHTML(item.label)}</span></figcaption>
    ${imageButton(item.image, `${characterData.name}${item.label}`)}
  </figure>`).join("");

  return `<section class="character-build" style="--character-index:'${String(index + 1).padStart(2, "0")}'">
    <header class="character-header">
      <div><span>ROLE ${String(index + 1).padStart(2, "0")}</span><h3>${escapeHTML(characterData.name)}</h3></div>
      ${characterData.subtitle ? `<p>${escapeHTML(characterData.subtitle)}</p>` : ""}
    </header>
    <div class="character-skill-layout">
      <div class="skill-primary"><div class="slot-eyebrow">技能加点</div>${imageButton(characterData.skill, `${characterData.name}技能加点`, "skill-image")}</div>
      ${skillNotes ? `<div class="skill-notes">${skillNotes}</div>` : ""}
    </div>
    <div class="equipment-heading"><span>装备配置</span><small>武器与六个防具 / 饰品槽位</small></div>
    <div class="equipment-grid">${equipment}${extraEquipment}</div>
    ${characterData.details ? `<div class="character-notes"><span>角色说明</span><p>${escapeHTML(characterData.details)}</p></div>` : ""}
  </section>`;
}

function openImageViewer(src, alt) {
  let viewer = document.querySelector("#image-viewer");
  if (!viewer) {
    viewer = document.createElement("dialog");
    viewer.id = "image-viewer";
    viewer.className = "image-viewer";
    viewer.innerHTML = `<button type="button" data-close-image aria-label="关闭大图">关闭 ×</button><img alt="" />`;
    viewer.addEventListener("click", event => { if (event.target === viewer) viewer.close(); });
    document.body.append(viewer);
  }
  const image = viewer.querySelector("img");
  image.src = src;
  image.alt = alt;
  viewer.showModal();
}

function openBuild(id) {
  const buildId = id === "battle-mage-priest" ? "electric-mage" : id;
  const build = allBuilds().find(item => item.id === buildId);
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
    els.detailContent.innerHTML = `
      <article class="build-detail" style="--accent:${escapeHTML(build.accent || "#cda45b")}">
        <header class="detail-hero detail-hero-compact">
          <div class="detail-copy">
            <div class="detail-kicker">${escapeHTML(build.version)} · ${escapeHTML(build.role)} · ${escapeHTML(build.difficulty)}</div>
            <h2>${escapeHTML(build.name)}</h2>
            <div class="detail-lineup">${escapeHTML(build.lineup)}</div>
            <p>${escapeHTML(build.summary)}</p>
          </div>
          <div class="detail-overview">
            <span>${String(build.characters.length).padStart(2, "0")}</span>
            <strong>${build.characters.length > 1 ? "角色协同" : "角色配置"}</strong>
            <small>技能 + 8 个装备位</small>
          </div>
        </header>
        <div class="build-detail-body">
          <section class="build-intro">
            <div><span class="slot-eyebrow">关键机制</span><ul class="mechanic-list">${build.mechanics.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul></div>
            <div><span class="slot-eyebrow">BD 介绍</span><p>${escapeHTML(build.details)}</p></div>
          </section>
          <div class="character-list">${build.characters.map(characterTemplate).join("")}</div>
        </div>
      </article>`;
  }
  els.detailDialog.showModal();
  history.replaceState(null, "", `#build=${encodeURIComponent(buildId)}`);
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
  const imageButton = event.target.closest("[data-image-src]");
  const closeImage = event.target.closest("[data-close-image]");
  if (viewButton) openBuild(viewButton.dataset.buildId);
  if (deleteButton) deleteBuild(deleteButton.dataset.deleteId);
  if (openSubmit) openSubmitDialog();
  if (closeButton) closeDialog(closeButton.closest("dialog"));
  if (imageButton) openImageViewer(imageButton.dataset.imageSrc, imageButton.dataset.imageAlt || "BD 图片参考");
  if (closeImage) closeImage.closest("dialog").close();
});

document.querySelector(".cancel-submit").addEventListener("click", () => closeDialog(els.submitDialog));
els.submitForm.addEventListener("submit", submitBuild);

[els.detailDialog, els.submitDialog].forEach(dialog => {
  dialog.addEventListener("close", () => {
    if (location.hash.startsWith("#build=")) history.replaceState(null, "", location.pathname + location.search);
  });
  dialog.addEventListener("click", event => {
    if (event.target === dialog) closeDialog(dialog);
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
