# [Nome do projeto]

[Escreva um ou dois parágrafo resumindo o objetivo do seu projeto.]

## Alunos integrantes da equipe

* [Nome completo do aluno 1]
* [Nome completo do aluno 2]
* [Nome completo do aluno 3]
* [Nome completo do aluno 4]

## Professores responsáveis

* [Nome completo do professor 1]
* [Nome completo do professor 2]

## Principais tecnologias
Para garantir escalabilidade e manutenção simplificada, utilizamos o que há de mais moderno no ecossistema Web:

**React**: Biblioteca base para construção de interfaces modulares.
**TypeScript**: Tipagem estática para maior segurança e produtividade no desenvolvimento.
**Vite**: Tooling de última geração para um build extremamente rápido.
**Styled Components**: Para estilização moderna e responsiva.
**Integração Restful**: Consumo de API desenvolvida com Springboot.

## Arquitetura
O projeto segue padrões de Clean Code e organização por módulos, facilitando a separação de responsabilidades entre componentes de UI, hooks de lógica e serviços de API.

## Rodar projeto

### Backend
- Comando para rodar backend: ./mvnw spring-boot:run

### Frontend
- Comando para rodar frontend: npm run dev

## Dependencias

### Backend
- Dependencias devem ser inseridas no arquivo [Pom.xml](./Codigo/backend/pom.xml) e subidas para o repositório

### Frontend
- Dependencias devem instaladas pelo comando **npm install**
- Ao instalar, será criado uma pasta chamada **node_modules** na raíz do projeto frontend

## Banco de Dados

- Optamos pelo PostgreSQL por ser moderno e bastante utilizado em projetos robustos
- Utilizaremos DOCKER para configurar o banco de dados e integrá-lo ao projeto Spring Boot, foi criado o arquivo
[Docker](./Codigo/backend/docker-compose.yml)

- Comando para gerar imagem: **docker-compose up --build**

## Env/Application.properties

### Backend
- É necessário que seja criado um arquivo chamado **application.properties** em [Backend](./Codigo/backend/) 
- Foi criado um arquivo chamado application.properties.example onde será colocado o que deve ter no arquivo **application.properties**

### Frontend
- Seguindo a mesma lógica que o backend, foi criado um arquivo chamado **.env** para que seja armazenado as variáveis de ambiente



