# [Nome do projeto]

[Escreva um ou dois  parágrafo resumindo o objetivo do seu projeto.]

## Alunos integrantes da equipe

* [Nome completo do aluno 1]
* [Nome completo do aluno 2]
* [Nome completo do aluno 3]
* [Nome completo do aluno 4]

## Professores responsáveis

* [Nome completo do professor 1]
* [Nome completo do professor 2]

## Instruções de utilização

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

## Env/Application.properties
- É necessário que seja criado um arquivo chamado **application.properties** em [Backend](./Codigo/backend/) 
- Foi criado um arquivo chamado application.properties.example onde será colocado o que deve ter no arquivo **application.properties**



