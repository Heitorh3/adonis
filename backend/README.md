# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

# Todo

# Comandos para configurações

- yarn eslint --init //Inicializar o eslint
- yarn add prettier eslint-config-prettier eslint-plugin-prettier -D //Adiciona os plugins prettier e eslint
- yarn eslint --fix config --ext .js //Vericar os arquivos da pasta config a procura de erros
