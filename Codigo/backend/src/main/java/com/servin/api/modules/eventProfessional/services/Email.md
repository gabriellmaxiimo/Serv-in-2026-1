````md
# Fluxo do sistema de convites — Servin

## Objetivo

Permitir que empresas convidem profissionais para eventos através de email, onde o profissional poderá visualizar os detalhes do convite e aceitar ou recusar a participação.

---

# Estrutura atual

## Entidades principais

### Event
Representa o evento.

Contém:
- nome
- descrição
- data
- local
- etc

---

### Professional
Representa o profissional convidado.

Contém:
- nome
- email
- status
- etc

---

### EventProfessional
Representa o relacionamento entre:
- evento
- profissional

Também funciona como:
- convite
- confirmação
- controle de status

---

# Fluxo principal

## 1. Empresa envia convite

### Endpoint

```http
POST /events/{eventId}/invite/{professionalId}
```

### Service responsável

```java
InviteEventProfessionalService
```

---

## 2. Backend valida informações

Validações atuais:

### Evento existe

```java
eventRepository.findByIdAndDeletedAtIsNull(eventId)
```

---

### Profissional existe

```java
professionalRepository.findById(professionalId)
```

---

### Profissional está ativo

```java
professional.getStatus() != INACTIVE
```

---

### Profissional não foi convidado anteriormente

```java
existsByEventAndProfessional(event, professional)
```

---

### Profissional não possui conflito de horário

Verifica:
- eventos existentes
- diferença mínima de 4 horas

```java
Duration.between(...)
```

---

## 3. Criar vínculo do convite

Criar:

```java
EventProfessional ep = new EventProfessional();
```

Definir:
- evento
- profissional
- status
- token
- data de criação

---

## 4. Gerar token único

```java
String token = UUID.randomUUID().toString();
```

Salvar:

```java
ep.setConfirmationToken(token);
```

Esse token será usado para:
- visualizar convite
- confirmar
- recusar

---

## 5. Salvar convite

```java
eventProfessionalRepository.save(ep);
```

Status inicial:

```java
PENDING_CONFIRMATION
```

---

# Fluxo de email

## 6. Disparar email após salvar convite

Criar:

```java
EmailService
```

Responsável por:
- montar email
- enviar email
- gerar links do frontend

---

## 7. Registrar horário do envio

Adicionar em `EventProfessional`:

```java
private LocalDateTime inviteSentAt;
```

Após envio:

```java
ep.setInviteSentAt(LocalDateTime.now());
```

Salvar novamente:

```java
eventProfessionalRepository.save(ep);
```

---

# Estrutura do email

## Informações enviadas

O email deve conter:

- nome do evento
- descrição
- data
- horário
- local
- função/cargo
- observações

---

## Link principal

Exemplo:

```text
http://localhost:3000/invite/TOKEN
```

O email não deve confirmar automaticamente.

O link deve apenas abrir a página do convite.

---

# Fluxo do frontend

## 8. Página de convite

### Rota

```text
/invite/:token
```

---

## 9. Ao abrir página

Frontend chama:

```http
GET /invite/{token}
```

Backend retorna:
- informações do evento
- status do convite
- dados do profissional
- datas importantes

---

## 10. Usuário decide

A tela mostra:
- botão aceitar
- botão recusar

---

# Fluxo de confirmação

## 11. Confirmar convite

Frontend chama:

```http
POST /invite/{token}/confirm
```

Backend:

```java
confirm(String token)
```

Ações:
- busca convite
- valida token
- altera status
- registra horário

---

## 12. Registrar confirmação

Adicionar:

```java
private LocalDateTime confirmedAt;
```

Salvar:

```java
ep.setConfirmedAt(LocalDateTime.now());
```

Novo status:

```java
CONFIRMED
```

---

# Fluxo de recusa

## 13. Recusar convite

Frontend chama:

```http
POST /invite/{token}/reject
```

Backend:

```java
reject(String token)
```

Novo status:

```java
REJECTED
```

---

# Motivo de usar frontend ao invés de confirmar direto pelo email

Evita:
- confirmação acidental
- bots abrindo links automaticamente
- problemas de segurança
- má experiência do usuário

Também permite:
- visualizar detalhes do evento
- experiência mais profissional
- futuras melhorias

---

# Melhorias futuras

Possíveis evoluções:

- expiração de convite
- reenvio de email
- email HTML estilizado
- notificações
- cancelamento de convite
- auditoria/logs
- autenticação do profissional
- dashboard de convites
````
