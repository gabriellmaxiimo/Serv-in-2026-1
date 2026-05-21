# Debug - Email não está sendo enviado

## Problemas Comuns e Soluções

### 1. **Senha do Gmail Incorreta** (MAIS COMUM)

Se sua conta tem 2FA ativado, você **NÃO** pode usar a senha normal.

**Solução:**
- Acesse: https://myaccount.google.com/apppasswords
- Gere uma "App Password"
- Use essa senha em `application.properties`:
  ```properties
  spring.mail.password=SENHA_DE_APP_AQUI
  ```

### 2. **Verificar Logs da Aplicação**

Após recompilar e reiniciar, chame o endpoint de invite:
```bash
curl -X POST http://localhost:8080/events/{eventId}/professionals/{professionalId}/invite
```

Verifique os logs da aplicação (console ou arquivo). Procure por:
```
[EmailService] Enviando e-mail para:
[EmailService] Erro ao enviar e-mail para:
[InviteEventProfessionalService] Email do profissional vazio
```

### 3. **Testar Localmente sem Conta Real (MailHog)**

**Instale MailHog** (captura e-mails localmente):

```bash
# Download: https://github.com/mailhog/MailHog/releases
# Ou com Chocolatey:
choco install mailhog

# Inicie:
MailHog.exe
```

**Configure em `application.properties`:**
```properties
spring.mail.host=localhost
spring.mail.port=1025
```

**Visualize os e-mails em:** http://localhost:8025

### 4. **Verificar Configuração de Segurança Gmail**

1. Acesse: https://myaccount.google.com/security
2. Desça até "Apps e sites menos seguros"
3. Ative "Permitir apps menos seguros" (se não estiver 2FA)
4. OU use App Password (recomendado com 2FA)

### 5. **Testes Rápidos**

**Verifique se o Professional tem email:**
```bash
GET http://localhost:8080/professionals/{professionalId}
```

Procure por `"email"` no JSON retornado.

### 6. **Testar Envio Manual (Java)**

Se quiser testar o serviço de e-mail sem criar invite, adicione um endpoint temporário:

```java
@PostMapping("/test-email")
public ResponseEntity<String> testEmail() {
    try {
        emailService.sendSimple("seu.email@gmail.com", "Teste", "Funcionando!");
        return ResponseEntity.ok("E-mail enviado!");
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Erro: " + e.getMessage());
    }
}
```

## Ordem de Verificação

1. ✅ Recompile o backend: `./mvnw clean compile`
2. ✅ Reinicie a aplicação
3. ✅ Verifique os **logs** (console) ao disparar invite
4. ✅ Se usar Gmail 2FA → gere **App Password**
5. ✅ Se quiser testar local → use **MailHog**

## Arquivo de Configuração Esperado

**`application.properties`:**
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=servinappinvite@gmail.com
spring.mail.password=SEU_APP_PASSWORD_OU_SENHA
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.default-encoding=UTF-8
```
