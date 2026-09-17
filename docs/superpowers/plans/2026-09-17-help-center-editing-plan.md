# Help Center eBanano Editing Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Перестроить и отредактировать Help Center eBanano по утверждённой информационной архитектуре, начиная с русской версии и затем синхронизируя английскую и казахскую локали.

**Architecture:** Работа идёт от пользовательского пути к периферийным сценариям: сначала «Начало работы», установка и подключение, затем покупки, аккаунт и troubleshooting. Дубли объединяются в канонические страницы, а неподтверждённые функции исключаются из публичной навигации до подтверждения. Bananos и реферальная программа не изменяются.

**Tech Stack:** MDX, Mintlify components, `docs.json`, Git, shell-проверки ссылок и структуры файлов.

**Spec:** `docs/superpowers/specs/2026-09-17-help-center-ia-design.md`

## Global Constraints

- Каждая страница должна отвечать на один самостоятельный пользовательский вопрос.
- Для каждой статьи применяется полный редакторский чек-лист из 24 пунктов из спецификации.
- Основной тон русской версии — дружелюбное обращение на «ты», короткие предложения и конкретные действия.
- `Steps` используются для последовательных действий, `Tabs` — для платформ, `Accordion` — только для вторичного материала, `Frame` — для нужных скриншотов.
- `Columns` предпочтительнее устаревшего `CardGroup`; карточки не используются для длинного текста.
- Все продуктовые факты о тарифах, активации, роуминге, APN, оплате и функциях проверяются до публикации.
- Внутренние ссылки должны совпадать с существующими MDX-slug.
- RU, EN и KK должны иметь одинаковую логику навигации; казахская локаль хранится в техническом пути `/uz/`.
- Bananos и реферальная программа остаются без изменений.

---

### Task 1: Обновить навигацию и карту страниц русской версии

**Files:**
- Modify: `docs.json`
- Modify: `getting-started/when-plan-starts.mdx`
- Delete after content migration: `getting-started/when-to-buy.mdx`
- Delete after content migration: `installation/activation.mdx`
- Modify: `installation/overview.mdx`

**Interfaces:**
- Consumes: утверждённая навигация из спецификации.
- Produces: русская навигация без страниц-дублей и устаревших slug.

- [ ] **Step 1: Выписать текущие страницы и ссылки первого пользовательского пути**

  Run:

  ```bash
  rg -n 'getting-started|installation' docs.json
  rg -n 'href="/[^"]+"' getting-started/*.mdx installation/*.mdx
  ```

  Expected: зафиксированы все текущие пути, включая ссылки на `first-purchase`, `when-to-install`, `mobile-data`, `same-device` и `apn`.

- [ ] **Step 2: Перенести полезные объяснения в каноническую статью о начале действия тарифа**

  В `getting-started/when-plan-starts.mdx` оставить один сценарий: покупка, установка и активация — разные события; момент начала срока зависит от конкретного тарифа. Добавить в эту же страницу короткий ответ о том, когда покупать и можно ли установить заранее.

- [ ] **Step 3: Удалить дублирующие страницы из русской навигации**

  Убрать `getting-started/when-to-buy` и `installation/activation` из `docs.json` и удалить их после переноса содержания. Не создавать редиректы на несуществующие страницы; все переходы направить на `getting-started/when-plan-starts`.

- [ ] **Step 4: Обновить входную страницу установки**

  В `installation/overview.mdx` оставить подготовку телефона, интернета, QR-кода и данных ручной установки. Ссылку на условия активации направить на `/getting-started/when-plan-starts`, ссылки на устройства оставить на существующие страницы.

- [ ] **Step 5: Проверить навигацию и формат MDX**

  Run:

  ```bash
  git diff --check
  ```

  Expected: команда завершается с кодом 0; в русской группе нет удалённых страниц.

### Task 2: Переписать статьи установки и перенести пост-установочные действия

**Files:**
- Modify: `docs.json`
- Modify: `installation/ios.mdx`
- Modify: `installation/android.mdx`
- Modify: `installation/qr-on-same-phone.mdx`
- Modify: `installation/manual.mdx`
- Modify: `installation/data-roaming.mdx`
- Delete after migration: `installation/select-for-data.mdx`
- Delete after migration: `installation/apn-setup.mdx`

**Interfaces:**
- Consumes: каноническая статья о начале действия тарифа из Task 1.
- Produces: раздел «Установка» только с пятью страницами; отдельная статья роуминга в «Использование eSIM».

