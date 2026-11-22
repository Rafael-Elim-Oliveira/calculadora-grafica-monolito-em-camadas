# Projeto Calculadora Gráfica

Este é um projeto de arquitetura monolítica em camadas para uma calculadora gráfica
desenvolvido com NestJS, Postgres, TypeORM e Docker Compose.

## Arquitetura

monolito em camadas


## Limguagem / versão

typescript / 5


## Api / versão

NestJS / 11


## Banco de dados / ORM

PostgreSQL / TypeORM


## Entidades

1. Usuário

2. Gráficos


## Rotas

1. POST /usuarios

2. GET /usuarios/:id

3. POST /graficos

4. GET /graficos/:id

5. GET /graficos/usuario/:usuarioId

5. DELETE /graficos/:id


## Diretório
```
calculadora-grafica/
├── docker-compose.yml                                       # Container do PostgreSQL
├── package.json
├── tsconfig.json
└── src/
    ├── controllers/                                         # Camada de Apresentação (6 rotas HTTP)
    │   ├── grafico.controller.ts
    │   └── usuario.controller.ts
    ├── domain/                                              # Camada de Domínio
    │   ├── entities/
    │   │   ├── grafico.entity.ts
    │   │   └── usuario.entity.ts
    │   └── repositories/
    │       ├── grafico.repository.interface.ts              # Token Symbol + Interface
    │       └── usuario.repository.interface.ts              # Token Symbol + Interface
    ├── dtos/                                                # Validação de Entrada
    │   ├── criar-grafico.dto.ts
    │   └── criar-usuario.dto.ts
    ├── infrastructure/                                      # Camada de Infraestrutura (Persistência)
    │   └── repositories/
    │       ├── grafico.typeorm-repository.ts                # Implementa IGraficoRepository
    │       └── usuario.typeorm-repository.ts                # Implementa IUsuarioRepository
    ├── services/                                            # Camada de Aplicação (Regras + MathJS)
    │   ├── grafico.service.ts
    │   └── usuario.service.ts
    ├── app.module.ts                                        # Módulo raiz (Injeção de Dependência + TypeORM)
    └── main.ts                                              # Ponto de entrada + ValidationPipe global
```


## Como rodar

### 1. Configurar ambiente
```bash
    npm install
```

### 2. Subir o banco de dados via Docker
```bash
    docker compose up -d
```

### 3. Iniciar aplicação
```bash
    npm run start:dev
```
    A API sobe em `http://localhost:3000`.


## Como testar as 6 rotas

### 1. Criar usuário
```
POST http://localhost:3000/usuarios
Content-Type: application/json

{
    "nome": "usuário teste",
    "email": "usuarioteste@ufr.edu.br"
}

#e-mail inválido

POST http://localhost:3000/usuarios
Content-Type: application/json

{
    "nome": "usuário teste",
    "email": "usuariotesteufr.edu.br"
}


```

### 2. Buscar Usuário por ID
```
@usuarioID = uuid_do_usuario
GET http://localhost:3000/usuarios/{{usuarioId}}

#usuário inexistente
GET http://localhost:3000/usuarios/{{9999}}

```

### 3. Gerar e Salvar Gráfico
```
POST http://localhost/graficos
Content-Type: application/json

{
    "usuarioId": "{{usuarioId}}",
    "funcao": "x^2 - 1",
    "xMin": -5,
    "xMax": 5,
    "passo": 1
}

#intervalo inválido

POST http://localhost/graficos
Content-Type: application/json

{
    "usuarioId": "{{usuarioId}}",
    "funcao": "x^2 - 1",
    "xMin": 10,
    "xMax": 5,
    "passo": 1
}

#passo inválido

POST http://localhost/graficos
Content-Type: application/json

{
    "usuarioId": "{{usuarioId}}",
    "funcao": "x^2 - 1",
    "xMin": -5,
    "xMax": 5,
    "passo": -1
}

#função inválida

{
    "usuarioId": "{{usuarioId}}",
    "funcao": "x^ - 1",
    "xMin": -5,
    "xMax": 5,
    "passo": -1
}

```

### 4. Listar Gráficos do usuário
```
GET http://localhost:3000/graficos/usuario/{{usuarioId}}
```

### 5. Baixar arquivo JSON com os pontos do gráfico
```
@graficoId = uuid_do_grafico
GET http://localhost:3000/graficos/{{graficoId}}
```

### 6. Deletar gráfico por ID
```
DELETE http://localhost:3000/graficos/{{graficoId}}

#gráfico inexistente

DELETE http://localhost:3000/graficos/{{graficoId}}
```