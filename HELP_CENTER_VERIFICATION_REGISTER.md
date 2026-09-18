# Help Center — реестр продуктовых фактов для проверки

**Статус:** In progress  
**Дата:** 2026-09-18

Обозначения:

- ✅ подтверждено;
- 🟡 частично подтверждено / требует детализации;
- 🔴 отдельное решение ещё не принято;
- ⏸ намеренно отложено как отдельная продуктовая задача.

Важно: Figma-макеты используются только как источник пользовательских сценариев и состояний. Их тексты, цены и продуктовые условия не являются фактами для Help Center.

Подтверждённые решения подробнее зафиксированы в [HELP_CENTER_PRODUCT_DECISIONS.md](HELP_CENTER_PRODUCT_DECISIONS.md). Модель сведений о тарифе: [HELP_CENTER_PACKAGE_DETAILS_MODEL.md](HELP_CENTER_PACKAGE_DETAILS_MODEL.md).

## Тарифы и каталог

- 🟡 Типы пакетов: eSIMAccess имеет fixed, unlimited/FUP, Day Pass и другие provider-specific варианты; публичная нормализация eBanano ещё требует финальной проверки.
- ✅ Activation semantics подтверждены: on_first_network / on_install / immediate. Публичный UI должен показывать правило конкретного offer.
- ✅ Coverage должен быть доступен в сведениях о пакете; для regional/global — полный список стран, а не только название региона.
- 🔴 Hotspot/tethering как отдельное публичное поле.
- 🟡 Voice/SMS: launch-модель в основном data-oriented, но у eSIMAccess появились prepaid/voice-capable классы; публичный scope eBanano нужно утвердить.
- ✅ FUP должен быть нормализован и показываться до покупки для daily throttle/cutoff: лимит + поведение после лимита + скорость, если известна.
- ✅ Top-up существует для reloadable products.
- ✅ Manual top-up: кнопка «Пополнить» открывает каталог совместимых top-up options для конкретной eSIM.
- ⏸ Автопродление: бизнес-логика вынесена в отдельную задачу. До утверждения Help Center показывает только статус «в разработке».
- 🟡 Повторное использование одного profile с top-up возможно для reloadable products; не универсально.

## Установка

- 🟡 QR/reinstall зависит от состояния профиля; eSIMAccess допускает reinstall deleted eSIM на том же устройстве при допустимом состоянии.
- ✅ Transfer установленной eSIM на другое устройство не поддерживать как пользовательский сценарий.
- 🔴 Self-service reissue/reinstall UX eBanano.
- 🟡 Installation data: eSIMAccess отдаёт QR/LPA/manual activation data; нужно подтвердить, что именно покажет eBanano UI.

## Оплата

- 🟡 PSP выбран: Freedom Pay. Freedom Pay поддерживает Visa/Mastercard, Apple Pay и Google Pay; нужно подтвердить, какие из методов будут включены в production merchant configuration eBanano.
- 🔴 Currency model checkout.
- 🔴 User-facing pending/failed/completed states.
- 🔴 Правило повторной попытки declined payment.
- 🔴 Authorization hold vs captured charge в support flow.
- 🔴 Какой payment/order ID видит пользователь.
- 🟡 Auto-renew product flow уточнён; открыты recurring-payment consent, payment token, failed charge/retry, notification wording и legal requirements.

## Refund / cancellation

- 🟡 Общая eBanano policy ранее согласована, но требует сверки с финальными Terms и правом РК перед публикацией.
- ✅ eSIMAccess позволяет cancel/refund unused + uninstalled eSIM.
- ✅ После установки automatic provider cancellation недоступен; activated/used cases требуют review.
- 🟡 14-day voluntary cancellation model eBanano — проверить финальную legal wording.
- 🟡 Technical defect flow: diagnose → replacement/equivalent solution → refund if unresolved.
- 🟡 Partial refund только для подтверждённо непредоставленной части — legal review.
- 🔴 Refund destination/original payment method в eBanano/PSP.
- ⏸ Refund to Bananos не определять до redesign loyalty.
- 🔴 Официальные refund processing timelines.

## Bananos / loyalty

**⏸ Весь блок выделен в отдельную продуктово-юридическую задачу.**

До redesign статьи не должны публиковать старые правила.

Нужно разработать заново:

- value/conversion unit;
- cashback model;
- levels/thresholds;
- progress rules;
- redemption;
- promo stacking;
- expiry;
- guest orders;
- refund effects;
- налоговую модель;
- правила клуба привилегий/loyalty program по законодательству РК.

Статья №18 до утверждения: **«Программа лояльности находится в разработке».**

## Referral

**⏸ Весь блок выделен в отдельную продуктово-юридическую задачу.**

Нужно разработать заново:

- exact trigger;
- inviter reward;
- invited-user reward;
- currency/reward representation;
- link/code/QR mechanics;
- limits;
- refunds;
- abuse policy;
- налоговые/правовые последствия.

Статья №19 до утверждения: **«Реферальная программа находится в разработке».**

## Account

- ✅ Целевые auth methods: email, Apple, Google, Facebook, Telegram.
- 🟡 В Help Center показывать только реально выпущенные production methods.
- 🔴 Возможность смены email.
- 🟡 Account linking архитектурно делается через Keycloak; user-facing behavior нужно подтвердить.
- 🔴 Notification categories production UI.
- 🔴 Mandatory vs optional notifications.
- 🔴 Session management/logout-all UI.
- ✅ Архитектура account deletion существует: RequestAccountErasure → PENDING_DELETION → anonymization → ANONYMIZED.
- 🔴 Retention/legal basis deletion.
- 🔴 Что происходит с orders/financial records.
- 🔴 Что происходит с active eSIM/activation data.
- ⏸ Что происходит с Bananos — после redesign loyalty.
- 🔴 Можно ли отменить deletion request.
- ⏸ Account deletion вынесено в отдельную product/legal задачу: HELP_CENTER_ACCOUNT_DELETION_DISCUSSION.md.

## Support

- ✅ Launch channel: email support.
- 🟡 Форма Help Center может быть frontend для email-support flow; финальный UI подтвердить.
- 🔴 Ticket ID.
- ✅ Публичный Help Center не обещает конкретный response SLA.
- ✅ Внутренне учитывать 10 календарных дней для письменного ответа на претензию потребителя по законодательству/официальным разъяснениям РК.
- 🔴 Последние 4 цифры карты: допустимость/необходимость в конкретном PSP flow.
- 🔴 Какие activation identifiers можно передавать через support form.
- 🔴 Attachment types.

## Правило закрытия

Каждый открытый пункт закрывается ссылкой на authoritative source:

- закон или финальный legal document;
- product-owner decision;
- production backend/public API contract;
- production design/UI;
- payment provider contract;
- supplier documentation;
- architecture spec для технического поведения.

Старый Help Center сам по себе authoritative source не является.
