
# Fluxo recomendado do sistema de convites

## 1. Empresa convida profissional

### Backend

```http
POST /events/{eventId}/invite/{professionalId}
```

O sistema:

- valida evento
- valida profissional
- verifica conflitos de horário
- cria `EventProfessional`
- gera token
- status = `PENDING_CONFIRMATION`
- salva no banco

---

## 2. Registrar envio do convite

Na entidade `EventProfessional`:

```java
private LocalDateTime inviteSentAt;
```

Após enviar email:

```java
ep.setInviteSentAt(LocalDateTime.now());
```

---

## 3. Serviço de email

Criar:

```text
EmailService
```

Responsável por:
- montar email
- enviar email
- gerar links do convite

---

## 4. Estrutura do email

O email deve conter:

- nome do evento
- data
- horário
- local
- cargo/função
- descrição
- observações

E um botão/link:

```text
Visualizar convite
```

Exemplo:

```text
http://localhost:3000/invite/TOKEN
```

---

## 5. Criar frontend da página do convite

### Rota

```text
/invite/:token
```

A tela mostra:
- dados do evento
- dados do convite
- status atual
- botão aceitar
- botão recusar

---

## 6. Endpoint para visualizar convite

### Backend

```http
GET /invite/{token}
```

Retorna:
- evento
- profissional
- status
- datas
- informações necessárias

---

## 7. Confirmar convite

### Frontend

```http
POST /invite/{token}/confirm
```

### Backend

- busca token
- valida existência
- valida status
- muda para `CONFIRMED`
- registra `confirmedAt`

---

## 8. Recusar convite

### Frontend

```http
POST /invite/{token}/reject
```

### Backend

- busca token
- muda status para `REJECTED`

---

## 9. Melhorias futuras

Possíveis evoluções:

- expiração de convite
- reenvio de email
- HTML bonito no email
- notificações
- histórico de convites
- cancelamento de convite
- autenticação do profissional
- auditoria/logs
