# Gestor de estudos

Hub que junta três frentes de estudo numa agenda só.

| Arquivo | O que é |
|---|---|
| `index.html` | Hub: os 4 selecionáveis, a agenda da semana e a disponibilidade por frente |
| `civil3d.html` | Ultra-Aprendizado Civil 3D |
| `revit.html` | Ultra-Aprendizado Revit |
| `pos.html` | Especialização em BIM — Projetos de Infraestrutura |
| `login.html` | Tela de entrada (só aparece com o Supabase configurado) |
| `js/config.js` | Endereço e chave pública do Supabase |
| `js/armazenamento.js` | Único ponto de leitura e gravação: localStorage + sincronização com o Supabase |
| `js/ultra-nucleo.js`, `js/pos-nucleo.js` | Regras de cronograma, usadas pelos apps e pelo hub |
| `dados/` | Conteúdo dos projetos Civil 3D e Revit (marcos, sessões, flashcards) |

## Publicar no GitHub Pages

1. Crie um repositório e envie todo o conteúdo desta pasta para a raiz dele.
2. No repositório: Settings › Pages › Source: "Deploy from a branch" › branch `main`, pasta `/ (root)`.
3. O endereço fica `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Não há etapa de build: são arquivos estáticos.

## Login e sincronização (Supabase)

1. Crie um projeto em supabase.com.
2. SQL Editor › cole o conteúdo de `supabase.sql` › Run.
3. Authentication › Users › Add user › Create new user: seu e-mail e senha, com "Auto Confirm User" marcado.
4. Authentication › Sign In / Providers: desligue "Allow new users to sign up".
5. Project Settings › API (ou API Keys): copie a Project URL e a chave pública (anon / publishable) para `js/config.js`.
6. Envie `js/config.js` para o GitHub.

Com `js/config.js` vazio o site continua funcionando só no navegador, sem login.

Faça o primeiro login no computador que tem o progresso mais completo: é ele que sobe para a nuvem.

## Backup

hub › Backup › "Baixar backup completo" gera um arquivo com tudo. O mesmo botão importa esse
arquivo e também os backups antigos de cada app.
