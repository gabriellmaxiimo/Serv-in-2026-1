# 📦 Dependências e Tecnologias

Este projeto foi desenvolvido utilizando **Java 21** e **Spring Boot 3.5.13**, com foco na construção de uma aplicação web completa, segura e escalável.

O Spring Boot gerencia automaticamente as versões das dependências através do seu sistema de **BOM (Bill of Materials)**, garantindo compatibilidade entre todas as bibliotecas utilizadas.

---

## ☕ Java 21 (LTS)

* Versão LTS (Long Term Support)
* Melhor desempenho e estabilidade
* Suporte a novas features da linguagem

---

## 🚀 Spring Boot 3.5.13

* Framework principal da aplicação
* Simplifica a configuração e inicialização do projeto
* Possui servidor embutido (Tomcat)
* Gerencia dependências automaticamente

---

# 📚 Dependências

## 🌐 Spring Web

Responsável pela construção da camada de comunicação da aplicação (API REST).

### Principais funcionalidades:

* Criação de endpoints HTTP (GET, POST, PUT, DELETE)
* Serialização e desserialização de JSON (Jackson)
* Tratamento de requisições e respostas

### Principais anotações:

* `@RestController`
* `@RequestMapping`
* `@GetMapping`, `@PostMapping`, etc.

---

## 🔄 Spring Boot DevTools

Ferramenta voltada para produtividade no desenvolvimento.

### Funcionalidades:

* Reinício automático da aplicação ao salvar alterações
* Cache desabilitado para facilitar testes
* Live reload em integração com frontend

---

## 🧩 Lombok

Biblioteca que reduz código repetitivo (boilerplate).

### Funcionalidades:

* Geração automática de getters e setters
* Criação de construtores
* Implementação de `toString`, `equals` e `hashCode`

### Principais anotações:

* `@Data`
* `@Getter` / `@Setter`
* `@NoArgsConstructor` / `@AllArgsConstructor`

---

## 🗄️ Spring Data JPA

Responsável pela persistência e acesso aos dados.

### Funcionalidades:

* Mapeamento objeto-relacional (ORM)
* Integração com Hibernate
* Criação automática de consultas

### Conceitos importantes:

* Entidades (`@Entity`)
* Repositórios (`JpaRepository`)
* Relacionamentos (`@OneToMany`, `@ManyToOne`, etc.)

---

## 🐬 MySQL Driver

Driver JDBC para conexão com banco de dados MySQL.

### Função:

* Permitir comunicação entre aplicação e banco
* Executar queries SQL
* Gerenciar conexões

---

## 🔐 Spring Security

Responsável pela segurança da aplicação.

### Funcionalidades:

* Autenticação de usuários (login)
* Autorização baseada em permissões
* Proteção de endpoints
* Integração com tokens (JWT - futura implementação)

### Conceitos importantes:

* Filtros de segurança
* Configuração de rotas protegidas
* Criptografia de senha (BCrypt)

---

## ✅ Validation

Responsável pela validação de dados recebidos pela API.

### Funcionalidades:

* Validação automática de campos
* Integração com Spring Web
* Retorno de erros padronizados

### Principais anotações:

* `@NotNull`
* `@NotBlank`
* `@Email`
* `@Size`

---

## 📊 Spring Boot Actuator

Ferramenta para monitoramento da aplicação.

### Funcionalidades:

* Endpoint de saúde (`/actuator/health`)
* Métricas da aplicação
* Informações sobre o ambiente

### Uso:

* Monitoramento em produção
* Diagnóstico de problemas

---

# 🧠 Conclusão

O conjunto dessas dependências permite a construção de uma aplicação completa, incluindo:

* API REST estruturada
* Persistência de dados com banco relacional
* Segurança com autenticação e autorização
* Validação de dados de entrada
* Monitoramento da aplicação

---