- [ ] **Step 1: Исправить существующие slug-ссылки в установочных статьях**

  Заменить `/installation/mobile-data` на канонический путь страницы переключения SIM после её создания, `/installation/same-device` на `/installation/qr-on-same-phone`, `/troubleshooting/esim-installation` на `/troubleshooting/install-failed`, а `/installation/apn` на статью о проблемах с интернетом.

- [ ] **Step 2: Проверить структуру iPhone, Android, QR и ручной установки**

  Для каждой страницы оставить прямое вступление, платформенные `Tabs`, последовательные `Steps`, предупреждения до потенциальной ошибки и естественный следующий шаг. Не дублировать внутри этих страниц полное объяснение активации, выбора SIM и APN.

- [ ] **Step 3: Перенести статью о роуминге в группу использования**

  Переместить `installation/data-roaming` в навигацию `using-esim`. Сохранить отдельную страницу, потому что включение роуминга — самостоятельный поисковый запрос, но связать её с общей инструкцией подключения после приезда.

- [ ] **Step 4: Удалить заглушки выбора данных и APN из установки**

  Удалить `installation/select-for-data.mdx` после переноса её пользовательской задачи в каноническую статью переключения SIM. Удалить `installation/apn-setup.mdx`; инструкции APN должны находиться в troubleshooting-статье «Нет интернета».

- [ ] **Step 5: Проверить итоговую группу установки**

  Run:

  ```bash
  rg -n -A12 '"group": "Установка"' docs.json
  git diff --check
  ```

  Expected: в группе остались `overview`, `ios`, `android`, `qr-on-same-phone`, `manual`; битых ссылок на удалённые установочные slug нет.

### Task 3: Собрать раздел «Использование eSIM» вокруг реальных сценариев

**Files:**
- Modify: `docs.json`
- Modify: `using-esim/connect-after-arrival.mdx`
- Modify: `using-esim/switching-networks.mdx`
- Modify: `using-esim/managing-data.mdx`
- Modify: `using-esim/multiple-esims.mdx`
- Move: `installation/data-roaming.mdx` → `using-esim/data-roaming.mdx`
- Delete after migration: `using-esim/use-with-primary-sim.mdx`
- Delete after migration: `using-esim/after-trip.mdx`

**Interfaces:**
- Consumes: установочные статьи из Task 2 и фактические условия первого запуска.
- Produces: пять канонических статей использования без пустых страниц и повторов выбора SIM.

- [ ] **Step 1: Наполнить статью подключения после приезда**

  Сценарий должен идти в порядке: включить нужную линию, выбрать её для мобильных данных, включить роуминг при необходимости, дождаться регистрации в сети, проверить интернет. Ссылки на детальную настройку роуминга и troubleshooting должны вести на существующие страницы.

- [ ] **Step 2: Объединить выбор SIM, основную SIM и возврат домой**

  В `using-esim/switching-networks.mdx` оставить одну задачу: выбрать eBanano для данных, сохранить домашнюю SIM для звонков и вернуть домашнюю SIM после поездки. Переписать устаревший текст на обращение «ты» и убрать неподтверждённые универсальные обещания.

- [ ] **Step 3: Проверить статью остатка данных и срок действия**

  Оставить только подтверждённые способы проверки в приложении, аккаунте и настройках телефона. Не утверждать наличие экранов, кнопок и обновления баланса в реальном времени без подтверждения реализации.

- [ ] **Step 4: Проверить статью нескольких eSIM**

  Убрать неподтверждённые числовые ограничения моделей и оставить устойчивые инструкции включения, отключения и выбора профиля. Сценарий возврата после поездки не дублировать отдельной страницей.

- [ ] **Step 5: Убрать неподтверждённые функции из публичной навигации**

  `top-up`, `hotspot`, `calls-and-sms` и `one-esim-many-countries` не добавлять в новую публичную группу до подтверждения продуктовой реализации. Их файлы не переписывать в рамках этого блока.

### Task 4: Сократить и переписать «Покупки и возвраты» и «Аккаунт»

**Files:**
- Modify: `docs.json`
- Modify: `purchases/payment-methods.mdx`
- Modify: `purchases/currency.mdx`
- Modify: `purchases/promo-codes.mdx`
- Modify: `purchases/order-history.mdx`
- Modify: `purchases/payment-failed.mdx`
- Modify: `purchases/payment-pending.mdx`
- Modify: `purchases/charged-no-esim.mdx`
- Modify: `purchases/double-charge.mdx`
- Modify: `purchases/refunds.mdx`
- Modify: `purchases/request-refund.mdx`
- Modify: `purchases/refund-time.mdx`
- Modify: `purchases/cancel-order.mdx`
- Modify: `account/create-account.mdx`
- Modify: `account/sign-in.mdx`
- Modify: `account/orders-and-esims.mdx`

