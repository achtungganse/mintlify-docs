/* Uzbek → Kazakh replacements for eBanano docs.
 * Add new entries to the DICT object. Longer phrases first to avoid partial matches. */
(function () {
  const DICT = {
    // Пагинация
    "Keyingi": "Келесі",
    "Oldingi": "Алдыңғы",

    // Оглавление
    "Ushbu sahifada": "Осы бетте",

    // Поиск
    "Savol bering...": "Сұрақ қойыңыз...",
    "Savol bering": "Сұрақ қойыңыз",

    // Фидбек
    "Ushbu sahifa foydali bo'ldimi?": "Бұл бет пайдалы болды ма?",
    "Ha": "Иә",
    "Yo'q": "Жоқ",

    // Дата
    "Oxirgi o'zgartirish": "Соңғы өзгеріс",

    // Переключатель языка
    "O'zbekcha": "Қазақша",
    "Чем помочь": "Поиск",
  };

  // Сортируем ключи по длине (сначала длинные, чтобы "Savol bering..." совпало раньше "Savol bering")
  const KEYS = Object.keys(DICT).sort((a, b) => b.length - a.length);
  const RE = new RegExp(KEYS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");

  function translate(root) {
    if (document.documentElement.lang !== "uz") return;

    // 1) Текстовые узлы
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    for (const node of nodes) {
      if (RE.test(node.nodeValue)) {
        RE.lastIndex = 0;
        node.nodeValue = node.nodeValue.replace(RE, (m) => DICT[m]);
      }
      RE.lastIndex = 0;
    }

    // 2) Placeholder'ы в input/textarea
    root.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((el) => {
      const v = el.getAttribute("placeholder");
      if (RE.test(v)) {
        RE.lastIndex = 0;
        el.setAttribute("placeholder", v.replace(RE, (m) => DICT[m]));
      }
      RE.lastIndex = 0;
    });

    // 3) aria-label / title
    root.querySelectorAll("[aria-label], [title]").forEach((el) => {
      ["aria-label", "title"].forEach((attr) => {
        const v = el.getAttribute(attr);
        if (v && RE.test(v)) {
          RE.lastIndex = 0;
          el.setAttribute(attr, v.replace(RE, (m) => DICT[m]));
        }
        RE.lastIndex = 0;
      });
    });
  }

  function init() {
    translate(document.body);
    new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 1) translate(node);
          else if (node.nodeType === 3 && document.documentElement.lang === "uz") {
            if (RE.test(node.nodeValue)) {
              RE.lastIndex = 0;
              node.nodeValue = node.nodeValue.replace(RE, (m) => DICT[m]);
            }
            RE.lastIndex = 0;
          }
        });
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
