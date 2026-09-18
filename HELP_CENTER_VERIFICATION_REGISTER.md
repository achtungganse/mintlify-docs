# Help Center — реестр продуктовых фактов для проверки

**Статус:** Open  
**Дата:** 2026-09-18

Этот файл содержит утверждения, которые влияют на пользовательские инструкции, но не должны публиковаться только потому, что уже встречаются в старых MDX-файлах.

## P0 — проверить до переписывания соответствующих статей

### Тарифы и каталог

- Какие типы пакетов реально существуют в публичном каталоге: fixed / daily / unlimited / другие.
- Как публично отображается activation rule.
- Как публично отображается coverage.
- Есть ли hotspot/tethering как отдельное поле.
- Есть ли voice/SMS/phone number хотя бы у части будущих предложений.
- Есть ли FUP и как он представлен пользователю.
- Есть ли top-up или только покупка нового пакета.
- Можно ли переиспользовать один eSIM profile с новым package.

### Установка

- QR-код одноразовый или правила различаются по provider offer/profile.
- Какие profiles допускают reinstall.
- Есть ли self-service reissue/reinstall.
- Можно ли transfer между устройствами.
- Какие installation data eBanano реально показывает пользователю.

### Оплата

- Какие способы оплаты реально доступны на первом релизе.
- Какая currency model используется в checkout.
- Как выглядит pending/failed/completed для пользователя.
- Можно ли безопасно повторить declined payment и при каких условиях.
- Как distinguish authorization hold vs captured charge в support flow.
- Какое поле/ID пользователь видит для payment/order escalation.

### Refund / cancellation

- Формальная refund eligibility policy.
- Влияют ли installation / activation / data usage на eligibility и как.
- Есть ли cancellation до provisioning/activation.
- Возвращается ли refund только в original payment method.
- Есть ли refund to Bananos.
- Есть ли replacement/reissue вместо refund.
- Официальные сроки обработки со стороны eBanano/PSP, если их можно обещать.

### Bananos

- Что такое 1 Banano в расчётах.
- Как Bananos начисляются за purchase.
- Текущие loyalty levels, thresholds и cashback.
- Что считается progress по уровню.
- Как refund влияет на Bananos и loyalty progress.
- Когда purchase reward становится final.
- Можно ли использовать часть balance.
- Можно ли применять Bananos вместе с promo code.
- Есть ли expiry и какая.
- Что считается activity для expiry.
- Участвуют ли guest orders.

### Referral

- Exact referral trigger.
- Reward inviter.
- Reward invited user.
- Reward currency: USD-equivalent/Bananos/etc.
- Нужен ли новый account.
- Как referral code/link привязывается к user.
- Есть ли QR sharing.
- Лимиты referral program.
- Refund/cancellation effects.
- Anti-abuse rules, которые допустимо показывать публично.

### Account

- Текущие поддерживаемые auth methods на релизе.
- Можно ли менять email.
- Есть ли account linking между auth methods.
- Какие notification categories реально существуют.
- Какие notifications обязательны.
- Есть ли session management/logout-all.
- Реальный self-service/support flow удаления аккаунта.
- Что происходит с orders, eSIM, Bananos при deletion.
- Какие данные сохраняются по legal/accounting retention.

### Support

- Единственный/основной канал обращения на релизе.
- Есть ли ticket ID.
- Куда приходит ответ.
- SLA, если он утверждён.
- Можно ли безопасно запрашивать последние 4 цифры карты.
- Допустимо ли передавать APN/activation identifiers в support form.
- Какие attachment types доступны.

## Правило закрытия

Каждый пункт закрывается ссылкой на один authoritative source:

- утверждённая product spec;
- backend/public API contract;
- legal policy;
- payment provider contract;
- design/UI implementation;
- явно принятое решение product owner.

Старый Help Center сам по себе authoritative source не является.
