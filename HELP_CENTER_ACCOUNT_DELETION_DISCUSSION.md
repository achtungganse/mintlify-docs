# Отдельное обсуждение — удаление аккаунта eBanano

**Статус:** Separate product/legal task  
**Дата:** 2026-09-18

Удаление аккаунта намеренно не решается в текущем проходе Help Center.

## Что уже известно

Архитектура предусматривает:
- RequestAccountErasure;
- переход в PENDING_DELETION;
- блокировку доступа;
- deletion saga;
- анонимизацию PII;
- конечное состояние ANONYMIZED.

## Что нужно отдельно решить

### UX
- где находится удаление;
- self-service или запрос;
- нужна ли повторная аутентификация;
- подтверждение операции;
- можно ли отменить запрос.

### Активные продукты
- что происходит с активными eSIM;
- доступом к activation data;
- автопродлением;
- незавершёнными top-ups.

### Заказы и деньги
- pending orders;
- payments;
- refunds;
- receipts;
- обязательное хранение финансовой истории.

### Персональные данные
- что удаляется;
- что анонимизируется;
- что сохраняется по закону;
- retention и backups.

### Loyalty / referral
Отложить до redesign соответствующих программ.

## Результат отдельного обсуждения

Нужны:
1. legal/product policy;
2. backend deletion contract;
3. UX flow;
4. Help Center article №17;
5. consistency check с Privacy Policy.
