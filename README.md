<p align="center">
  <img src="logo_flow_sense.svg" alt="Flow Sense Monitor" width="280">
</p>

# Flow Sense Monitor

> Este projeto é somente um protótipo funcional de uma parte do sistema Flow Sense Monitor.

## Sobre o Projeto

O Flow Sense Monitor é um painel web para acompanhamento de medições elétricas de máquinas ou equipamentos.

Nesta versão, o sistema mostra informações como:

- tensão atual;
- corrente atual;
- potência calculada;
- valores mínimos e máximos;
- dados da máquina, setor, empresa e operador;
- indicadores rápidos;
- histórico de medições;
- exclusão de registros do histórico.

O objetivo deste protótipo é representar uma parte visual e funcional do projeto, integrando frontend, backend e banco de dados.

## Integrantes

- Eduardo de Carvalho Fernandez
- João Pedro Cordasso Trento
- Felipe Kenji Inomata Lamb
- Ronei Herter
- Luis Eduardo Lucas Da Silva

## Tecnologias Usadas

### Frontend

- React: biblioteca usada para criar a interface.
- Vite: ferramenta usada para rodar e gerar o projeto frontend.
- JavaScript: linguagem principal do frontend.
- CSS: estilização dos componentes.
- Fetch API: usada para consumir os endpoints do backend.

### Backend

- Python: linguagem usada na API.
- FastAPI: framework usado para criar os endpoints.
- Pydantic: usado para validar dados recebidos pela API.
- Psycopg2: biblioteca usada para conectar com PostgreSQL.
- Python-dotenv: usado para carregar variáveis do arquivo `.env`.
- Uvicorn: servidor usado para executar a API FastAPI.

### Banco de Dados

- PostgreSQL: banco usado para armazenar medições, máquinas, empresas, operadores e demais dados relacionados.

## Estrutura do Projeto

```txt
projeto_programacao_web/
├── api/
│   ├── main.py
│   ├── conexao_db.py
│   └── __init__.py
│
└── flow_sense/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── styles/
    │   └── main.jsx
    ├── package.json
    └── README.md
```

## Principais Componentes

### `Cabecalho`

Mostra o topo do sistema com a identidade visual do Flow Sense Monitor.

### `Corpo`

Organiza os cards principais da tela.

### `CardAtual`

Busca e exibe a medição mais recente.

Endpoint usado:

```txt
GET /medicao_recente
```

### `CardMinMax`

Mostra os valores mínimos e máximos de tensão, corrente e potência.

Endpoint usado:

```txt
GET /min_max
```

### `CardInformacoes`

Mostra dados relacionados à máquina, setor, empresa e operador.

### `Indicador`

Componente reutilizável para os indicadores rápidos.

### `CardHistorico`

Lista o histórico de medições e permite deletar um registro pela lixeira.

Endpoints usados:

```txt
GET    /lista_medicoes
DELETE /deletahist/{id}
```

## Endpoints da API

### Buscar medição mais recente

```txt
GET /medicao_recente
```

Retorna a última medição registrada.

### Buscar mínimos e máximos

```txt
GET /min_max
```

Retorna os menores e maiores valores de tensão, corrente e potência.

### Criar medição

```txt
POST /medicao
```

Body esperado:

```json
{
  "id_maquina": 1,
  "corrente": 8.6,
  "tensao": 127.4
}
```

### Atualizar medição

```txt
PUT /medicao/{id}
```

Body esperado:

```json
{
  "corrente": 8.2,
  "tensao": 126.8
}
```

### Listar histórico de medições

```txt
GET /lista_medicoes
```

Retorno esperado:

```json
[
  {
    "id": 1,
    "corrente": 8.6,
    "tensao": 127.4,
    "potencia": 1095.64,
    "data_hora": "2026-06-23T15:30:45"
  }
]
```

### Deletar registro do histórico

```txt
DELETE /deletahist/{id}
```

Exemplo:

```txt
DELETE /deletahist/1
```

## Como Executar o Projeto

Antes de executar, é necessário ter instalado:

- Node.js;
- npm;
- Python;
- PostgreSQL.

## Configurar o Backend

Entre na pasta da API:

```bash
cd api
```

Crie e ative o ambiente virtual:

```bash
python -m venv venv
venv\Scripts\activate
```

Instale as dependências necessárias:

```bash
pip install fastapi uvicorn psycopg2 python-dotenv pydantic
```

Crie um arquivo `.env` dentro da pasta `api`:

```env
ENDERECO=localhost
PORTA=5432
DATABASE=nome_do_banco
USUARIO=usuario_do_banco
SENHA=senha_do_banco
```

Execute a API:

```bash
uvicorn main:app --reload
```

API padrão:

```txt
http://127.0.0.1:8000
```

Documentação automática da API:

```txt
http://127.0.0.1:8000/docs
```

## Configurar o Frontend

Entre na pasta do frontend:

```bash
cd flow_sense
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Frontend padrão:

```txt
http://localhost:5173
```

## Scripts do Frontend

```bash
npm run dev
```

Executa o frontend em modo de desenvolvimento.


## Integração Frontend e Backend

O frontend consome a API no endereço:

```txt
http://127.0.0.1:8000
```

O backend libera acesso para:

```txt
http://localhost:5173
http://127.0.0.1:5173
```

Isso é configurado no `CORSMiddleware` do FastAPI.

## Detalhes Técnicos

- A potência é calculada usando `tensao * corrente`.
- O histórico é carregado pelo endpoint `GET /lista_medicoes`.
- A exclusão do histórico usa `DELETE /deletahist/{id}`.
- A conexão com o banco é feita em `api/conexao_db.py`.
- O backend usa variáveis de ambiente para não deixar dados sensíveis fixos no código.
- O frontend usa componentes separados para facilitar manutenção.

## Observações Importantes

- Este projeto ainda é um protótipo.
- Algumas partes dependem do banco PostgreSQL estar configurado corretamente.
- A API precisa estar rodando para o frontend carregar dados reais.
- O projeto não representa o sistema completo, apenas uma parte funcional da proposta.
- Antes de executar o frontend, execute também o backend.

## Status do Projeto

Protótipo em desenvolvimento.