**Interfaces:**
- Consumes: подтверждённый процесс оплаты через внешнего PSP и возврата через него.
- Produces: единые статьи без дублирования между покупками и аккаунтом.

- [ ] **Step 1: Объединить историю заказов, чеков и eSIM**

  Перенести полезное содержание в `purchases/order-history`, убрать `account/orders-and-esims` из навигации и обновить все ссылки на единственный путь.

- [ ] **Step 2: Объединить регистрацию и вход**

  Сделать одну статью «Как зарегистрироваться и войти в аккаунт» с отдельными подразделами регистрации и входа; восстановление пароля оставить отдельной задачей.

- [ ] **Step 3: Объединить статусы оплаты и инциденты списания**

  Статья о статусе оплаты закрывает failed и pending. Статья о незавершённом заказе закрывает сценарии «деньги списались, eSIM не появилась» и «двойное списание».

- [ ] **Step 4: Объединить сценарий возврата**

  В одной статье описать основания, запрос, отмену заказа и срок возврата. Не обещать сроки, способы возврата или возврат на Bananos без подтверждённой продуктовой и платёжной логики.

- [ ] **Step 5: Проверить внешний платёжный процесс**

  Удалить утверждения о хранении карт eBanano. В тексте явно объяснить, что платёжные данные обрабатывает внешний платёжный провайдер, если это подтверждено финальной интеграцией.

### Task 5: Перестроить troubleshooting по симптомам пользователя

**Files:**
- Modify: `docs.json`
- Modify: `troubleshooting/activation-failed.mdx`
- Modify: `troubleshooting/esim-not-working.mdx`
- Modify: `troubleshooting/no-mobile-network.mdx`
- Modify: `troubleshooting/no-data-connection.mdx`
- Modify: `troubleshooting/install-failed.mdx`
- Modify: `troubleshooting/qr-not-working.mdx`
- Modify: `troubleshooting/slow-internet.mdx`
- Modify: `troubleshooting/deleted-esim.mdx`
- Modify: `troubleshooting/wrong-device.mdx`
- Delete after migration: `troubleshooting/apn-not-working.mdx`

**Interfaces:**
- Consumes: установочные и post-install сценарии из Tasks 2–3.
- Produces: семь статей, в которых пользователь выбирает симптом, а не технический термин.

- [ ] **Step 1: Объединить установку и QR-код**

  Перенести содержание QR-проблем в `troubleshooting/install-failed` и удалить отдельную пустую страницу `troubleshooting/qr-not-working`.

- [ ] **Step 2: Объединить «нет сети» и «не подключается к сети»**

  Оставить один чек-лист с проверкой линии, выбора сети, авиарежима и ручного выбора оператора. Не дублировать в нём полный сценарий отсутствия мобильных данных.

- [ ] **Step 3: Сделать «Нет интернета» канонической статьёй APN**

  Оставить в ней порядок диагностики: выбранная SIM для данных, роуминг, сеть, перезапуск, APN при наличии значения от поставщика. Удалить отдельную пустую APN-страницу.

- [ ] **Step 4: Проверить причинность и ссылки**

  Каждая статья должна начинаться с симптома, давать действия сверху вниз и завершаться одним понятным следующим шагом: соседняя статья или поддержка.

- [ ] **Step 5: Скрыть будущие каналы до запуска функций**

  Не публиковать troubleshooting для звонков, SMS и hotspot, пока сами функции не доступны пользователю.

### Task 6: Обновить раздел «О eBanano»

**Files:**
- Modify: `docs.json`
- Modify: `about/contact-support.mdx`
- Modify: `about/supported-countries.mdx`
- Delete after migration: `about/how-it-works.mdx`

**Interfaces:**
- Consumes: утверждённая статья `getting-started/what-is-ebanano` и фактический процесс поддержки.
- Produces: раздел «О eBanano» без дублирующей страницы «Как работает eBanano».

- [ ] **Step 1: Убрать дублирование объяснения продукта**

  Перенести только подтверждённые продуктовые сведения из `about/how-it-works.mdx` в `getting-started/what-is-ebanano.mdx`, затем удалить `about/how-it-works.mdx` из навигации и репозитория.

