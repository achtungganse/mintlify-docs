/* Uzbek → Kazakh replacements for eBanano docs.
 * Add new entries to the DICT object. Longer phrases first to avoid partial matches. */
(function () {
  const DICT = {
    // Пагинация
    "Keyingi": "Келесі",
    "Oldingi": "Алдыңғы",

    // Оглавление
    "Ushbu sahifada": "Осы бетте",

    // Поиск (uz-версия Mintlify + глобальный search.prompt)
    "Savol bering...": "Сұрақ қойыңыз...",
    "Savol bering": "Сұрақ қойыңыз",
    "Чем помочь?": "Іздеу",
    "Чем помочь": "Іздеу",

    // Фидбек
    "Ushbu sahifa foydali bo'ldimi?": "Бұл бет пайдалы болды ма?",
    "Ha": "Иә",
    "Yo'q": "Жоқ",

    // Дата последнего изменения
    "Oxirgi o'zgartirish": "Соңғы өзгеріс",
    "2026 M": "2026 ",

    // Переключатель языка
    "O'zbekcha": "Қазақша",
  };

  // Сортируем ключи по длине (длинные раньше, чтобы не поймать префикс)
  const KEYS = Object.keys(DICT).sort((a, b) => b.length - a.length);
  const RE = new RegExp(
    KEYS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
    "g"
  );

  function replaceText(value) {
    RE.lastIndex = 0;
    return value.replace(RE, (m) => DICT[m]);
  }

  function translate(root) {
    if (document.documentElement.lang !== "uz") return;
    if (!root || root.nodeType !== 1) return;

    // 1) Текстовые узлы
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    for (const node of nodes) {
      RE.lastIndex = 0;
      if (RE.test(node.nodeValue)) {
        node.nodeValue = replaceText(node.nodeValue);
      }
    }

    // 2) placeholder на input/textarea (включая сам root, если это input)
    const inputs = [];
    if (root.matches && root.matches("input[placeholder], textarea[placeholder]")) {
      inputs.push(root);
    }
    root.querySelectorAll &&
      root
        .querySelectorAll("input[placeholder], textarea[placeholder]")
        .forEach((el) => inputs.push(el));
    inputs.forEach((el) => {
      const v = el.getAttribute("placeholder");
      RE.lastIndex = 0;
      if (v && RE.test(v)) el.setAttribute("placeholder", replaceText(v));
    });

    // 3) aria-label / title
    const withAttrs = [];
    if (root.matches && root.matches("[aria-label], [title]")) withAttrs.push(root);
    root.querySelectorAll &&
      root.querySelectorAll("[aria-label], [title]").forEach((el) => withAttrs.push(el));
    withAttrs.forEach((el) => {
      ["aria-label", "title"].forEach((attr) => {
        const v = el.getAttribute(attr);
        RE.lastIndex = 0;
        if (v && RE.test(v)) el.setAttribute(attr, replaceText(v));
      });
    });
  }

  function init() {
    translate(document.body);

    // Наблюдаем и за добавлением узлов, и за изменением ключевых атрибутов
    new MutationObserver((muts) => {
      if (document.documentElement.lang !== "uz") return;
      for (const m of muts) {
        if (m.type === "attributes" && m.target.nodeType === 1) {
          translate(m.target);
        }
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 1) translate(node);
          else if (node.nodeType === 3) {
            RE.lastIndex = 0;
            if (RE.test(node.nodeValue)) {
              node.nodeValue = replaceText(node.nodeValue);
            }
          }
        });
      }
    }).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "title"],
    });

    // Страховка: Mintlify гидратируется в несколько тактов и может
    // перезаписать placeholder после первого прогона.
    let ticks = 0;
    const interval = setInterval(() => {
      translate(document.body);
      if (++ticks >= 20) clearInterval(interval); // 20 × 500мс = 10 сек
    }, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
