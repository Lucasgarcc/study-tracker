<div align="center">

# Study Tracker

Aplicativo mobile para organizar tópicos de estudo e acompanhar o progresso de aprendizagem.

[![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![Ionic](https://img.shields.io/badge/Ionic-8-3880FF?logo=ionic&logoColor=white)](https://ionicframework.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-7-119EFF?logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NgRx](https://img.shields.io/badge/NgRx-19-BA2BD2?logo=ngrx&logoColor=white)](https://ngrx.io/)
[![RxJS](https://img.shields.io/badge/RxJS-7-B7178C?logo=reactivex&logoColor=white)](https://rxjs.dev/)
[![License](https://img.shields.io/badge/license-private-lightgrey)](#)

</div>

## Sobre o projeto

O **Study Tracker** é uma aplicação híbrida desenvolvida para centralizar o acompanhamento dos estudos. A pessoa usuária pode cadastrar tópicos, classificá-los por categoria, visualizar o progresso de cada assunto e remover tópicos concluídos ou que não deseja mais acompanhar.

O projeto utiliza Ionic para a interface mobile, Angular como framework principal e NgRx para manter o estado dos tópicos de forma previsível e reativa.

## Funcionalidades

- Dashboard com os tópicos ativos e seus percentuais de progresso.
- Cadastro de novos tópicos de estudo.
- Definição de categoria, quantidade total de tarefas e tarefas concluídas.
- Cálculo automático do progresso: `tarefas concluídas / tarefas totais * 100`.
- Listagem completa dos tópicos na área de estudos.
- Exclusão de tópicos.
- Navegação por abas entre Home, Estudos e Configurações.
- Ícones e componentes visuais fornecidos pelo Ionic e Ionicons.
- Preparação para execução como aplicação web e aplicação nativa via Capacitor.

## Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| <img src="https://cdn.simpleicons.org/angular/DD0031" width="18" alt="Angular"> **Angular 19** | Framework da aplicação, componentes, módulos e roteamento. |
| <img src="https://cdn.simpleicons.org/ionic/3880FF" width="18" alt="Ionic"> **Ionic 8** | Componentes de interface e experiência mobile. |
| <img src="https://cdn.simpleicons.org/capacitor/119EFF" width="18" alt="Capacitor"> **Capacitor 7** | Ponte para empacotamento e recursos nativos. |
| <img src="https://cdn.simpleicons.org/typescript/3178C6" width="18" alt="TypeScript"> **TypeScript 5.6** | Linguagem principal e tipagem da aplicação. |
| <img src="https://cdn.simpleicons.org/ngrx/BA2BD2" width="18" alt="NgRx"> **NgRx 19** | Gerenciamento global do estado dos tópicos. |
| <img src="https://cdn.simpleicons.org/reactivex/B7178C" width="18" alt="RxJS"> **RxJS 7** | Observables e comunicação reativa entre componentes e store. |
| **Ionicons 7** | Ícones utilizados na navegação e nos cards. |
| **ESLint** | Análise estática e padronização do código. |
| **Jasmine + Karma** | Testes unitários da aplicação Angular. |

## Arquitetura

O projeto segue uma arquitetura modular baseada no Angular:

```text
src/
└── app/
    ├── app.module.ts             # Módulo raiz e registro do NgRx Store
    ├── app-routing.module.ts     # Rotas principais e lazy loading
    ├── home/                     # Dashboard com tópicos ativos
    ├── studies/                  # Cadastro e gerenciamento de tópicos
    ├── settings/                # Área de configurações
    ├── tabs/                    # Navegação principal por abas
    ├── pages/
    │   └── topic-detail/         # Página de detalhes de um tópico
    ├── explore-container/        # Componente de apoio gerado pelo Ionic
    └── store/
        ├── topic.model.ts        # Contrato Topic
        └── topics/
            ├── topics.actions.ts
            ├── topics.reducer.ts
            └── topics.selectors.ts
```

### Fluxo de estado

O estado global é registrado em `StoreModule.forRoot` com o reducer `topicsReducer`. Os componentes consomem o estado através de selectors e disparam actions para alterar os dados:

```text
Componente → Action → Reducer → Store → Selector → Componente
```

As actions atuais são:

- `Add Topic`: adiciona um tópico e calcula seu progresso.
- `Delete Topic`: remove um tópico pelo identificador.

O selector `selectActiveTopics` exibe na Home somente tópicos cujo progresso é menor que 100%.

### Rotas

| Rota | Responsabilidade |
| --- | --- |
| `/tabs/home` | Dashboard e tópicos ativos. |
| `/tabs/studies` | Cadastro e lista de tópicos. |
| `/tabs/settings` | Configurações da aplicação. |
| `/topic-detail/:id` | Detalhes de um tópico específico. |

As áreas principais são carregadas com lazy loading e o roteador utiliza `PreloadAllModules` para pré-carregar os módulos após a navegação inicial.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior.
- npm 9 ou superior.
- Navegador moderno para execução web.
- Android Studio e/ou Xcode caso o projeto seja empacotado para dispositivos nativos.

Confira as versões instaladas:

```bash
node --version
npm --version
```

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Lucasgarcc/study-tracker.git
cd study-tracker
npm install
```

## Como executar

### Ambiente de desenvolvimento

```bash
npm start
```

A aplicação será disponibilizada pelo Angular em `http://localhost:4200/`.

### Build de desenvolvimento

```bash
npm run build:dev
```

### Build de produção

```bash
npm run build
```

O resultado será gerado no diretório `www/` ou no diretório configurado pelo Angular CLI.

### Preview de produção pelo Angular

```bash
npm run start:prod
```

## Qualidade e testes

Executar lint:

```bash
npm run lint
```

Corrigir problemas de lint automaticamente quando possível:

```bash
npm run lint:fix
```

Executar verificação de tipos:

```bash
npm run typecheck
```

Executar os testes:

```bash
npm test
```

Executar testes em modo CI:

```bash
npm run test:ci
```

Executar a verificação completa:

```bash
npm run verify
```

O comando `verify` executa, nesta ordem, lint, verificação de tipos, testes em modo CI e build de produção.

## Pacotes principais

### Runtime

- `@angular/core`, `@angular/common`, `@angular/forms` e `@angular/router`: base da aplicação Angular.
- `@ionic/angular`: componentes e integração do Ionic com Angular.
- `@capacitor/core`, `@capacitor/app`, `@capacitor/haptics`, `@capacitor/keyboard` e `@capacitor/status-bar`: recursos e integração nativa.
- `@ngrx/store`: store global.
- `@ngrx/entity`: utilitários para gerenciamento de entidades.
- `@ngrx/effects`: infraestrutura para efeitos assíncronos.
- `@ngrx/store-devtools`: inspeção do estado durante o desenvolvimento.
- `ionicons`: biblioteca de ícones.
- `rxjs`: programação reativa.

### Desenvolvimento

- `@angular/cli` e `@angular-devkit/build-angular`: comandos, servidor e build.
- `typescript`: compilação e tipagem.
- `eslint` e `@angular-eslint/*`: lint do TypeScript e dos templates Angular.
- `jasmine-core`, `karma` e plugins relacionados: testes unitários.
- `@capacitor/cli`: comandos de integração com plataformas nativas.

As versões exatas estão definidas em [package.json](./package.json) e [package-lock.json](./package-lock.json).

## Estado atual e próximos passos

O projeto está em evolução. Neste momento, o estado dos tópicos é mantido em memória pelo NgRx; ao recarregar a aplicação, os dados retornam ao estado inicial. A tela de detalhe e a área de configurações também estão preparadas na estrutura de navegação e podem receber suas funcionalidades finais.

Próximas melhorias sugeridas:

- Persistir tópicos com Ionic Storage ou SQLite.
- Implementar edição e conclusão de tarefas individuais.
- Finalizar a tela de detalhes do tópico.
- Adicionar autenticação e sincronização com uma API.
- Ampliar a cobertura de testes dos reducers, selectors e páginas.
- Preparar os projetos Android e iOS com Capacitor.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento. |
| `npm run start:prod` | Inicia usando a configuração de produção. |
| `npm run build:dev` | Gera build de desenvolvimento. |
| `npm run build` | Gera build de produção. |
| `npm run watch` | Recompila automaticamente durante o desenvolvimento. |
| `npm run lint` | Analisa o código com ESLint. |
| `npm run lint:fix` | Tenta corrigir problemas de lint. |
| `npm run typecheck` | Verifica os tipos TypeScript. |
| `npm test` | Executa os testes em modo interativo. |
| `npm run test:ci` | Executa os testes sem modo interativo. |
| `npm run verify` | Executa todas as verificações e o build de produção. |

## Licença

Este projeto é privado e está em desenvolvimento. Os termos de uso e distribuição ainda serão definidos.