- [ ] **Step 2: Переписать страницу поддержки под фактический канал обращения**

  Описать форму обратной связи, какие сведения приложить к обращению и что пользователь получит ответ по электронной почте. Не обещать чат или мгновенный ответ, если такого канала нет.

- [ ] **Step 3: Проверить страницу стран и покрытие**

  Не фиксировать в тексте число стран или постоянный список, если каталог меняется. Ссылки на актуальные направления должны вести к реальному каталогу или подтверждённой странице поддержки.

- [ ] **Step 4: Проверить ссылки и навигацию**

  Run:

  ```bash
  rg -n -A8 '"group": "О eBanano"' docs.json
  git diff --check
  ```

  Expected: в группе остаются только страницы поддержки и покрытия.

### Task 7: Синхронизировать навигацию и статьи RU/EN/KK

**Files:**
- Modify: `docs.json`
- Modify: `en/**/*.mdx` for the final published set
- Modify: `uz/**/*.mdx` for the final Kazakh content
- Modify: `kk/**/*.mdx` only where the repository keeps a parallel source page
- Delete from navigation or remove after migration: empty localized duplicates such as `en/installation/when-to-install.mdx` and `uz/installation/when-to-install.mdx`

**Interfaces:**
- Consumes: утверждённые русские статьи из Tasks 1–6.
- Produces: одинаковая логика разделов и сопоставимый набор страниц на трёх языках.

- [ ] **Step 1: Составить mapping RU → EN → KK**

  Для каждой опубликованной русской страницы указать один английский и один казахский путь. Страницы без содержания не добавлять в навигацию только ради симметрии.

- [ ] **Step 2: Удалить расхождения навигации**

  Убрать из EN и технической `/uz/`-локали страницы `first-purchase` и `when-to-install`, если для них нет опубликованной русской статьи в целевой карте.

- [ ] **Step 3: Проверить язык интерфейса и контент**

  Сохранить технический путь `/uz/` для казахского Mintlify-обхода, но проверить, что видимый title, текст, sidebar и UI-перевод отображаются на казахском.

- [ ] **Step 4: Проверить все локальные ссылки**

  Run:

  ```bash
  git diff --check
  rg -n 'href="/[^"]+"' --glob '*.mdx'
  ```

  Expected: каждая ссылка указывает на существующий slug целевой локали или на внешний подтверждённый URL.

### Task 8: Провести финальную проверку структуры и контента

**Files:**
- Verify: `docs.json`
- Verify: all published `*.mdx` files in the seven active sections
- Verify: `bananos/*.mdx` remains unchanged

**Interfaces:**
- Consumes: результаты Tasks 1–7.
- Produces: проверенный набор статей, готовый к ручному просмотру в Mintlify.

- [ ] **Step 1: Найти пустые MDX-файлы в опубликованной навигации**

  Run:

  ```bash
  while read -r page; do
    file="${page}.mdx"
    [ -f "$file" ] || { echo "MISSING $file"; continue; }
    bytes=$(wc -c < "$file")
    [ "$bytes" -gt 600 ] || echo "SHORT $file ($bytes bytes)"
  done < <(python3 - <<'PY'
  import json
  with open('docs.json', encoding='utf-8') as f:
      data = json.load(f)
  for language in data['navigation']['languages']:
      for group in language.get('groups', []):
          for page in group.get('pages', []):
              if not page.startswith(('bananos/', 'en/bananos/', 'uz/bananos/', 'kk/bananos/')):
                  print(page)
  PY
  )
  ```

  Expected: в активной навигации нет оставшихся заглушек; короткие страницы проверяются вручную, а не удаляются только по размеру.

- [ ] **Step 2: Проверить внутренние ссылки программно**

  Использовать скрипт, который извлекает `href="/..."`, сопоставляет путь с `<path>.mdx` и возвращает ненулевой код при отсутствии файла.

- [ ] **Step 3: Проверить редакторский чек-лист**

  Для каждой страницы зафиксировать краткий результат по 24 пунктам: назначение, дубли, полнота, факты, TOV, структура, компоненты, ссылки и поиск.

- [ ] **Step 4: Проверить изменения в Bananos**

  Run:

  ```bash
  git diff -- bananos
  git diff -- en/bananos uz/bananos kk/bananos
  ```

  Expected: отсутствуют изменения в Bananos и реферальных страницах.

- [ ] **Step 5: Проверить итоговое состояние Git**

  Run:

  ```bash
  git diff --check
  git status --short
  ```

  Expected: нет пробельных ошибок; все изменения относятся к утверждённым разделам и проверены перед публикацией.
